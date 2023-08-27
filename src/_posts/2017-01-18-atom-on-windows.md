---
author: "damieng"
title: "Atom on Windows"
---

Last year I joined the Atom team with the goal of making Atom a better experience on Windows and thought it would be worth highlighting some of our work so far as well as a few of the things new in Atom 1.14 (currently in beta).

If you haven't tried Atom on Windows in a while or were just plain heads-down on your projects here's some Windows-specific improvements you may have missed.

<!--more-->

## 64-bit

In 1.14 two architectures of Atom are now available for Windows. The existing 32-bit (ia32/x86) version and the shiny new 64-bit (amd64/x64) version.

The new version leaves the 32-bit resource limits behind and can take advantage of faster 64-bit instructions in lower layers such as node, v8 and native modules.

In order to ensure compatibility current installations will not switch to a new architecture without intervention - you'll need to grab the 64-bit version yourself. Visitors to [Atom.io](/) will be offered x64 versions from 1.14 onwards if they are on an x64 system.

Your settings and extensions will be preserved when switching although there may be a delay while apm rebuilds native modules for any packages you have installed. Let us know if you run into any issues!

## File association

Atom's auto-update mechanism happens transparently behind the scenes without services running full-time to make that happen. This does however mean that the Atom executable path changes between revisions so files you manually associated with atom.exe would break.

Now however Atom registers itself as a file handler automatically meaning it shows up right away in _Open With…_ and you can just chose it from there. When Atom upgrades itself it will rewrite these associations for you so no more broken links. If you want to change this behavior you can turn it off with a single check in the _Atom > Settings > System_ pane. Once associated you'll see a sparkly new Atom document icon for the file.

Also in Atom 1.14 you will find an atom.exe stub one level up in the file system that never moves! You can point apps that don't support Windows file associations like Cyberduck here as an alternative.

## Installation

Installation is often overlooked but can be a real pain if you don't get it right thanks to the proliferation of malware and the responsive measures from the anti-virus community.

We have improvements to help ensure Atom gets installed correctly on your system including:

- Stronger code signing with sha256, timestamping and a new certificate
- Extract-in-place to prevent on-access scanners interfering with files being moved
- An [MSI installer](https://flight-manual.atom.io/getting-started/sections/installing-atom/#msi-installer-for-windows) that installs a personal copy of Atom for each user as they sign in
- Better update reliability for pins and shortcuts via [Squirrel](https://github.com/Squirrel/Squirrel.Windows) (the install/update system we use)

## Contributing

Using Windows to contribute to Atom was a little harder than it should have been.

The [Windows build instructions](https://github.com/atom/atom/blob/master/docs/build-instructions/windows.md) have been updated with accurate steps on getting started as well as a more comprehensive troubleshooting for scenarios you may run into. You can now even use the much smaller "C++ Build Tools" instead of a full Visual Studio installation.

Atom's test suite now runs and passes on Windows 64-bit builds so just type `script\test` to ensure no regressions (or `atom --test` if contributing to an Atom package). Debugging inside Developer Tools you'll see the sources navigator is no longer jumbled (Windows backslashes in sourcemaps were confusing it).

We also added a new section to the Atom Flight Manual called [Cross-Platform Compatibility](https://flight-manual.atom.io/hacking-atom/sections/cross-platform-compatibility/) that gives some guidance on how to make sure your code works well across platforms.

Finally AppVeyor is now running [CI builds of our core packages and important  libraries](https://github.com/atom/atom/blob/master/docs/build-instructions/build-status.md) for Windows.

## Portable mode

The [portable mode](https://flight-manual.atom.io/getting-started/sections/installing-atom/#portable-mode) was finally documented and some important changes made in the forthcoming 1.14 release;

- The `ATOM_HOME` environment variable no longer prevents portable mode
- The `--portable` argument was removed as it caused confusion (it copied your .atom folder to be portable not actually forced portable mode)

Getting up and running with a portable version is simple:

1. Download the atom-windows.zip and extract it where you want it
2. Create a `.atom` folder in the folder above `atom.exe` where your config will live (or copy your existing one from %userprofile%)
3. Launch Atom from the folder!

In 1.14 you can also create an `electronUserData` folder in there and have Atom store the Electron data there instead of in your roaming appdata. (where DevTools console history etc. lives)

Some have asked for Atom to use the portable drives even for temporary and cache files. While we don't recommend it as these drives are slower than modern SSDs you can put a simple .cmd file on your drive to achieve it and launch atom via that:

```
@echo off
SET "TEMP=%~d0\temp"
"%~dp0resources\cli\atom.cmd" %*
```

Setting TEMP is necessary to ensure Atom and its various dependencies store temporary files in the right place.

## Shell extension option

We heard from some passionate users that they didn't like the _Open with Atom_ context-menu that appeared throughout Explorer for every single file and folder.

There was no performance hit, it was simply an icon and label in the registry. But it's clutter if you don't use it, and redundant now that we have proper file associations working, so now off by default.

![Screenshot of new System Settings for Windows](https://cloud.githubusercontent.com/assets/118951/20823658/0d6a7fd0-b80b-11e6-8729-e0215e9e4cb2.png)

If you want to switch it on you can head to our new _System settings_ pane shown above and check a box to get it back for either files or folders. If you've had Atom installed a while it is still on for you so you can also head into System settings to turn it off.

## Taskbar enhancements

The taskbar on Windows is capable of supporting menu options and in 1.14 you'll see a New Window task as well as recent files and integration with our new [reopen projects feature](https://github.com/atom/atom/pull/13046) either of which you can pin to for fast access.

![Screenshot of Atom's taskbar menu](https://cloud.githubusercontent.com/assets/118951/20551914/4e1a0630-b0fa-11e6-9207-f9b5203e88be.png)

## Package installation

Sometimes installing an Atom package doesn't succeed for any number of reasons. We've made improvements that help including;

- Detecting `git.exe` from GitHub Desktop when git isn't on your path
- Bypassing auto-run scripts when we shell out to avoid parsing errors
- Supporting "C++ Build Tools" for native dependencies (instead of Visual Studio)

## Little extras

Of course there are many other improvements and tweaks this year that benefit Windows users - some exclusively and some cross-platform including;

- International <kbd>AltGr</kbd> keyboard support
- Path length improvements with npm3
- Simultaneous use of Atom by multiple signed-in users
- Atom file icon for associations in the Windows style
- CP 850 support (DOS codepage in Europe)
- No command-line noise when launching `atom.exe` directly
- Improved C# syntax highlighting
- Better handling of spaces in paths
- Improved command-line launching from cygwin, Git Bash, and msys
- File and Selection menus accessible with <kbd>alt</kbd>-<kbd>f</kbd> and <kbd>alt</kbd>-<kbd>s</kbd>


Share and Enjoy!
