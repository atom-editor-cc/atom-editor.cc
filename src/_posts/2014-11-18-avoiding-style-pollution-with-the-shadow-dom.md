---
author: "nathansobo"
title: "Avoiding Style Pollution With The Shadow DOM"
---

**tl;dr** We'll be rolling out a breaking change to the text editor's DOM over the next few releases, encapsulating the editor's content with the Shadow DOM. It's behind a feature flag for now, so everyone has a chance to update their themes and packages before we make the change permanent.

<!--more-->

## The Problem

One thing that sets Atom apart from the typical web application is our focus on extensibility. Whereas many web applications control markup and styles in a centralized way, Atom is much more open-ended. This creates the potential for style conflicts when style sheets and markup are written by different authors. For example, take the following screenshot, excerpted from an [issue](https://github.com/atom/atom/issues/1800). Notice how the the `NSWindowWillCloseNotification` token was getting absolutely positioned away from its proper location and also getting rounded corners, a drop shadow, and a different background color.

![Styling Problem](https://cloud.githubusercontent.com/assets/1789/5075773/d685870c-6e52-11e4-9ed7-4428222eee56.jpg)

This was happening because the Objective-C grammar was giving the token a class of `notification`, which was then getting accidentally matched by an existing style rule in core that was intended to target notifications in the user interface. Luckily, we were able to simply remove the `.notification` style rule in this case, but this was only a temporary fix. Since the set of scope names from language grammars is open-ended, there is always the potential for these kinds of conflicts so long as text editor content is styled in a global way.

## The Solution

To prevent styling conflicts once and for all, we need to isolate the editor's content from styles intended for other elements in the workspace. A new feature of the web platform called the Shadow DOM gives us a means of doing just that. A [series of articles](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/) on _HTML 5 Rocks_ provides an in-depth explanation, but in short, the Shadow DOM provides a mechanism for encapsulating a portion of the document with respect to styling, events, and focus.

![screenshot 2014-11-17 09 45 51](https://cloud.githubusercontent.com/assets/1789/5073349/8dcae5b6-6e3e-11e4-9981-5536ddce254c.png)

In the screenshot above, note that the `#shadow-root` node is now the only child of the `<atom-text-editor>` element. This node can be expanded in the dev tools for development purposes, but it is invisible from the perspective of the style sheets in the surrounding DOM. Without the use of [special CSS expressions](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201#toc-style-cat-hat), no styles from the containing document can affect the contents of the shadow root. Conversely, if style sheets are loaded directly into the shadow root, they don't affect the containing document.

## Updating Themes and Packages

In order to give authors time to update themes and packages without disrupting users, the shadow DOM will be tied to a feature flag for the next few releases. This means that packages will need to support both modes during the transition phase. We've prepared upgrade guides for [UI themes](https://flight-manual.atom-editor.cc/upgrading-to-1-0-apis/sections/upgrading-your-ui-theme-or-package-selectors/) and [syntax themes](https://flight-manual.atom-editor.cc/upgrading-to-1-0-apis/sections/upgrading-your-syntax-theme/) to explain the required changes.

![screenshot_2014-11-06_10_50_20](https://cloud.githubusercontent.com/assets/1789/4940756/80704000-65dd-11e4-979b-adf3aa8ea51e.png)

Please enable the option and update your package or open an issue on the package repository. We'll be enabling the shadow DOM by default in a couple releases, and eventually we will remove the option entirely.

## Next Steps

The last three months have seen a lot of upheaval in Atom core as we've hammered the API into shape for 1.0. A lot of this work is invisible to the everyday user, but it's important that we take the time now to address systemic issues like the style pollution problems discussed here before we freeze Atom's API. As you can see on the [project roadmap](/roadmap), we're now in the final stages of this effort, after which we'll be making a big push to get the package ecosystem switched over to the new APIs. We're really excited for the leaner, meaner Atom core that's just around the corner.
