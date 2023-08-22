---
author: "kevinsawicki"
title: "Introducing Highlights"
---

Back in Atom's early days, the decision was made to support [TextMate grammars](http://manual.macromates.com/en/language_grammars) for syntax highlighting. There were over 100 existing languages supported under the [TextMate org.](https://github.com/textmate) and [Oniguruma](http://www.geocities.jp/kosako3/oniguruma) regular expressions provided great power for complex pattern matching.

<!--more-->

First we built out native Node bindings to Oniguruma and this library now lives in the [node-oniguruma](https://github.com/atom/node-oniguruma) repository. Then we built a CoffeeScript tokenizer that implemented TextMate's grammar format, we called this library [first-mate](https://github.com/atom/first-mate). Then `apm init --convert` was added to the Atom package manager allowing TextMate bundles to be converted to Atom packages automatically. This command was used to generate all the `language-*` packages under the [Atom org](https://github.com/atom).

Today, this entire syntax highlighting toolchain can be used outside of Atom with the introduction of [highlights](https://github.com/atom/highlights). Highlights is a simple command line tool and Node library that reads in source code and writes out HTML with CSS classes for all the tokens found. Combine this with the stylesheet from your favorite Atom theme and you'll have HTML code snippets that match the look and feel of the code inside Atom. Highlights comes bundled with ~25 languages and can be extended to include more.

See it in action [here](https://atom.github.com/highlights/examples) and read more about it over at the [atom/highlights](https://github.com/atom/highlights) repository.

![](/assets/images/f.cloud.github.com/assets/671378/2529179/fc7a0d9c-b517-11e3-9747-c079678e3e77.gif)
