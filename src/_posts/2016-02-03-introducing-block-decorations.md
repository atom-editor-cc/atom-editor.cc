---
author: "as-cii"
title: "Introducing Block Decorations"
---

Decorations are a cornerstone of Atom's hackable core. With a simple API, they provide ways to deeply customize the editor and build awesome user experiences on top of it. Up until now, however, there was no way to display arbitrary content between lines of text, affecting the positions of subsequent lines.

<!--more-->

For this reason, users and package authors have come up with hacks that circumvent the problem by monkey-patching `DisplayBuffer` and the way it constructs tokenized lines. However, poking with Atom internals is clearly suboptimal, as they could change at any time and break all the packages that rely on them. (In fact, at the time of writing, we are actively working towards redesigning the whole display layer).

Today we're happy to announce a new experimental primitive for Atom 1.6.0-beta that is going to change this: **block decorations**.

## The API

A block decoration is a special kind of decoration that allows you to insert a DOM node before or after a certain line, and have it follow the line as the buffer changes. You can see it in action by running the snippet below in the DevTools:

```js
var element = document.createElement('div')
element.textContent = 'Block decorations! 🐲'
var editor = atom.workspace.getActiveTextEditor()
var marker = editor.markScreenPosition([0, 0])
editor.decorateMarker(marker, {type: 'block', position: 'before', item: element})
```

While maintaining the ease of use of decorations, this new API opens up a number of new scenarios such as inline diffs, code evaluation, image previews, etc.

![scrolling](https://cloud.githubusercontent.com/assets/482957/12779421/2d010e22-ca68-11e5-9ffd-23d87ce42422.gif)

## The Implementation

This abstraction posed a couple of interesting performance challenges, both at the rendering and at the model layer.

### Rendering

Block decorations are special because they are the only kind of decoration that spatially affects (almost) every other element in the DOM tree. In a typical web application, relying on the DOM structure to position elements relatively to one another is usually the best option. However, as the DOM becomes larger and more deeply nested, reflows start to get slower; as a result, rendering every single line (including the invisible ones) would cause Atom to become slower, even for files with a couple hundred lines.

[As described elsewhere](/blog/2015/06/24/rendering-improvements), Atom solves this problem by positioning some of the elements through absolute coordinates, and by swapping in and out nodes as soon as they become invisible. This technique keeps the DOM skinny and shallow, but it involved a couple of tradeoffs when implementing block decorations.

Using the technique described above means that in order to compute any element position, we also need to measure every visible and invisible block decoration's height. Moreover, a decoration could change its size during its lifetime. Since packages could add a large number of these, keeping them all in the DOM tree and constantly measure them is not an option, for the same performance concerns we described above. As a solution, we have introduced a set of heuristics that allow us to keep only a subset of block decorations on screen and still accurately display other content. In particular, we put a decoration in the DOM and re-measure it only when:

- It's in a visible area.
- It's in an invisible area, but was just added by a package or a user.
- It intersects with a change in the buffer.
- The editor styles change.
- The editor width changes.
- `TextEditorElement.prototype.invalidateBlockDecorationDimensions` gets called.

So, even when the number of block decorations for a file is relatively high, we only pay for the visible ones most of the time, and still let package authors manually invalidate the previous measurements if Atom fails to do it automatically.

### Model

At any time, Atom also needs to be able to translate the logical position of any row to its pixel position on screen.

Up until now, the rendering layer simply assumed that every line's height was the same; although not perfect, it turns out that in practice this approximation worked fairly well, and allowed us to perform the coordinates conversion through a straightforward multiplication (i.e. `screen row * line height`).

While still taking advantage of the line height approximation, with this new primitive, we also need to take into account the size of every block decoration that precedes the row for which we want to know the pixel position.

![array traversal](https://cloud.githubusercontent.com/assets/482957/12779934/41ccf0ca-ca6b-11e5-85c7-2e5a8510810d.gif)

As you can see from the diagram above, simply storing the block decorations' locations and heights in an array does not scale, as the more decorations a package adds, the more elements in the array need to be accessed to know the position of a single row. Moreover, a change in the buffer would force Atom to rescan the whole array in order to adjust each block decoration's position based on the inserted or removed lines.

For this reason, we have decided to build a custom index specifically suited for fast insertion, removal and conversion of rows to pixels: **line-top-index**.

In particular, line-top-index uses a [treap](https://en.wikipedia.org/wiki/Treap) as its backing data structure. A treap is a combination of a heap and a binary tree. Like a heap, each node has lower priority than its descendants. Randomly generating priorities guarantees that the tree stays fairly balanced. Because treaps are also binary trees, that balance means node search, insertion, and removal are logarithmic operations.

![treap](https://cloud.githubusercontent.com/assets/482957/12704155/a6644952-c854-11e5-966d-05b2ebf3d070.png)

Every node in the tree represents a row and its corresponding pixel position. There are a couple of interesting takeaways you can infer from the picture:

1. The tree is sparse. We store only rows that contain at least one block decoration so that the memory footprint and the height of the tree are as small as possible.
2. The position of a node (either in terms of rows or pixels) is stored as the distance from its left ancestor. Performance-wise, when a change in the buffer occurs, this means we only need to move the node representing the end of the change up through a basic set of tree rotations and adjust its position. This ensures that all the nodes in its right subtree (i.e. the rows following the change) get repositioned automatically, as their distance from their left ancestor wasn't affected by the edit.

For more information about the technical bits described in this overview, you can have a look at the [related PR](https://github.com/atom/atom/pull/9930) and the [line-top-index](https://github.com/atom/line-top-index) repository.

## Ending Notes

The Atom team is constantly working on improving performance and introducing new APIs to enhance the editing experience.

You can start experimenting with block decorations in Atom 1.6.0-beta. We are pretty excited about this new feature and we can't wait to see what you will build with them!
