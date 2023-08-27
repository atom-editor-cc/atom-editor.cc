---
author: "nathansobo"
title: "Atom's New Keymap Module"
---

If you've been watching the [Atom organization](https://github.com/atom) closely on GitHub, you may have noticed that we've [open-sourced](https://github.com/atom/atom-keymap) Atom's keymap module. In this post, we'll start with a brief overview of how Atom's keymap works, then explore recent changes that give it better support for for ambiguous multi-keystroke bindings and vim-mode.

<!--more-->

## Background

Atom's keymap module associates key bindings with DOM elements in the the same way that CSS applies styles: Bindings are associated with CSS selectors. If multiple bindings match a single element the one with the most specific selector wins.

When a keyboard event occurs on the document, it bubbles upward through the DOM as usual. As it bubbles through each element, the keymap module searches for the most specific matching binding. If one is found, the bubbling of the keyboard event is terminated and a custom _command event_ is dispatched on the element instead.

```coffee
'.editor':
  'enter': 'editor:insert-newline'

'.select-list .editor':
  'enter': 'core:confirm'
```

For example, when the above keymap is loaded, pressing `enter` in the editor will normally cause a newline to be inserted. But if the editor is inside a select-list (such as the autocomplete or fuzzy finder), pressing `enter` will instead emit a `core:confirm` command event and confirm the current selection. Just like in CSS, the most _specific_ binding wins.

For more information on keymaps, check out Atom's [documentation](https://flight-manual.atom-editor.cc/behind-atom/sections/keymaps-in-depth/).

## Progress on Vim Mode

Thanks to the help of some [dedicated contributors](https://github.com/atom/vim-mode/graphs/contributors), we've been making steady progress on Atom's [vim-mode](https://github.com/atom/vim-mode) package. Vim users use a lot of multi-keystroke bindings, and with that comes greater possibility of ambiguity between bindings that share common keystroke prefixes. What makes the situation extra tricky with vim mode is that multi-keystroke sequences frequently span different modes.

**Excerpt from vim-mode's key bindings:**

```coffee
'.editor.command-mode, .editor.visual-mode':
  'd': 'vim-mode:delete'
  'c': 'vim-mode:change'

'editor.operator-pending.mode, .editor.visual-mode'
  'i w': 'vim-mode:select-inside-word'
```

So in the example above, to delete inside the current word in vim-mode you type `d i w`. Similarly, to change the current word you type `c i w`. But there's no specific bindings for `d i w` and `c i w`. Instead, the `d` and `c` bindings shift the editor into _operator-pending_ mode. Once in operator pending mode, the sequence `i w` is recognized as a command to apply the pending operator to the inner-word text object.

## Sentences vs. Words

You can think of individual key bindings as _words_ that vim-mode combines into sentences. In the example above, `d` is a verb and `i w` is the direct object of that verb. We wouldn't want to define a separate word for every possible combination. We only want the core keymap to be aware of individual bindings, leaving it to packages to determine how individual words are combined.

However, as you can see with the `i w` binding, individual bindings can also be multi-keystroke. So what happens if you add the following binding?

```coffee
'.editor.command-mode, .editor.visual-mode':
  'd i c e': 'dice:roll' # <-- new binding that's ambiguous with `d`
  'd': 'vim-mode:delete'
  'c': 'vim-mode:change'

'editor.operator-pending.mode, .editor.visual-mode'
  'i w': 'vim-mode:select-inside-word'
```

Now when you type `d i`, there's still a chance that you might be typing `d i c e`. If you end up typing the remaining `c e`, we never want to enter operator pending mode. But if you end up typing `w`, we want to delete inside the current word. How can we achieve this behavior without entangling the keymap in the business of composing keystrokes.

## Instant Replay

We ended up settling on a solution that _enqueues_ keystrokes when there are ambiguous bindings and then _replays_ those keystrokes when the ambiguity is resolved. So events in this example situation can unfold in the following ways:

Typing `d i c e`:

- `d`: The keymap notices a partially-matching binding and enters a pending state with `d` enqueued.
- `i`, `c`: For both keystrokes, there's still a partially-matching binding, so we enqueue them and renew the pending state.
- `e`: There's an exact match. We clear the queue and invoke the `dice:roll` command.

Typing `d i w`:

- `d`: The keymap notices a partially-matching binding and enters a pending state with `d` enqueued.
- `i`: There's still a partially-matching binding, so we enqueue the keystroke and renew the pending state.
- `w`: No single binding matches `d i w`, so we terminate the pending state. We temporarily disable the previous partially-matching bindings and replay the enqueued keystrokes:
  - `d`: This time `d` only matches `vim-mode:delete` because the `d i c e` binding is disabled, so we enter operator-pending mode.
  - `i`: The keymap sees the partially matching `i w` binding and puts us back in pending mode.
  - `w`: We replay the `w` and now have an exact match against the `i w` binding, so we dispatch the `vim-mode:select-inside-word` command.

Whenever the keymap enters a pending state, it also starts a one second timer after which the replay will begin automatically if there are no additional keystrokes.

## Conclusion

Vim mode still has a ways to go, but hopefully this post illustrates that we take modal editing seriously and plan to eventually support the full power of Vim's compositional approach. Operator pending mode along with these changes to the keymap were critical first steps.

We're also excited to see how atom-keymap can be used in other applications. It's pretty Atom-specific right now, meaning it makes some assumptions about Atom's unique Node-enabled environment. But a little work with [Browserify](https://github.com/substack/node-browserify) should make it possible to incorporate it into browser-based web applications.
