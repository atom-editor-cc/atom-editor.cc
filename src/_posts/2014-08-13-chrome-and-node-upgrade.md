---
author: "kevinsawicki"
title: "Chrome 36 and Node 0.11.13"
---

We are happy to announce that starting with today's [0.121 release](https://github.com/atom/atom/releases/tag/v0.121.0), Atom now runs on [Chrome 36](http://googlechromereleases.blogspot.com/2014/07/stable-channel-update.html) and [Node 0.11.13](http://blog.nodejs.org/2014/05/02/node-v0-11-13-unstable).

<!--more-->

Atom is built on top of [Atom Shell](https://github.com/atom/atom-shell) which started shipping with these upgraded Chrome and Node versions in the [0.15](https://github.com/atom/atom-shell/releases/tag/v0.15.0) release. Atom had previously been running on [Chrome 31](http://googlechromereleases.blogspot.com/2013/11/stable-channel-update.html) and [Node 0.11.10](http://blog.nodejs.org/2013/12/31/node-v0-11-10-unstable) since upgrading to [Atom Shell 0.8.5 last January](https://github.com/atom/atom/pull/1347).

This upgrades brings Atom up to date with the latest features and bug fixes from both amazing projects. The Chrome upgrade greatly improves the [developer tools](https://developer.chrome.com/devtools) with all the new features added in [Chrome 33](http://www.html5rocks.com/en/tutorials/developertools/chrome-33) and [Chrome 35](http://www.html5rocks.com/en/tutorials/developertools/chrome-35) and also adds support for JavaScript [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). The Node upgrade improves the performance of both `path.join` and `fs.stat` which Atom core and packages heavily use.

## Upgrading Atom Packages

This upgrade may require your Atom packages to upgrade their dependencies to versions compatible with Node 0.11.13. This will only impact dependencies with native code that need to be upgraded and rebuilt against the new version of [v8](https://code.google.com/p/v8) that now ships with Atom. For most native modules this should be as simple as upgrading to [nan](https://github.com/rvagg/nan) 1.2.0 or above.

In order to make this transition as smooth as possible, Atom now ships with a new package that notifies you of any incompatible packages and tells you which modules they use that need to be upgraded. Shown below is the new [incompatible-packages](https://atom.io/packages/incompatible-packages) package which displays which packages failed to load and which native modules need to be upgraded.

![incompatible packages status bar indicator](/assets/images/blog.atom.io/img/posts/incompatible-packages-status-bar.png)

![incompatible packages view](/assets/images/blog.atom.io/img/posts/incompatible-packages-view.png)

This information is cached in `localStorage` by package name/version in order to have a minimal impact on startup time. If you are working on upgrading the packages you develop you can run the **Incompatible Packages: Clear Cache** command from the [Command Palette](https://github.com/atom/command-palette) to force a recheck of all the installed and linked packages on the next Atom launch.

Hopefully this package upgrade will go smoothly and we are looking into ways to prevent this type of breakage when upgrading the Chrome, Node, and v8 versions in the future. Please let us know if you run into any problems by opening an issue on [atom/atom](https://github.com/atom/atom/issues/new).
