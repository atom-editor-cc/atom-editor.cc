---
author: "kevinsawicki"
title: "Windows Installer and Auto Updater"
---

Installing Atom on Windows just got a whole lot easier with the new Atom Windows installer that is now available from [atom.io](/).

<!--more-->

Using the new Atom Windows installer also sets up Atom to automatically update whenever a new release is published just like the Mac version of Atom.

If this is your first time using Atom on Windows, you can head on over to [atom.io](/) and click the **Download Windows Installer** button to get started.

If you've previously installed Atom on Windows using [Chocolatey](https://chocolatey.org/), you should follow the instructions below to migrate to the new Windows installer.

### ![:chocolate_bar:](https://github.githubassets.com/images/icons/emoji/unicode/1f36b.png){.emoji width="20" height="20" title=":chocolate_bar:"} Uninstalling the Chocolatey Version of Atom

When Atom on Windows [first shipped](/blog/2014/07/09/hello-windows) the recommended installation flow was to install Atom via Chocolatey. So if you've previously installed Atom using Chocolatey you should follow these next two steps to completely uninstall the Chocolatey version of Atom.

- Run `cup Atom` to upgrade to the latest Atom release. This is required since previous versions of the Atom Chocolatey package did not uninstall correctly
- Run `cuninst Atom` to uninstall the Chocolatey version of Atom. This will not delete any of your installed packages or Atom config files

### ![:checkered_flag:](https://github.githubassets.com/images/icons/emoji/unicode/1f3c1.png){.emoji width="20" height="20" title=":checkered_flag:"} Using the New Atom Windows Installer

- Go to [atom.io](/)
- Click the **Download Windows Installer** button
- Run the downloaded `AtomSetup.exe` file
- Atom will launch once the installation completes
- Atom will automatically update when a new version is available

The new Atom Windows installer sets up Atom just like the Chocolatey package did.

- An Atom desktop shortcut is added
- An **Open With Atom** context menu is added to the Explorer for selected files and folders
- `atom` and `apm` are added to the `Path` environment variable so they can be run from the Command Prompt or PowerShell.

### ![:shipit:](https://github.githubassets.com/images/icons/emoji/shipit.png){.emoji width="20" height="20" title=":shipit:"} Squirrel For Windows

Since Atom's first release last February it has used the open source [Squirrel for Mac](https://github.com/Squirrel/Squirrel.Mac) library for handling automatic app updates.

Until recently there wasn't a Windows version available which is why Chocolatey was originally chosen to do the heavy-lifting. Now, thanks to [@paulcbetts](https://github.com/paulcbetts) and many other awesome [contributors](https://github.com/Squirrel/Squirrel.Windows/graphs/contributors), there is a version of [Squirrel for Windows](https://github.com/Squirrel/Squirrel.Windows) that not only does automatic updates but also makes creating installers for any app incredibly easy.

If you are developing an [Atom Shell](https://github.com/atom/atom-shell) app you can use the recently released [Atom Shell installer Grunt plugin](https://github.com/atom/grunt-atom-shell-installer) to create a Windows installer for your app. You can take a look at how how Atom configures its Windows installer build [here](https://github.com/atom/atom/blob/a6f31ed79192cba8f1509a819fd2689e3f050c93/build/Gruntfile.coffee#L202-L207).

### ![:star2:](https://github.githubassets.com/images/icons/emoji/unicode/1f31f.png){.emoji width="20" height="20" title=":star2:"} Thanks

A big thanks to everyone who [helped test out](https://github.com/atom/atom/issues/4244) early versions of both the Atom Windows installer and Squirrel for Windows.

If you have any issues with the new Windows installer or automatic updates please open an issue on the [atom/atom repository](https://github.com/atom/atom/issues/new).
