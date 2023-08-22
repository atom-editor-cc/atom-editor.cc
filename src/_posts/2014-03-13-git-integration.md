---
author: "kevinsawicki"
title: "Git Integration"
---

Have you ever used Atom and wondered what all the colors in the gutter, tree view, and status bar mean?

<!--more-->

The answer is [Git](http://git-scm.com/). Atom has built-in support for projects stored in a Git repository, providing core APIs and also including packages that add Git-specific features.

Today, I'd like to walk you through some of my favorite Git features in Atom and explain a bit about how they work and how they can be tweaked.

## Git API

First off, the packages and features mentioned in this post are all built around Atom's core Git API.

The `atom.project` global has a `getRepo()` method that will return a [Git](https://atom.io/docs/api/v0.71.0/api/classes/Git.html) repository for the current project. This object can be used to access information about the state of the repository and details about a file's status and changes.

This class uses the [git-utils](https://github.com/atom/git-utils) library which uses native bindings to the [libgit2](https://github.com/libgit2/libgit2) library.

## Checkout HEAD revision

Now onto the features, starting with my favorite, `cmd-alt-z`. This keybinding checks out the HEAD revision of the file in the editor.

This is a quick way to discard any saved and staged changes you've made and restore the file to the version in the HEAD commit. This is essentially the same as running `git checkout HEAD -- <path>` and `git reset HEAD -- <path>` from the command line for that path.

This command goes onto the undo stack so you can use `cmd-z` afterwards to restore the previous contents.

![](/assets/images/f.cloud.github.com/assets/671378/2402434/f8d3b90a-aa21-11e3-8e8c-ba0385eef5f7.gif)

## Git status list

Atom ships with the [fuzzy-finder](https://github.com/atom/fuzzy-finder) package which provides `cmd-t` to quickly open files in the project and `cmd-b` to jump to any open editor.

The package also comes with `cmd-shift-b` which pops up a list of all the untracked and modified files in the project. These will be the same files that you would see on the command line if you ran `git status`.

An [octicon](https://octicons.github.com/) will appear to the right of each file letting you know whether it is untracked or modified.

![](/assets/images/f.cloud.github.com/assets/671378/2404483/46581224-aa3c-11e3-836c-d79a5a8e9551.gif)

## Commit editor

Atom can be used as your Git commit editor and ships with the [language-git](https://github.com/atom/language-git) package which adds syntax highlighting to edited commit, merge, and rebase messages.

You can configure Atom to be your Git commit editor with the following command:

```sh
git config --global core.editor "atom --wait"
```

The language-git package will help you with your brevity by colorizing the first lines of commit messages when they're longer than 50 and 65 characters.

You can tweak these styles by adding the following snippet to your `~/.atom/styles.less` file. Click the Atom > Open Your Stylesheet menu item to open it.

```less
.editor .git-commit.line-too-long.deprecated {
  color: orange;
  text-decoration: none;
}

.editor .git-commit.line-too-long.illegal {
  color: #fff;
  background: #DA2C43;
  opacity: 0.9;
}
```

![](/assets/images/f.cloud.github.com/assets/671378/2402807/fbebfeea-aa26-11e3-94c0-7caffd1774e8.gif)

## Status bar icons

The [status-bar](https://github.com/atom/status-bar) package that ships with Atom includes several Git decorations that display on the right side of the status bar.

The currently checked out branch name is shown with the number of commits the branch is ahead of or behind its upstream branch.

Also an icon is added if the file is untracked, modified, or ignored. The number of lines added and removed since the file was last committed will be displayed as well.

![](/assets/images/f.cloud.github.com/assets/671378/2402683/48addd86-aa25-11e3-8593-64dc579d64b4.png)

## Line diffs

The included [git-diff](https://github.com/atom/git-diff) packages colorizes the gutter next to lines that have been added, edited, and removed.

This package also adds `alt-g down` and `alt-g up` keybindings that allow you to move the cursor to the next/previous diff hunk in the current editor.

![](/assets/images/f.cloud.github.com/assets/671378/2241519/04791a24-9cd6-11e3-9a12-164cabe81d58.png)

## Tree view

The included [tree-view](https://github.com/atom/tree-view) packages colorizes folders and files that are untracked, ignored, and modified.

Want to make modified files bold in the tree view? Add the following snippet to your `~/.atom/styles.less` file:

```less
.tree-view .entry.directory.status-modified > .header
.tree-view .entry.file.status-modified {
  font-weight: bold;
}
```

You can also use the `.status-added` and `.status-ignored` classes to style those types. In the screenshot below, new files are green, modified files are orange, and ignored files are dark grey.

![](/assets/images/f.cloud.github.com/assets/671378/2404228/ea43d5ac-aa38-11e3-8324-6544a433ad23.png)

## Further tweaks

You can open the [styleguide](http://github.com/atom/styleguide) using `cmd-alt-shift-g` to see more of the Git CSS classes that the built-in styles and themes use.

Happy hacking!
