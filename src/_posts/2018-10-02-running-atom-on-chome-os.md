---
author: "benbalter"
title: "Running Atom on Chrome OS"
---

Google [recently announced beta support for Linux apps on Chrome OS](https://chromeunboxed.com/news/chrome-os-beta-channel-linux-apps-update) as part of its "Crostini" project. If you have [one of the supported Chromebooks](https://www.xda-developers.com/chromebooks-linux-app-support/) getting Atom running takes just a few clicks.

![Screenshot of Atom on Chrome OS](/assets/images/posts/45442889-3de91a00-b691-11e8-8446-b5340d2f9bd5.png)

<!--more-->

### 1. Update to Chrome OS version 69 or later

Since Linux apps are a beta feature, you'll need to ensure you're running the most recent  version of Chrome OS, version 69 or later. While Chrome usually updates itself automatically, you can see what version you're running and can manually trigger an update by following [these instructions](https://support.google.com/chromebook/answer/177889?hl=en).

### 2. Enabling Linux app support

Once on the latest version, you'll need to enable Linux app support. If you're on a supported device, you should see a new "Linux (Beta)" menu item in your Chromebook's settings. Navigate to the Linux apps settings toggle and click "turn on". From there, Chrome should take a minute or two to configure and boot the Linux virtual machine. For more detailed instructions for enabling and installing Linux apps, follow [these instructions](https://www.androidpolice.com/2018/08/19/install-linux-applications-chrome-os/).

### 3. Installing Atom

Finally, with Linux apps natively supported, you'll need to install Atom. First, [download the `.deb` installer from Atom.io](https://atom.io/download/deb) (or [the beta installer](https://atom.io/download/deb?channel=beta) if you prefer). Next, in the "Files" app, find the download and drag it to the "Linux Files" folder that now appears in the left sidebar to copy it over to the linux VM. Finally, double click the `.deb` file (in the "Linux Files" folder) to install Atom. Once installed, Atom will appear in your app drawer, and can be added to the shelf like any other app. Plugins, themes, and configurations should work just like you'd expect on MacOS, Windows, or any other Linux platform.

### Atom on Chrome OS

Atom's performance will obviously depend on the hardware you're running it on, but on a Pixelbook, I've found Atom to be snappy enough to be my everyday editor (and with native Git support, it might become just that) — in fact, that's how I wrote this post!

Linux app support has been rolling out in beta to select Chromebooks over the past few months, and is now mature enough to be included in the stable channel. That said, it is a beta, and not one of Atom's officially supported platforms, so it may not always work as expected. If you do run into any trouble, the [Atom discussion board](https://github.com/atom/atom/discussions) is likely your best bet.

Happy editing!

_Ben Balter is a Senior Manager of Product Management at GitHub where he oversees the platform's Community and Safety efforts. An Atom user since 2013, he's looking forward to being an early adopter of Atom on Chrome OS and helping others to do the same._
