---
author: "thedaniel"
title: "Keywords on Atom.io"
---

![two packages with keywords on displayed on atom.io](https://cloud.githubusercontent.com/assets/1476/6906692/4baa1d04-d6e5-11e4-95b5-55035fb5665e.png)

<!--more-->

You can now search and browse packages by keyword on Atom.io! Atom's package system supports a `keywords` field where package developers can add keywords that help describe a package—like hashtags on Twitter. Up to 5 of these keywords will be displayed on Atom.io, and you can click through to see what other packages have keywords that match.

If you're a package developer, this is a great time to add an array of keywords to your `package.json` file. For example, here's how it might look in the `package.json` file for the `colorpicker` package pictured above:

```json
{
  "name": "colorpicker",
  "description": "Colorpicker package for atom.",
  "keywords": [
    "colorpicker",
    "color",
    "css",
    "frontend",
    "ui"
  ]
}
```
