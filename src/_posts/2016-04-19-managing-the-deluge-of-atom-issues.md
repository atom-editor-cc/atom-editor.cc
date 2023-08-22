---
author: "lee-dohm"
title: "Managing the Deluge of Atom Issues"
---

Atom has received a _ton_ of great feedback from our community. The Atom team has used this feedback to inform the direction of the project, addressing more than 3,000 bugs and 1,300 new features! We want to keep hearing from our community because it helps our products get better. How much feedback do we get? I'm glad you asked!

<!--more-->

As of this writing, the Atom organization has well over 4,000 open Issues across over 190 repositories. 167 Issues were opened in just the last seven days and 61 (~37%) of those Issues are already closed. 598 Issues were opened in the last 30 days and 268 (~45%) of those are now closed. We have an awesome team of volunteers that help out with triaging everything, answering questions, resolving duplicates, reproducing bugs, asking for more information where it would be helpful and much more.

To help us keep all of this under control and to get members of our community the support and answers they need as quickly as possible, we have a triage process for Issues. This mostly involves looking at the Issue, seeing what it needs and applying [the appropriate label](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#issue-and-pull-request-labels) so it can be easily found by other members of the team.

As the Atom community grows, managing feedback becomes an ever-increasing percentage of the time we have to maintain things. Because of this, we want to try some new strategies to:

1. Get people the help they need as fast as possible
2. Focus the maintainers' attention on the things that need fixing
3. Focus on the things that can be fixed now

To be clear, the goal of this effort is not to bring Atom down to zero open Issues. There will always be things that we want to work on or bugs we need to fix. The goal here is to be better stewards by being more responsive, to be more transparent by telling you what we need in order to complete things, and to make Atom's Issues lists easier to navigate by keeping them clean.

## Discussions on Discuss, Bugs and Enhancements on Issues

A lot of items that come in on Issues are not bugs or feature requests, they're questions or discussions. A lot of these questions can be answered by anyone in the community; they're not exclusive to an Atom maintainer. For feedback like this we set up [Discuss, the official Atom and Electron message board](https://discuss.atom.io/). It's a great place where people can get all kinds of help, whether it is about [using Atom](https://discuss.atom.io/c/support) or [creating themes](https://discuss.atom.io/c/themes) or [packages](https://discuss.atom.io/c/packages). For those that like more real-time discussions, there is also the [Atom Slack](https://discuss.atom.io/t/join-us-on-slack/16638).

The general rule of thumb is that GitHub Issues is best for things that have a definition of "done": they can be fixed, added, resolved, have a stake driven through its heart or otherwise laid to rest. For things where there isn't a clear goal or end state, where you want to debate theory, or ask questions Discuss and the Atom Slack are the way to go.

So we'll be encouraging people to use the best channel for their feedback more. If you ask a question on Issues and get a simple answer and reminder to check Discuss, it's because we want you to get the help you need as quickly as possible.

## Issues That Have No Way of Being Fixed

The whole point of Issues is that they are things that need to be fixed, implemented or completed in some fashion. But there are classes of things that get reported that are undefined or indistinct, there is no way to complete them or simply are chores that will never be done.

When a report comes in that looks like this, we will ask the original author of the Issue to clarify what "done" would look like to them. We can and will help with this process if you're unsure. But if the goal remains undefined or, in the maintainers' estimation, is unachievable, we will close the Issue.

## Abandoned Issues

Issues are a way for the users and the maintainers of a project to communicate and cooperate towards goals. If the maintainers can't get the information they need to resolve something, an Issue can just sit, get lost in the shuffle and never move forward. We also understand that people have busy lives and sometimes they simply can't get back to us or have forgotten the context of an Issue.

In order to focus the maintainers' attention on making progress, we will mark Issues with the `more-information-needed` label when the maintainers have a question. If we don't receive a response from the original author within a week, we'll give a gentle reminder. If we still haven't received a response within 30 days, we will close the Issue.

## Conclusion

I hope that this makes clear what our intention is with these changes. We want to be as responsive and as transparent as possible with these changes and with our collective efforts on Atom. We will continue to iterate on these things in the future in ways that we think that will help us serve the Atom community best. If you have any questions or want to discuss any of this, please feel free to offer feedback on [the Discuss topic for this post](https://discuss.atom.io/t/blog-managing-the-deluge-of-atom-issues/28012).
