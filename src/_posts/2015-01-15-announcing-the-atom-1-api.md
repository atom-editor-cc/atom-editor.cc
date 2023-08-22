---
author: "nathansobo"
title: "Announcing The Atom 1.0 API"
---

Over the past several months, we've spent a lot of energy getting Atom's API into a condition that we're confident supporting over the long term. With the release of Atom 0.174.0, we're happy to announce a stable 1.0 pre-release of Atom's API. We will be adding a few features in the coming months, but we don't plan on breaking anything that is [documented as public](https://atom.io/docs/api/latest) today.

<!--more-->

This overhaul represents a huge investment in Atom's future. The new API is cleaner, more consistent, and better-documented than what we launched with last February. It also removes some critical obstacles to achieving good performance and guides package authors toward more performant approaches. Equally important has been our focus on making the core API more minimal and framework-agnostic, which ensures that Atom's ecosystem can freely evolve with changing trends and technologies for years to come.

## What's Included?

We don't plan on making any breaking changes before 1.0 unless we find a serious bug. Beyond 1.0, we'll be following semantic versioning, meaning that we won't make any breaking changes until version 2.0. It's important to note that Atom's packages are versioned independently of core, so bundled packages like tabs or the tree-view may change going forward. This shouldn't be an issue for the vast majority of packages, because the API surface area represented by our bundled packages is tiny compared to the core API.

Today's changes focus largely on Atom's scripting interface, but we've also made some changes to the structure of the DOM, deprecating some CSS classes that were previously used to style elements in the workspace. The old classes will continue to be supported by workspace elements and the bundled UI themes for the time being to give package and theme authors a chance to transition before they are removed. For theme authors, that will mean targeting new custom tag names in the workspace. For package authors, that will mean using programmatic APIs to add panels rather than performing direct DOM manipulation.

2.0 will likely focus on solidifying Atom's style guide and more tightly codifying the DOM as an official part of our API. Until then, we'll avoid additional disruptions to DOM structure as far as styling is concerned. As a rule, programmatic DOM manipulation should not be considered part of the stable API at this time. If you mutate the DOM directly, be prepared to update your package when things change.

## Help Us Transition

We're going to need help from the Atom community to finish the job and leave the technical debt of the old APIs behind us. Atom is now entering a deprecation period designed to transition the ecosystem off of the old APIs so they can be removed from the system. We've prepared a detailed [upgrade guide](https://flight-manual.atom.io/upgrading-to-1-0-apis/sections/upgrading-your-package/) to help you get your packages ready for 1.0, and we'll also be providing dynamic feedback directly in the application.

Starting with version 0.174.0, packages that use deprecated APIs will cause a warning indicator to appear in the status bar, which you can click to reveal the _deprecation cop_. This view will show you which deprecated facilities are being used by which packages, link you to the location where deprecated calls occur, and suggest non-deprecated alternatives. You'll see similar warnings in the spec runner when you run your package's spec suite.

![Warning Indicator](https://cloud.githubusercontent.com/assets/1789/5766279/7473f99c-9cbd-11e4-91fb-46f16bf50c4a.png)

## Looking Forward

It's never fun to make breaking changes, but considering that Atom is still a relatively young project, we think it makes sense to jettison this extra code now rather than carrying it forever. Now that we're satisfied with the quality of the API, we're excited to refocus our full attention on performance and features as we push toward 1.0. Thanks for your help and patience through this transition. 2015 is going to be a great year for the Atom community. ![:tada:](https://github.githubassets.com/images/icons/emoji/unicode/1f389.png){.emoji width="20" height="20" title=":tada:"}
