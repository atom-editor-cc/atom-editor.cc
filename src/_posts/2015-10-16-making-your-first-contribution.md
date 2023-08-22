---
author: "benogle"
title: "Making your first Atom contribution"
---

Atom is a large open source project—it is made up of over [200 repos](https://github.com/atom), and there are over [3400 open issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+user%3Aatom) across all repos. As with most large open source projects, knowing where to start contributing can be overwhelming.

<!--more-->

When initially digging in, you might have questions like: Which of those 200 repos even implements the functionality that I want to change? Which issues are a good first foray into Atom development? Hopefully this post can shed some light.

## Atom's Composition

Atom is intentionally very modular. Nearly every non-editor UI element you interact with comes from a package, even seemingly core things like tabs and the status-bar. These packages are packages in the same way that packages in the [package store](https://atom.io/packages) are packages, with one difference: they are bundled into the [default distribution](https://github.com/atom/atom/blob/10b8de6fc499a7def9b072739486e68530d67ab4/package.json#L58).

![atom-packages](https://cloud.githubusercontent.com/assets/69169/10472281/84fc9792-71d3-11e5-9fd1-19da717df079.png)

Here's a list of the big ones:

- [atom/atom](https://github.com/atom/atom) - Atom Core!
- [tree-view](https://github.com/atom/tree-view) - file and directory listing on the left of the UI
- [fuzzy-finder](https://github.com/atom/fuzzy-finder) - the quick file open chooser; `cmd-t`

- [find-and-replace](https://github.com/atom/find-and-replace) - all find and replace functionality
- [tabs](https://github.com/atom/tabs) - a display for the tabs of open editors
- [status-bar](https://github.com/atom/status-bar) - the status bar at the bottom of the UI
- [markdown-preview](https://github.com/atom/markdown-preview) - rendered markdown pane item
- [settings-view](https://github.com/atom/settings-view) - settings UI pane item
- [autocomplete-plus](https://github.com/atom/autocomplete-plus) - autocompletions while typing
- [git-diff](https://github.com/atom/git-diff) - git diff gutter colorization in the editor
- [language-javascript](https://github.com/atom/language-javascript) - all bundled languages are packages too

There are many more, but this list should be a good starting point.

## Where to start contributing

We've labeled a number of issues across the atom org with two labels: `help-wanted` and `beginner`. Our goal with these is to provide a short-ish list of issues that are straightforward in what needs to be done. They may not all be _easy_ but they hopefully are easy to grok, and clear in the desired end result.

- [Beginner issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abeginner+label%3Ahelp-wanted+user%3Aatom+sort%3Acomments-desc)
- [Help wanted issues](https://github.com/issues?q=is%3Aopen+is%3Aissue+label%3Ahelp-wanted+user%3Aatom+sort%3Acomments-desc)

`beginner` issues are a subset of `help-wanted`. They should only require a few lines of code, and a test or two. `help-wanted` issues not tagged `beginner` will be a little more involved.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

## Tips

Here are a couple tips to help you write a successful PR:

- Blend in - take a peek at other code in the codebase, read through the [styleguide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#coffeescript-styleguide), and avoid adding new dependencies. When code isn't in a similar style, there will be a lot of back and forth with the PR reviewer concerning little nits.
- Write specs (tests) - we only accept changes and new functionality covered by specs. So be sure to add a spec or two, otherwise the first thing we'll ask you to do is add specs.
- See more tips in the [contributing guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#pull-requests)


## Onward

Hopefully you have a better handle on where to start. If you find any of these issues lacking in clarity, feel free to ping us (or our Community Manager: [@lee-dohm](https://github.com/lee-dohm)) and we'll be happy to provide more info. We're looking forward to seeing what you come up with!
