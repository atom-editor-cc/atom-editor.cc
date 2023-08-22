---
author: "nathansobo"
title: "The Wonderful World of Keyboards"
---

With the beta release of Atom 1.12, we're rolling out some long-awaited improvements to Atom's support for international keyboard layouts. Before 1.12, users on many layouts needed to install a community-maintained package called [`keyboard-localization`](https://atom.io/packages/keyboard-localization) to enable full support for their keyboards, but now users from all locales should experience hassle free keyboarding in Atom's default configuration. In this post, we'll discuss the challenges we faced recognizing keybindings and how we arrived at a solution.

![Keybord Graphic](/assets/images/blog.atom.io/img/posts/world-of-keyboards.png)

<!--more-->

### Background

Atom's key binding system allows users and package authors to associate a specific _keystroke sequence_ with a _command_ for any focused DOM element via a CSS selector. So, for example, an implementation of vi-style modal editing could bind `i` to transition from command mode to insert mode as follows:

```json
"atom-text-editor.command-mode": {
  "i": "vim-mode:enter-insert-mode"
}
```

In short, the system gives users and package authors a way to map any keystroke in any context to a custom DOM event that can be handled by JavaScript. When a keydown event for the `i` key is fired, we walk up the DOM from the current focused element (the keydown event's `target`) to the root `document` node. As we visit each node, we perform a selector match on the current element, and if any bindings match both the keystroke and the selector, we choose the binding with the most specific selector and dispatch its corresponding `command` as a custom DOM event on the current element.

In the example above, if the text editor is in _command mode_, typing `i` in the editor dispatches the `vim-mode:enter-insert-mode` custom DOM event rather than inserting a character. In any other mode, however, we remove the `command-mode` class, causing the editor to no longer match the `atom-text-editor.command-mode` selector. In this scenario, the keydown event passes silently through the binding system and ends up performing the default action, which is inserting an `i` character in the editor.

A critical step in this whole process is translating `keydown` event objects to human-readable keystroke descriptions like `i`, `ctrl-k`, or `ctrl-alt-cmd-S`. That might seem like a simple problem, but solving it on all possible keyboard layouts ended up being fairly complicated.

### Ambiguous keystrokes

On a U.S. layout, modifier keys play a very limited role in determining the typed character. Ignoring some nuance on macOS, which we'll get to, `shift` is the only key that really affects the actual character typed for a given keystroke. On other layouts, the story is much different. Take for example the Swiss-German keyboard layout on macOS. If you want to type an `@` character on that layout, you need to hold `alt` and press the `g` key.

For earlier versions of Atom, it was right about here that everything got really hard. Unfortunately, prior to Chrome 51, no API existed to help us determine that on a particular keyboard layout, a keystroke that _looked_ like an `alt-g` actually inserted a `@` character. In many cases, this misunderstanding caused no harm, but if the character collided with a binding (as was the case with `@` on the Swiss German layout), that binding ended up shadowing the ability to type that character in the editor.

But prior to Chrome 51, our options for solving this problem in a general way were severely limited. One approach could have been to build a custom map describing every key on every keyboard layout in JavaScript, which is exactly what the `keyboard-localization` package did. However, considering the existence of this package and the fact that new DOM APIs directly solving the problem were being actively worked on by the Chrome team, we decided to avoid hacking workarounds into core and focus on other areas until new APIs enabled a more robust solution.

### New DOM APIs

With Atom's upgrade to Electron 1.3, we finally had access to the promised APIs. Two new fields have been added to `KeyboardEvent` objects, a [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) property, which describes the physical key pressed as a human-readable string, and a [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) property, which contains the previously-unavailable information about the actual _character_ typed by the user on the current keyboard layout.

So as soon as the Electron upgrade landed on master, we set about changing the `atom-keymap` module to base its keystroke resolution on these new APIs, assuming it would be a 10-minute fix. It's never that easy, is it?

### The ambiguity continues

We quickly discovered that the new DOM APIs weren't enough. While the `KeyboardEvent.key` property accurately reports the typed character, it _doesn't_ tell us whether that character depends on the current combination of modifier keys. So, for example, if we see an event with a `key` property of `@` and an `altKey` property of `true`, should we interpret it as `alt-@` or `@`? If `@` is a printed key on the current layout, we want to honor the modifier in the keystroke descriptor, but if the user was holding `alt` just to _access_ the `@` key, we don't want to include the `alt-` modifier in the description.

On Windows, the `ctrl` and `alt` key can be used as a substitute for the `AltGraph` key, but again, basic DOM APIs give us no way to differentiate between situations in which `ctrl-alt-` are used to access a specific character variant and those in which `ctrl-alt-` are being used as a modifier.

On macOS, the situation is crazier. _Every_ key on _every_ layout is associated with an alternative character when combined the `alt` modifier. If we always honored the `KeyboardEvent.key` for every keystroke, it would be impossible to create `alt-` bindings for any printable key on macOS. This would ruin Atom's default Emacs-style word-movement bindings like `alt-f` and `alt-b`.

### Going directly to the operating system

We had hoped to use web standard APIs, but in the face of these challenges, we decided our best option was to write some C++ to interact with the low-level keyboard APIs on Windows and macOS directly. We already had a native module called [`keyboard-layout`](https://github.com/atom/keyboard-layout) for reading and observing the name of the current keyboard layout from the operating system.

By combining an [include file we cribbed from Chromium](https://github.com/atom/keyboard-layout/blob/4070a66f4e2712cccf226c4464a9c984f5365d6f/chrome_headers/keycode_converter_data.inc) with native APIs for converting hardware key codes to unicode characters, we were able to extend that module with a `getCurrentKeymap()` method. This method returns a JS object mapping physical key names (DOM 3 `KeyboardEvent.code` values) to objects describing the corresponding character in every modifier state based on the current keyboard layout. For example, here's one entry from the keymap we return on macOS with the Swiss-German keyboard layout installed… our old friend `alt-g`.

```json
"KeyG": {
  "unmodified": "g",
  "withShift": "G",
  "withAltGraph": "@",
  "withAltGraphShift": "‚"
}
```

With this information in hand, we're now able to determine whether `alt-` or `ctrl-alt-` are required to type the character and strip them from our keystroke descriptor or whether they're intended as modifiers.

Because alt-modified characters are omnipresent on macOS, on that platform we always [fall back to the non-modified character](https://github.com/atom/atom-keymap/blob/d70d346abfff57f6892faf2030990683cbb6802b/src/helpers.coffee#L125-L136) unless the variant is in the basic ASCII character range. That means that `alt-g` resolves to `@` on a Swiss keyboard, but `alt-s` on a U.S. layout resolves to `alt-s` rather than `ß`. To be clear, it will still be possible to insert `ß` with that key-combination, but only if there aren't any `alt-s` bindings that shadow it. If there are, you'll need to `unset!` them in your user keymap to eliminate the conflict. Windows layouts are more selective with the alternative characters accessible via `AltGraph`, so we opted for a more conservative approach there and we [always honor the alternative character](https://github.com/atom/atom-keymap/blob/d70d346abfff57f6892faf2030990683cbb6802b/src/helpers.coffee#L137-L149).

One additional wrinkle is non-Latin keyboard layouts. What does a Greek user expect when they type `Σ` with a modifier key held down? We want to be culturally-sensitive, but we also want to behave in an unsurprising way, so we copy the behavior of macOS and use our keymaps to fall back to the U.S. layout equivalent key for the purposes of resolving key bindings. For example, instead of resolving to `cmd-Σ`, we would resolve to `cmd-s`. Since key bindings are really about using characters to describe physical keys, restricting bindings to the latin character set seems like a reasonable if somewhat ethnocentric choice. At least it's not without precedent.

### Conclusion

So there you have it. At last, every keyboard should work in Atom in an unsurprising way. We still have [some issues on Linux](https://github.com/atom/atom/issues/12951) that we're in the process of [ironing out](https://github.com/atom/atom/pull/12985) before this lands on stable, but if you're a Mac or Windows user, please give the new bindings implementation a spin on [the beta channel](https://atom.io/beta) and let us know if we missed anything. These improvements will be available on Linux as soon as Travis [whitelists a package we need](https://github.com/travis-ci/apt-package-whitelist/issues/3434).

## Join Us!

Are you interested in helping us further explore the interface between web technologies and native code? We're hiring! Check out the details and apply [here](https://jobs.lever.co/github/baaa9a2c-c249-4d06-b73f-e9bee1a3d147).
