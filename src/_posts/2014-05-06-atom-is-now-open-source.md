---
author: "nathansobo"
title: "Atom Is Now Open Source"
---

Today, we're excited to announce that we are open-sourcing Atom under the [MIT License](http://choosealicense.com/licenses/mit/). We see Atom as a perfect complement to GitHub's primary mission of building better software by working together. Atom is a long-term investment, and GitHub will continue to support its development with a dedicated team going forward. But we also know that we can't achieve our vision for Atom alone. As Emacs and Vim have demonstrated over the past three decades, if you want to build a thriving, long-lasting community around a text editor, it has to be open source.

<!--more-->

## What's included?

Much of Atom's functionality is provided by packages, and every Atom package has been open source since the day we launched the beta. Today, we're open sourcing the rest of Atom, which includes the core application, Atom's package manager, and Atom's Chromium-based desktop application framework, Atom Shell.

### Atom Core

[Atom's core](https://github.com/atom/atom) contains the parts of the application that aren't provided by packages. This includes the build system, Atom's global environment, the workspace and panes, and the text editor component. Over time, we've extracted functionality from Atom into libraries that can be used independently, and we expect that process to continue.

### Atom Package Manager

Atom's package manager, [`apm`](https://github.com/atom/apm), is a client library and command line utility that facilitates publishing and installing Atom packages. `apm` is currently powered by `atom.io`, but we plan on standardizing the backend APIs so that eventually you can host your own registry.

### Atom Shell

Finally, we're just as excited to be open-sourcing [Atom Shell](https://github.com/atom/atom-shell) as we are about Atom itself. Over its 2.5 years of development, Atom has been something of a hermit crab, beginning its life in a Cocoa WebView, then migrating to the [Chromium Embedded Framework](https://code.google.com/p/chromiumembedded/), and finally making its permanent home inside Atom Shell. We experimented briefly with [Node-Webkit](https://github.com/rogerwang/node-webkit), but decided instead to hire **[@zcbenz](https://github.com/zcbenz)** to build the exact framework we were imagining.

We've taken great care to integrate Chromium and Node in a clean, maintainable way, including sponsoring the addition of [multi-context support](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) in Node. We also created [brightray](https://github.com/brightray/brightray) and [libchromiumcontent](https://github.com/brightray/libchromiumcontent), which make it easier to embed Chromium into native applications as a shared library.

## Into the future!

There's still a ton to do before Atom is ready for version 1.0. In the next few months, we'll be focusing on improving performance, releasing on Linux and Windows, and stabilizing APIs. We think being open source will help us get there faster, and more importantly, source access will give you the transparency and control you've told us you expect from your tools.

We'd like to thank everyone who has participated in the Atom beta so far. Your feedback, packages, and pull requests have been invaluable. We wouldn't be building a text editor if we didn't plan on using it for the rest of our lives, and we're excited to take this critical step toward making that a reality.
