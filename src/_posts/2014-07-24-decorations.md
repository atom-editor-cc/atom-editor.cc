---
author: "benogle"
title: "Decorations"
---

One very common pattern we've seen in packages is highlighting bits of the editor. A package might add an icon to line numbers, colorize lines, or draw a rectangle around a word.

<!--more-->

Other than the gutter, there was no API for highlighting things. There are [markers](https://flight-manual.atom-editor.cc/api/latest/api/classes/Marker.html), but markers offered no visual representation. So each package had to implement its own version of [marker views](https://github.com/atom/find-and-replace/blob/master/lib/marker-view.coffee) and [line highlighting](/packages/merge-conflicts). Implementing these things is redundant and error prone. Some package authors may have even avoided writing neat features because they needed to do this work.

With the Decoration API available in the [React editor](/blog/2014/07/22/default-to-react-editor), you no longer need to re-implement these things. It's as simple as this:

```coffee
range = editor.getSelectedBufferRange() # or any range you like
marker = editor.markBufferRange(range)
decoration = editor.decorateMarker(marker, {type: 'line', class: 'my-line-class'})
```

Decorations are based on [markers](https://flight-manual.atom-editor.cc/api/latest/api/classes/Marker.html). Markers allow you to mark a range in an editor and follow the marked text around as changes are made to the buffer. eg. Add a marker on line 10, and a newline on line 1. Your marker will now point to line 11. A decoration is the visual representation of a marker.

Pulling decorations into Atom core gives us another advantage: performance. By controlling the decoration rendering, we can make sure they are fast. And each performance enhancement we make to decorations will speed up big chunks of the entire editor: selections, folds, find and replace, and even your packages.

## In use today

Now that the [React editor](/blog/2014/07/22/default-to-react-editor) is enabled by default, [selections](https://github.com/atom/atom/blob/a82ea86a050a2a44d29a7c9e9f14c4581bd9d131/src/selection.coffee#L18), [fold markers](https://github.com/atom/atom/blob/a82ea86a050a2a44d29a7c9e9f14c4581bd9d131/src/display-buffer.coffee#L1097), and [cursor line indicators](https://github.com/atom/atom/blob/a82ea86a050a2a44d29a7c9e9f14c4581bd9d131/src/editor.coffee#L1244) are all decorations.

Several of the built in packages use decorations as well: [git-diff](https://github.com/atom/git-diff) (for gutter diff indicators), [bookmarks](https://github.com/atom/bookmarks) (for gutter book mark indicators), and [find-and-replace](https://github.com/atom/find-and-replace) (for boxes around found search terms).

## Resources

Check out [Editor::decorateMarker](https://flight-manual.atom-editor.cc/api/latest/api/classes/Editor.html#decorateMarker-instance), the [Decoration API](https://flight-manual.atom-editor.cc/api/latest/api/classes/Decoration.html) docs, [TextBuffer::markRange](https://flight-manual.atom-editor.cc/api/latest/api/classes/TextBuffer.html#markRange-instance) and the [Marker](https://flight-manual.atom-editor.cc/api/latest/api/classes/Marker.html) docs.

We've made a [decoration-example](https://github.com/atom/decoration-example) package demonstrating the capabilities of the Decoration API.

![decoration-example](https://cloud.githubusercontent.com/assets/69169/3518389/d9a8344e-06ff-11e4-9283-c32c9d99e0c1.gif)

## Update your packages

Decorations are the future. Decorations will only be rendered when the new React editor is enabled, which is the default. The API is available no matter which editor is use, so you can start using Decorations right away. This duality will be going away very shortly — the old editor will be removed entirely within the next couple weeks.

We're excited to see what you come up with!
