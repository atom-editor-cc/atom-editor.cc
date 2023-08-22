---
author: "maxbrunsfeld"
title: "Multi-Folder Projects"
---

We've recently added the ability to open multiple folders in the same Atom window. You might find this useful if you often edit files in several folders at the same time.

<!--more-->

![multiple-root-folders](https://cloud.githubusercontent.com/assets/326587/7014346/b4776588-dc78-11e4-9354-96145a4e333d.png)

### Using Multiple Folders

You can start Atom with multiple folders by specifying their paths as command-line arguments:

```sh
atom ./first/folder ./second/folder
```

You can also add a folder to an existing Atom window by running `Application: Add Project Folder` from the [Command Palette](https://flight-manual.atom.io/getting-started/sections/atom-basics/). The key-binding for this command is `cmd-shift-o` on Mac and `ctrl-alt-o` on Linux and Windows.

To remove a folder from the project, right-click on it in the tree-view and select `Remove Project Folder` from the context menu. You can also add project folders by selecting `Add Project Folder` in this menu.

All of Atom's built-in packages now support multiple project folders. For example:

- If you use [ctags](http://ctags.sourceforge.net/), you can jump from a usage of a method in one project folder to its definition in another project folder using `Symbols View: Go To Declaration`.
- The Find and Replace panel searches across all project folders by default. You can search a particular project folder by typing its name, or a path beginning with its name, into the `File/Directory pattern` field.
- The Fuzzy Finder dialog searches files in all of your project folders. You can filter the results by project folder by including characters from a project folder's name in your search string.

### Updating Your Packages

If you maintain an Atom package that uses [`atom.project`](https://atom.io/docs/api/latest/Project), we encourage you to make sure that it handles multiple project paths gracefully. We have made some additions to the `Project` API:

- If you have a file path and you need to know how it relates to the current project paths, you can use [`atom.project.relativizePath(filePath)`](https://atom.io/docs/api/latest/Project#instance-relativizePath), which returns both the path to the project directory that contains `filePath` and the relative path to `filePath` from that project directory. The [fuzzy-finder](https://github.com/atom/fuzzy-finder) package [uses this method](https://github.com/atom/fuzzy-finder/blob/5a9c0a4f26691f723571bc3b68f15e4938aa8cf0/lib/fuzzy-finder-view.coffee#L153) when abbreviating file paths.
- To access the git repository for a given directory, use [`atom.project.repositoryForDirectory(directory)`](https://atom.io/docs/api/latest/Project#instance-repositoryForDirectory). Atom's [TextEditor](https://atom.io/docs/api/latest/TextEditor) class [uses this method](https://github.com/atom/atom/blob/74a627d41b41ce39e0a5ad43a08dbd4ce2a46fcc/src/text-editor.coffee#L593) for the `Editor: Checkout Head Revision` command.

### Looking Ahead

Now that this functionality is in place, we'll be taking further steps to refine the experience of working with multiple folders in Atom. We have [an open issue](https://github.com/atom/atom/issues/5728) to gather feedback on this feature. Please let us know if you have ideas about how we can improve it.
