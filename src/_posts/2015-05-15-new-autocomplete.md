---
author: "benogle"
title: "Autocomplete just got a whole lot better"
---

With the release of Atom 0.199.0, we're happy to be bundling the first community-developed package as part of the official Atom release: [`autocomplete-plus`](https://github.com/atom/autocomplete-plus).

<!--more-->

`autocomplete-plus` is the work of [@joefitzgerald](https://github.com/joefitzgerald) [@saschagehlich](https://github.com/saschagehlich), and [@park9140](https://github.com/park9140), who improved on the default autocomplete with better suggestion quality, suggestions displayed as you type, and extensibility. `autocomplete-plus` spread like wildfire; users downloaded it 330,000 times, making it the most popular package in the entire Atom ecosystem. Now `autocomplete-plus` will replace the original `autocomplete` package.

## What's new?

Out of the box, you will notice two large changes: suggestions show as you are typing, and there are colored icons next to each suggestion.

![symbols](https://cloud.githubusercontent.com/assets/69169/7623038/ca16e330-f98a-11e4-9332-362811ec009b.png)

Symbols from all open documents will be suggested when typing — functions, variables, and even words in strings. The icons indicate the suggestion type: right arrow for a snippet, `v` for variable, `c` for class, `f` for function, etc.

Beyond symbol suggestions, Atom 0.199.0 includes deeper intelligence for HTML, CSS, the Atom API, and snippets.

### HTML

There is now intelligent tag, attribute, and attribute-value suggestions in HTML and many HTML based templating languages, like PHP and ERB. Along with the suggestions are descriptions for tags and attributes, plus links to the MDN documentation.

![ac-html-2](https://cloud.githubusercontent.com/assets/69169/7637208/15859d98-fa21-11e4-87db-cae05b14d367.gif)

### CSS

Writing CSS is a lot easier in 0.199.0 with suggestions for CSS properties and property values. The CSS suggestions also work in CSS-derived languages like LESS and SCSS. LESS and SCSS language support has improved as well, notably all builtin LESS and SCSS functions (e.g. `darken` or `fadeout`) are displayed along with their doc strings and links to the documentation.

![ac-css-2](https://cloud.githubusercontent.com/assets/69169/7637610/14a8521e-fa24-11e4-8905-a587773eb7bd.gif)

### Atom API Suggetions

Atom now displays suggestions for the `atom` global. As with the HTML and CSS suggestions, each Atom API suggestion displays the description of the object with a link back to the atom.io documentation. Just type `atom.` in any JavaScript or CoffeeScript file in your Atom package to display the suggestions.

![atom-api](https://cloud.githubusercontent.com/assets/69169/7638200/fcc1580e-fa27-11e4-877c-a63e2ae41ee9.png)

### Snippets

[Snippets](https://flight-manual.atom-editor.cc/using-atom/sections/snippets/) are useful shortcuts that generate common code like requires, functions, loops, etc. Without snippet suggestions, not even we on the Atom team would know about all the cool snippets available. Snippets are indicated by the right arrow tab-stop icon, and exist for many contexts. To get snippet suggestions, just type!

![snip](https://cloud.githubusercontent.com/assets/69169/7638163/c1b52b28-fa27-11e4-82e9-73bcd68435cf.png)

## Extensibility

Overall, the part of `autocomplete-plus` that has the core team most excited is its extensibility. `autocomplete-plus` is able to consume other Atom packages that define an autocomplete **provider**. Each provider can provide suggestions for a specific language, e.g. [haskell](/packages/autocomplete-haskell), or a specific context, such as completing [system paths](/packages/autocomplete-paths) when importing a module. All of the intelligent behavior for HTML, CSS, Atom API, and Snippets now bundled with the official Atom release were written as providers: [`autocomplete-html`](/packages/autocomplete-html),
[`autocomplete-css`](/packages/autocomplete-css),
[`autocomplete-atom-api`](/packages/autocomplete-atom-api), and
[`autocomplete-snippets`](/packages/autocomplete-snippets).

In addition to the bundled providers, one of the many community-built provider packages can bring greater intelligence to your favorite language: [JavaScript](/packages/atom-ternjs), [TypeScript](/packages/atom-typescript), [python](/packages/autocomplete-plus-python-jedi), [go lang](/packages/go-plus),
[C#](/packages/omnisharp-atom), and others. See the full listing of available providers on the [autocomplete-plus wiki](https://github.com/atom/autocomplete-plus/wiki/Autocomplete-Providers).

The `atom-ternjs` provider:

![tern](https://cloud.githubusercontent.com/assets/69169/7659203/1ff15662-faf5-11e4-9404-086812a0d019.png)

The `autocomplete-plus-python-jedi` provider:

![jedi](https://cloud.githubusercontent.com/assets/69169/7659513/5db0e786-faf7-11e4-805e-61a56f4e0b74.png)

### Writing your own provider

Check out the [provider API documentation](https://github.com/atom/autocomplete-plus/wiki/Provider-API) to get started and use one of the many providers listed above as an example.

There are static analysis tools and autocomplete systems for many languages that can be integrated into an `autocomplete-plus` provider: [ternjs](http://ternjs.net/) for JavaScript, [jedi](https://github.com/davidhalter/jedi) for python, [rsense](https://github.com/rsense/rsense) for ruby, [racer](https://github.com/phildawes/racer) for rust, [clang](https://github.com/benogle/autocomplete-clang#clang-notes) for c/c++ and objective-c, etc. With systems like these, the `autocomplete-plus` provider becomes the glue code between Atom and the deeper analysis system.

### Improving language support

If writing a provider seems like too much, the suggestions from the default provider can be improved by tweaking settings in each language's package. Check out the [SymbolProvider API documentation](https://github.com/atom/autocomplete-plus/wiki/SymbolProvider-Config-API), and a [language package example](https://github.com/atom/language-less/blob/43ccc24025dbcefa1268d85576d3398845c46926/settings/language-less.cson#L4-L11) for more info.

## Onward

We're excited about `autocomplete-plus` not just for the improved experience it will provide, but also for the process by which it was developed. Our philosophy with Atom has been to optimize for evolution, and the transformation of `autocomplete-plus` from a community fork of a simple package to the full-featured, extensible system we're bundling today is a model for how we see Atom advancing. We believe that extensibility and modularity are not just nice-to-haves, but are actually essential to the development of complex shared infrastructure like Atom. The strength of Atom depends on the strength of Atom's community, and we think `autocomplete-plus` is a fantastic example of what a smart, engaged community can do.

Again, a big thank you to [@joefitzgerald](https://github.com/joefitzgerald) [@saschagehlich](https://github.com/saschagehlich), and [@park9140](https://github.com/park9140) for creating `autocomplete-plus`. And thank you to all the provider authors out there, specifically [@basarat](https://github.com/basarat), [@tststs](https://github.com/tststs), [@tinloaf](https://github.com/tinloaf), [@eqot](https://github.com/eqot), [@ctolkien](https://github.com/ctolkien) for help with the API and keeping their providers up to date given all the recent movement!
