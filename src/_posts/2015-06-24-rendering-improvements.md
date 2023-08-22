---
author: "as-cii"
title: "Rendering Improvements"
---

Over the few last months, the Atom team has been working hard to improve the editor performance and deliver you an even greater experience. Today, I am going to shed some light on a few techniques we used to speed up the rendering process.

<!--more-->

## The Rendering Architecture

Right after a new animation frame is dispatched, we ask `TextEditorPresenter` to compute a state object which contains all the necessary information to present a `TextEditor` instance to the user. This, in turn, is used by `TextEditorComponent` (and its collaborators, such as `LinesComponent`) to construct and update DOM nodes.

![rendering-architecture](https://cloud.githubusercontent.com/assets/482957/8272112/3a4ec350-1837-11e5-8b69-03e0dd8e949f.jpg)

`TextEditorPresenter` acts as a facade, thereby hiding all the complexity of translating a `TextEditor` instance into an object that speaks the UI language. Everything from coordinates conversion to decorations' layout is handled in the presenter. As we have changed the code, this abstraction has proven to be very valuable: it allowed us to have a better separation of concerns and to introduce [several](https://github.com/atom/atom/pull/5762) [improvements](https://github.com/atom/atom/pull/5775) with little or no changes in the DOM manipulation layer.

The whole rendering process has to be extremely fast: for performance-sensitive scenarios, such as scrolling, we strive to [complete each frame in less than 16ms](http://www.html5rocks.com/en/tutorials/speed/rendering/). To achieve such speed we adopted several performance optimizations, for example:

- Keep the DOM as small as possible by rendering only the visible lines.
- Use absolute coordinates for lines and apply a `transform3d` on the lines' container to simulate scrolling.

Although these techniques allowed us to deliver a smooth experience, they were not without some tradeoffs; indeed, they forced the GPU to deal with an almost empty texture which grew in size based on the buffer's dimensions. Moreover, we had to _overpaint_ some lines above and below the visible ones in order to prevent the entire screen to be repainted. Ultimately, the whole mechanism was taxing on the GPU and, as a side effect, we were not able to render more than ~750k lines.

## Tiles To The Rescue!

Instead of reasoning about lines as individual entities, we started handling them in a tiled fashion. This idea has been [floating around for a while](https://github.com/atom/atom/pull/3154), but we only recently had the opportunity to fully implement it. This was thanks largely to our presentation layer, which made the transition to this new approach pretty smooth. The technique we ended up employing works roughly like this:

- Group arbitrary amounts of lines into tiles.
- Put each tile into a separate GPU layer.
- Position every line with absolute coordinates within the corresponding tile.
- Simulate scrolling by translating each individual tile via a `transform3d`.

![tiles-layers](https://cloud.githubusercontent.com/assets/482957/8293801/3894b004-1938-11e5-9ed8-f6a50022222e.gif)

This way, GPU layers are sufficiently big not to cause [rendering jank](http://jankfree.org/), but sufficiently small to have efficient paint times. The benefits are many:

- Less pressure on the GPU.
- (Theoretically) Unlimited renderable lines.
- Reduced paint times when new tiles appear on screen.
- No need for _overpainting_.
- Reduced cleanup times by deleting entire tile nodes when they move off-screen instead of each line that's no longer visible.

![:tada:](https://github.githubassets.com/images/icons/emoji/unicode/1f389.png){.emoji width="20" height="20" title=":tada:"} ![:tada:](https://github.githubassets.com/images/icons/emoji/unicode/1f389.png){.emoji width="20" height="20" title=":tada:"} ![:tada:](https://github.githubassets.com/images/icons/emoji/unicode/1f389.png){.emoji width="20" height="20" title=":tada:"}

## What's Next

You can have a glance at the code [here](https://github.com/atom/atom/pull/6733). We're also working on a tiled implementation of the gutter which will bring even more speed to Atom. You can follow the progress in the related [pull request](https://github.com/atom/atom/pull/7101), and we'd ![:heart:](https://github.githubassets.com/images/icons/emoji/unicode/2764.png){.emoji width="20" height="20" title=":heart:"} to have your feedback!
