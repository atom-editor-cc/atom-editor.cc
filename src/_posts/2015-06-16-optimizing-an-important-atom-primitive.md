---
author: "nathansobo"
title: "Optimizing An Important Atom Primitive"
---

As we've focused on improving Atom's performance over the past few months, one interesting optimization challenge has been a construct called _[markers](https://atom.io/docs/api/latest/Marker)_. Markers allow a logical region in a buffer to be tracked, even as the contents of the buffer change. For example, the marker represented by the green highlight below continues to cover the same region, even as the text is edited:

<!--more-->

![markers animation](https://cloud.githubusercontent.com/assets/1789/8137921/10846602-1147-11e5-8116-f21101af20c5.gif)

Markers are fundamental primitives that support a wide variety of features in Atom: Find and replace uses them to [highlight search results](https://github.com/atom/find-and-replace/blob/a241d88f7c747b715d5221c565234af6eaabf40f/lib/buffer-search.coffee#L208). Snippets use them to track the [location of tab stops](https://github.com/atom/snippets/blob/550b9d11e91eb17a4c11779b02f96224725d7bb9/lib/snippet-expansion.coffee#L36) when the text changes. Spell check uses them to [mark misspelled words](https://github.com/atom/spell-check/blob/bb5c967a67b9a74c037a1a337ecec9aa0ce9c43e/lib/misspelling-view.coffee#L13) and re-check them when their text changes. The text editor itself uses them to [implement selections and cursors](https://github.com/atom/atom/blob/ebc5758d79e421f61f2b6669a886a27ee7283816/src/text-editor.coffee#L1890). And this is just a few of their uses.

But prior to the last few releases, markers were also some of the worst offenders in certain situations when it came to performance, especially for features that created a large number of them, like find and replace. Over the past couple of months, we've been working to change that, and we thought the experience was interesting enough to warrant sharing.

## Why Markers Were Slow

To understand how we optimized markers, let's start with what was wrong with our initial [naive implementation](https://github.com/atom/text-buffer/blob/d655122d3e0f0d532ca7686fb82dcd82b0d58133/src/marker-manager.coffee). Previously, every time we applied a change to the buffer, we simply iterated through every marker and adjusted its position based on the change. Making matters worse, we also were updating each marker's location in a data structure that enabled efficient range queries, making the total cost of updating markers on a text update [`O(n*log(n))`](https://en.wikipedia.org/wiki/Big_O_notation) where `n` was the total number of markers.

When there weren't very many markers, the performance of this approach was reasonable. But as the number of markers scaled up in certain cases, it became extremely problematic. For example, the find and replace package uses markers to highlight search results, and if you ran a search for the letter `e` in a large file, the excessive time spent updating thousands of markers on every keystroke was intolerable. Here's a [CPU profile](https://developer.chrome.com/devtools/docs/cpu-profiling) from Atom 0.198.0 of inserting a newline with all the `e` characters in jQuery highlighted. It looks about as ugly as typing felt in that version of Atom in this scenario:

![screenshot 2015-06-12 00 15 11](https://cloud.githubusercontent.com/assets/1789/8119828/fdac3f36-1098-11e5-807d-19387a441aad.png)

## How We Made Markers Fast

We could have chewed at the edges of the problem by using markers less intensively. For example, we could have only created markers for search results that were actually visible on screen, then updated them when the editor scrolled. But the whole point of markers was to provide a convenient abstraction to support a very common use case. Because they are such an important tool, it was critical that we made markers cheap enough to use in a straightforward way, even in extreme conditions.

The core of our problem was that our simple approach of representing the location of each marker in absolute terms was forcing us to perform computation for every marker on every edit. However, we don't always need to track the exact location of every marker at all times… in many cases, just knowing the locations of the markers that are visible on screen is sufficient, and we can wait to compute that until the next time we need to repaint the screen.

![marker-visible-eye](https://cloud.githubusercontent.com/assets/1789/8166960/7ce2ab0a-139b-11e5-8a30-430ef077dff9.png)

We needed to make marker computation more incremental. Instead of eagerly computing the position of every marker every time the buffer changed, we needed a way to defer the bulk of the effort associated with computing this information until it was actually needed. And for that, we needed a different representation.

### Expressing Markers Relatively

A key insight that can help us solve our problem is revealed in the following diagram. When the beginning of the sentence is edited, the position of the marked words changes in absolute terms. But their distance _from each other_ remains constant:

![markers-relationships](https://cloud.githubusercontent.com/assets/1789/8149498/68bf69d2-12c5-11e5-9016-c625904b9fa5.png)

So long as no edits occur between a pair of markers, their distance from each other remains constant during edits, and we can exploit this fact to defer the bulk of the computation we were previously performing when changes are made to the buffer.

As we discussed above, we originally represented the state of markers based on their absolute locations:

![markers-absolute](https://cloud.githubusercontent.com/assets/1789/8149599/5df0a15c-12c9-11e5-9133-fa785a099c6b.png)

Instead, we can encode markers in terms of their distance from one another. To do so, we subdivide the buffer into regions. Each region is associated with an _extent_, expressing how many characters are spanned by that region, and a set of _marker ids_, expressing which markers contain that region:

![markers-relative](https://cloud.githubusercontent.com/assets/1789/8149654/9cf2d404-12cb-11e5-81ed-6ec9cfcb4a4b.png)

It's worth noting that markers can overlap in arbitrary ways, so the set of marker ids for a given region can contain more than one id, and the same marker id can appear in multiple contiguous regions:

![animated-relative-overlap](https://cloud.githubusercontent.com/assets/1789/8150645/e48fa848-12f1-11e5-8d5a-9205112f45bf.gif)

### Efficient Writes

In this arrangement, to express the effects of a textual change, we only need to update the extent of a single region, and every subsequent region (along with its markers) will be shifted over by the correct amount.

![relative-markers-animation](https://cloud.githubusercontent.com/assets/1789/8150640/c5be8718-12f1-11e5-85de-8fcd47d597dd.gif)

The problem with this implementation is to find the range for a given marker, we need to compute its absolute position by walking through the regions one-by-one from the beginning. We also have to do this to find which region's extent we need to update when there's a change to the buffer. This is a good start, because we no longer need to update every marker after a change, but updates are still `O(n)` in the total number of markers.

### Efficient Reads

In this last step, we'll eliminate the linear scan required in the simplified version of the marker storage data structure by replacing the simple list with a balanced search tree. There are many different approaches to implementing balanced trees, but in our case, we'll use a modified version of a [B+ tree](https://en.wikipedia.org/wiki/B%2B_tree).

The fundamental idea of any search tree is that nodes that are higher in the tree _summarize_ essential information about nodes that are lower in the tree, allowing large portions of the tree to be discarded as a search proceeds downward through the tree. In our region tree, each interior node summarizes the total extent of its children, along with the union of the marker ids of its children. A tree for the colorful overlapping markers example from earlier looks like this:

![markers-btree](https://cloud.githubusercontent.com/assets/1789/8167247/3be8dc80-139d-11e5-97fa-e244b6eae9e3.png)

This structure enables a variety of operations to be performed much more efficiently (`O(log(n))` rather than `O(n)`). When text is inserted, we don't have to iterate through every region to find the region we want to update. Instead, we exploit the summarization to skip large sections of the tree and jump directly to the node we need to update.

For example, say we insert a character at index 22. We can skip directly to the region containing this index by traversing downward only into nodes we know contain the desired index:

![btree-stab](https://cloud.githubusercontent.com/assets/1789/8170645/8ac0cda8-13b2-11e5-993c-72b7acbe4303.gif)

In this small tree, it doesn't make a big difference. But as the tree grows larger, this approach lets us to skip many nodes that we otherwise would have needed to visit. Here's an example of a much larger tree to give you an idea of how many nodes we can skip in scenarios with more markers:

![big-btree](https://cloud.githubusercontent.com/assets/1789/8171952/60a50980-13bc-11e5-8a21-1895b665b3db.gif)

If we're looking for the range of a particular marker, we can also walk downward from the tree, traversing into children containing the desired marker and keeping track of our offset as we descend.

We can also perform range queries, returning the set of markers that intersect a given range. This is the final step toward scaling the bulk of marker computation in terms of only the visible markers. After an arbitrary number of updates forces us to redraw the editor, we can efficiently query for the visible markers and compute only their ranges, leaving the remaining markers untouched.

This gives us the following profile for typing a newline in `jquery.js` with all the `e`s highlighted. The total time for the operation drops from over 800ms to around 50ms.

![screenshot 2015-06-16 00 42 44](https://cloud.githubusercontent.com/assets/1789/8172411/9d75fe56-13c0-11e5-8fb6-68151bcb6be7.png)

This is really just an overview of the approach we used to optimize markers. It should be a good starting point for exploring the full implementation, which consists of a [marker-index class](https://github.com/atom/text-buffer/blob/0855c8c5e36faf252b8be467a8a67c2dce28bafa/src/marker-index.coffee) that maintains the B-tree and a [marker-store wrapper class](https://github.com/atom/text-buffer/blob/0855c8c5e36faf252b8be467a8a67c2dce28bafa/src/marker-store.coffee) that deals with ancillary details. The full implementation addresses many other concerns needed to support the full markers API, including marker invalidation, maintaining a balanced tree, and restoring marker states on undo and redo.

## Conclusion

Many of our early optimizations with Atom concerned improving our interaction with the DOM. We'll be blogging more about rendering improvements soon, but we've made enough progress there to start focusing on deeper layers of the system. Electron's Node integration gives us the option to drop critical Atom components to C++ if necessary, but this overhaul of markers is a good example of the kind of improvements we can get by simply investing in better algorithms. Atom has gotten a lot faster in the last few months, and as we apply optimizations like this one to other areas of the system, that improvement will continue.
