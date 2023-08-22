---
author: "thedaniel"
title: "Atom Progress Update"
---

When you have a piece of software as large as Atom, especially one spread across many repositories, you're bound to have many projects happening all at once that have their own unique schedules and goals. The high level view of what Atom is and where it is going is something we talk about a lot, but it can be hard for someone that's not involved directly with Atom development to understand what is actually being worked on.

<!--more-->

Everyone on the team is generally moving forward quality and performance work in their own area, but there are some long-running projects that many members of the community feel strongly about. Here's what's going on with the most commonly requested improvements:

## Large File Support

@maxbrunsfeld and @nathansobo are focused on replacing several components of the text editor's model layer with [a new library](https://github.com/atom/text-document) that will handle larger files, consume much less memory, and improve performance for a variety of text editing tasks such as editing with a large number of selections. The new design favors streaming over buffering wherever possible and uses balanced-tree data structures to efficiently model text mutation, transformation, and marker updates.

## Improving Autocomplete

@benogle is focused on improving autocomplete. Atom's default autocomplete package left a lot to be desired with poor matches, lack of extensibility, and not much in the way of discoverability. Ben is working on improving [`autocomplete-plus`](https://github.com/atom-community/autocomplete-plus) and [replacing the existing `autocomplete` package](https://github.com/atom-community/autocomplete-plus/issues/351) with `autocomplete-plus`. `autocomplete-plus` is extensible, and provides a much better experience out of the box.

## Startup speed

Atom consists of hundreds of small files, all of which must be read at startup. Reading all these files can be very slow on Windows machines and on machines with traditional hard drives. Using Atom Shell's package format ASAR, we can zip up all of these files into one large file which Atom will read only once on startup, saving precious time. @kevinsawicki and @zcbenz are working together on this and we're very close to supporting it—[this PR was merged a few days ago](https://github.com/atom/atom/pull/5382) but was temporarily reverted to fix a few new bugs we found. As a bonus this should also help with several rare install issues on Windows! We're also exploring other ways to improve startup speed (VM snapshots, etc.) and consider it an important ongoing project.

## Progress toward 1.0

We're making good progress toward 1.0—see [the tracking issue](https://github.com/atom/atom/issues/3684) for more information. As we approach this milestone, it's time for package authors to get very serious about removing deprecated APIs. After 1.0, these APIs won't just notify the user and keep working like they do today, rather they will be removed entirely from the editor. If a package tries to call a deprecated API, it will just break. We've just added a flag to the `atom` command-line tool (currently available on master, expected to ship with 0.190.0) that will allow you to emulate this behavior with `atom --one` to help you make extra sure the packages you're developing or depending on are ready for 1.0.
