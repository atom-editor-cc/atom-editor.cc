---
author: "annthurium"
title: "Coming Soon: Atom Usage Metrics Improvements"
---

Developing Atom sometimes feels like flying in the dark. You imagine a feature. You design it. You implement it. And then what?  Is this thing on?  Is anybody using it?

Data helps us make more informed decisions. The Atom usage data we currently have doesn't tell us if people are using the new features we've built. Also, our current architecture makes it difficult to add new usage metrics. We're working on some changes to make Atom usage metrics more extensible and easier to comprehend. The goal: understand how users are interacting with Atom and build a roadmap that better serves the Atom community.

<!--more-->

Atom currently collects usage metrics on an opt-in basis that are sent to Google Analytics. We are building some code to send usage metrics to GitHub's in-house analytics pipeline, instead of Google Analytics. Why?  First, there were [multiple](https://github.com/atom/metrics/issues/43) [calls](https://github.com/atom/metrics/issues/63) from the Atom community to move away from Google Analytics. Second, GitHub's other client applications, such as [GitHub Desktop](https://desktop.github.com/), are sending their usage metrics through GitHub's in-house pipeline. Having a unified interface for understanding usage metrics across client apps reduces the brain power it takes to understand the metrics, so we can make better decisions about our roadmap.

Furthermore, we want to make it easier to extend our existing usage metrics as we build features. The new `github-telemetry` package will provide a simpler API that can be used by any core Atom package to define and collect usage metrics. This API won't be available to community packages, because we'd have to give package authors access to internal GitHub data in order for that to be useful.

The Atom team, and GitHub, care deeply about [user privacy](https://help.github.com/articles/github-privacy-statement/), so don't worry: metrics collection is still enabled on an opt-in basis only. Though we do hope the move away from Google Analytics will inspire more users to opt-in. You don't need to make any changes to your settings - whatever your current opt-in / out settings are, they will be respected. The Atom team will also provide an example data payload so users can understand exactly what data is being sent (see [Desktop's](https://desktop.github.com/usage-data/) for an example.)

Please note that these improvements were planned before the Microsoft acquisition was announced, and indeed, before the Atom team even learned about the acquisition.

Since we value transparency, you can follow our progress [here](https://github.com/atom/telemetry). Thanks for reading, and for being a part of the Atom community!
