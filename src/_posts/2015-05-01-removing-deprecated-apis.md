---
author: "kevinsawicki"
title: "Removing Deprecated APIs"
---

On **June 1st** all deprecated APIs in Atom will be removed in preparation for the 1.0 Atom release later that month.

<!--more-->

To make the migration as easy as possible on package authors, Atom has built-in tooling for finding and reporting these deprecations, and also a new mode to preview the 1.0 API with deprecations completely removed.

Make sure to upgrade your packages early and often as authors publish new versions with the deprecations removed. Run `apm upgrade` from the command line or open the **Settings View** and select the **Updates** tab to see which packages are out-of-date.

If you have any problems upgrading your package to the new APIs, please open an issue on the [atom/atom](http://github.com/atom/atom/issues) repository with the details, and we'll be happy to help make your package ready for 1.0.

# Finding Deprecations

Since the 1.0 API was [announced](/blog/2015/01/15/announcing-the-atom-1-api) in January, packages that use deprecated APIs have caused a warning indicator to appear in the status bar, which you can click to reveal the deprecation cop.

![status bar](https://cloud.githubusercontent.com/assets/1789/5766279/7473f99c-9cbd-11e4-91fb-46f16bf50c4a.png)

This view will show you which deprecated APIs are being used by which packages, link you to the location where deprecated calls occur, and suggest non-deprecated alternatives.

![deprecation cop](https://cloud.githubusercontent.com/assets/671378/7433537/367bb332-efe7-11e4-93e0-ef0a26dcf025.png)

You'll see similar warnings in the spec runner when you run your package's spec suite.

![deprecations in specs](https://cloud.githubusercontent.com/assets/671378/7433786/c0e86856-efe9-11e4-8dcc-bc196d7d60bd.png)

# 1.0 API Preview Mode

Atom now has a 1.0 API preview mode that opens an Atom window with all deprecated APIs completely removed. This will simulate the 1.0 API experience, so you can make sure all the packages you rely on are working correctly against the APIs available in Atom 1.0.

Run the `atom` command with the `--one` flag to start it up in this mode.

This flag is also supported by the `apm test` command so package authors can now run their package specs with `apm test --one` to launch the spec runner in 1.0 API preview mode.

You might see error notifications about missing properties or methods coming from packages still relying on APIs that are going away when 1.0 ships.

![error notification](https://cloud.githubusercontent.com/assets/671378/7422456/d29ffaa8-ef41-11e4-8fbd-50ab5147c999.png)

Creating an issue from the notification is a great way to let the package author know that 1.0 is coming and now is the time to update their package and publish a new version.

Be sure to upgrade to Atom 0.197 (or later) **before** trying out API preview mode.

Also make sure to update the `engines` field in your package's `package.json` file to mark it as 1.0-compatible:

```json
"engines": {
  "atom": ">=0.185.0 <2.0.0"
}
```
