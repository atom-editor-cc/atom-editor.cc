---
author: "benogle"
title: "Deprecated APIs Have Been Removed"
---

As of Atom [`0.206.0`](https://github.com/atom/atom/releases/tag/v0.206.0), deprecated APIs will not be available by default, and packages using deprecated APIs will no longer be loaded.

<!--more-->

## The Journey

When Atom was first released, the API was a product of organic growth. At the time, we were the only consumers of the API, so we added methods here and there guided by the needs of the internal packages. The resulting API was incomplete and inconsistent, but it was a necessary step in the evolution to our API today. It was a period of exploration. What kinds of things do we need to do? How should those things be exposed? The original API that shipped with Atom ended up being a great rough draft.

After releasing Atom into the wild and seeing hundreds of packages written against the API, our understanding of the requirements deepened. We saw what people were [struggling with](https://github.com/atom/atom/pull/5277), what [was slow](https://github.com/atom/atom/pull/3469), and patterns many [package authors were repeating](/blog/2014/07/24/decorations) over and over. This knowledge led to a major refactor of the API and [new docs](https://flight-manual.atom-editor.cc/api/latest/Atom) that were released [nearly 6 months ago](/blog/2015/01/15/announcing-the-atom-1-api).

Since then, the new API has been holding up with minimal additions to the nearly 1000 new packages and 800 upgraded packages.

## What is changing

### Faster

Atom `0.206.0`'s startup time and general performance has improved—it no longer needs to emit old events or create unnecessary objects. Removing these APIs also frees us up to make optimizations that would be hard to shoehorn into the code in a backward-compatible way.

### Some packages will not load

There are [172 remaining packages](https://gist.github.com/benogle/afad37e6c8de58272128) with deprecations. Atom will not load these packages in their current form. When starting Atom `0.206.0` for the first time, you may see a notification indicating which packages were not loaded:

![notification](https://cloud.githubusercontent.com/assets/69169/7992929/87bb0f8c-0ab7-11e5-9b0a-97ecb58f7a8b.png)

The button will take you to a page in the Settings View explaining exactly why each package was not loaded, and what you can do:

![settings-view](https://cloud.githubusercontent.com/assets/69169/7992930/87bde90a-0ab7-11e5-8576-15f848c0608e.png)

These packages are not dead forever! You can load them once they are updated to be deprecation free. If you see a package on [the list](https://gist.github.com/benogle/afad37e6c8de58272128) that you rely on, feel free open an issue on the package repo, or offer to take over as maintainer.

### A short-term stopgap

For a short time you will still be able to load deprecated packages by starting atom with the `--include-deprecated-apis` flag. e.g. `atom --include-deprecated-apis .` This will both enable the deprecated APIs and allow packages that use these APIs to load. To be clear: we plan to remove this flag and all of the deprecated APIs before the end of June. But we wanted to offer a way out for people who depend on a deprecated package.

## Conclusion

Even though packages that won't load may cause some pain, removing deprecated APIs will pave the way for a tighter, more consistent, and more performant Atom. Shedding the weight of our original API gets us one step closer to Atom 1.0, helps us remove code debt, and frees up the core team to focus on user-facing tasks.

I wanted to give a huge shout-out to all those who updated their packages in the [last two weeks](https://github.com/atom/atom/issues/6867). You have significantly reduced the frustration caused by removing these APIs. ![:heart:](https://github.githubassets.com/images/icons/emoji/unicode/2764.png){.emoji width="20" height="20" title=":heart:"} ![:green_heart:](https://github.githubassets.com/images/icons/emoji/unicode/1f49a.png){.emoji width="20" height="20" title=":green_heart:"}
