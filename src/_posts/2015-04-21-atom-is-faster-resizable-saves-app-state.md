---
author: "benogle"
title: "Faster, Better, Stronger, and Resizable"
---

Atom [`0.193.0`](https://github.com/atom/atom/releases/tag/v0.193.0) is out, and it's better than ever. There are three big improvements in this release to get excited about.

<!--more-->

### Pane Resizing

Resizing panes was one of our most [heavily requested](https://github.com/atom/atom/issues/274) features. Community member [@liuxiong332](https://github.com/liuxiong332) stepped up to the plate and [got it done](https://github.com/atom/atom/pull/5902). Thanks [@liuxiong332](https://github.com/liuxiong332)! ![:tada:](https://github.githubassets.com/images/icons/emoji/unicode/1f389.png){.emoji width="20" height="20" title=":tada:"}

![resize](https://cloud.githubusercontent.com/assets/69169/7259166/51b3b84e-e816-11e4-8fe6-13e5202bb5fc.gif)

### Saving Application State

Launch Atom, open some windows, quit Atom, re-launch Atom, [where are my windows!?!](https://github.com/atom/atom/issues/1603) That was the experience before [@maxbrunsfeld](https://github.com/maxbrunsfeld) got his hands on it. Now when you launch Atom from the Dock or file browser, it will restart in the last-quit state.

![save-app-state](https://cloud.githubusercontent.com/assets/69169/7261869/ee95d346-e829-11e4-87bf-0f595586ed78.gif)

### Improved startup time

[@kevinsawicki](https://github.com/kevinsawicki) has been working hard driving startup time down. It is getting better and better with each release.

The speedup in `0.193.0` is due to [packaging Atom's source code](https://github.com/atom/atom/pull/6313) with [asar](https://github.com/atom/asar). Asar allows the app's bootstrap process to read only one file into memory, rather than thousands of small files. On my 2 year old 15" Macbook Pro, the startup time difference between `0.192.0` and `0.193.0` is over 100ms — a 15% speedup:

0.192.0

![atom-startup-time-192](https://cloud.githubusercontent.com/assets/69169/7260085/81a8ddbc-e81c-11e4-9ff7-c3a219ca50a8.png)

0.193.0

![atom-startup-time](https://cloud.githubusercontent.com/assets/69169/7259151/447c2efe-e816-11e4-83b8-df924b0d1bc9.png)

Atom started in 1.0 Preview mode via `atom --one` is even faster — under 500ms on my machine.

![atom-one-startup-time](https://cloud.githubusercontent.com/assets/69169/7259150/447bd468-e816-11e4-9fce-197e86306f7e.png)

### Bonus: Improved installation and update time

Using asar and a couple [packaging](https://github.com/atom/atom/pull/6395) [optimizations](https://github.com/atom/atom/pull/6447) reduced Atom's bundled files by 85%, and shrunk the release payload by 10%. As a result, installing and updating Atom is now over 50% faster.

### Until next time

More improvements are on the way including [handling larger-than-2-megabyte files](https://github.com/atom/text-document), [much better  autocomplete](https://github.com/atom-community/autocomplete-plus/issues/351), and further startup time optimizations.

Stay tuned for a blog post on how we use asar and the effect it has on Atom.
