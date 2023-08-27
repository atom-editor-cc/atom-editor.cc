---
author: "gjtorikian"
title: "The New and Improved Flight Manual"
---

A little over [one year ago](https://blog.atom.io/2015/03/11/atom-docs), we announced The Atom Flight Manual. Intended as an introduction to using the Atom editor, it provides information on installing packages, navigating around the editor, and developing your first extension.

<!--more-->

Originally, the Atom Flight Manual was written in [AsciiDoc](http://asciidoctor.org/) and built using [Atlas](https://atlas.oreilly.com/), the online publishing system made by O'Reilly. Outsourcing the build tool allowed us to concentrate on creating content and not worry about documentation generation. Unfortunately, this had the unexpected consequence of preventing outside contributions to the Flight Manual. Devoted Atom users could update the content, but no one could be sure of how the final page would render, as Atlas is essentially a black box. When we learned last year that [the project would be discontinued](https://github.com/atom/docs/issues/140), we moved quickly to work on an alternative.

As of today, the Atom Flight Manual documentation is generated using open-source publishing tools. It's also hosted on its own standalone URL at [https://flight-manual.atom-editor.cc](https://flight-manual.atom-editor.cc/).

[![Flight Manual cover](/assets/images/blog.atom.io/img/posts/flight-manual.png)](https://flight-manual.atom-editor.cc/)

In [atom/docs#158](https://github.com/atom/docs/pull/158), we moved over to using the excellent [Nanoc](http://nanoc.ws/), which is used across GitHub at [https://help.github.com](https://help.github.com/) and [https://developer.github.com](https://developer.github.com/). We've opted to host the content on [GitHub Pages](https://pages.github.com/), which is used by hundreds of thousands of open source projects for their documentation. And we're using [Publisher](https://github.com/gjtorikian/publisher) to generate the HTML from `master` into the `gh-pages` branch.

The move to Nanoc also lowers the barriers to contribution. After cloning the [Flight Manual repository](https://github.com/atom/flight-manual.atom.io), you can run `script/server` to generate the docs locally, just as they'd appear online. Any content you change will automatically be regenerated for you, so you'll never need to wonder what the final output will look like.

We hope that with these change you'll take the time to make some pull requests to update [the Flight Manual](https://github.com/atom/flight-manual.atom.io) for new and experienced Atom users alike!
