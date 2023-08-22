---
author: "kevinsawicki"
title: "Hello Windows"
---

Today, we are happy to announce that Atom is now available on Windows. This is an alpha release that supports Windows 7 and Windows 8.

<!--more-->

![atom in action](https://cloud.githubusercontent.com/assets/671378/3514444/1d76361e-06cc-11e4-92ab-23403131f266.gif)

The best way to install Atom on Windows is by installing [chocolatey](http://chocolatey.org/) and then running:

```
cinst Atom
```

This will install Atom, add the `atom` and `apm` commands to your `PATH`, create shortcuts on the desktop and in the start menu, and also add an _Open with Atom_ context menu in the Explorer.

You can then update to the latest Atom release in the future by simply running:

```
cup Atom
```

If you haven't used chocolatey before, this is the perfect chance to start. It is similar to [Homebrew](http://brew.sh/) on Mac OS X or [apt-get](https://help.ubuntu.com/community/AptGet/Howto) on Ubuntu. It allows you to easily discover, install, and update applications from the command line and there are already over 1,900 packages in the [registry](http://chocolatey.org/packages).

If you have any problems installing Atom using chocolatey, please open up an issue on the [atom/chocolatey](https://github.com/atom/chocolatey) repository. A special thanks goes out to [@bradgearon](http://github.com/bradgearon) who started the initial [Atom Chocolatey package](https://chocolatey.org/packages/Atom).

If you just want to download a `.zip` of the latest Atom release, that is now available from [atom.io](https://atom.io/) and the [Atom releases](https://github.com/atom/atom/releases) page. Atom on Windows does not currently auto-update so you will need to download new versions manually. Going forward we plan on adding an auto-updater that works the same as the Mac version.

We would love to hear what you think about Atom on Windows. We want it to feel like a true Windows app so please let us know about anything that feels out of place such as themes, fonts, keybindings, performance issues, or any missing native integrations. Please don't hesitate to open up issues on [atom/atom](https://github.com/atom/atom) with your feedback.
