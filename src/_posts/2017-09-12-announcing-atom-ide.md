---
author: "damieng"
title: "Introducing Atom-IDE"
---

![Atom IDE](/assets/images/user-images.githubusercontent.com/378023/29239014-9366bfa6-7f7d-11e7-9e04-e5cd535c3a5f.png)

GitHub, [in collaboration with Facebook](https://nuclide.io/blog/2017/09/12/Introducing-Atom-IDE-UI), are pleased to announce the launch of Atom-IDE - a set of optional packages to bring IDE-like functionality to Atom.

<!--more-->

The start of this journey includes smarter context-aware auto-completion as well as a host of code navigation features such as an outline view, go to definition, find all references as well as other useful functions such as hover-to-reveal information, errors and warnings (diagnostics) and document formatting.

Our initial release includes packages for TypeScript, Flow, JavaScript, Java, C# and PHP that utilize the power of language servers to provide deep syntactical analysis of your code and projects. The [language server protocol](http://langserver.org/) is being adopted by a number of organizations including Microsoft, Eclipse, Sourcegraph, Palantir, Red Hat, Facebook and now GitHub too!

![Atom IDE Screenshot](/assets/images/user-images.githubusercontent.com/378023/29859731-741403be-8d9e-11e7-99c5-6b914e3fff9c.png)

# Get started

We strongly recommended you use **Atom Beta 1.21** as it includes the necessary file monitoring and process control to ensure the underlying language servers are running properly.

You'll need to install at least two packages - the user interface for Atom IDE and a package that support the language you wish to use:

1. Bring up Atom's _Install Packages_ dialog (Settings View: Install Packages and Themes)
2. Search for and install the [atom-ide-ui](https://atom.io/packages/atom-ide-ui) package to bring in the IDE user interface
3. Install the IDE language support you need (e.g. [ide-typescript](https://atom.io/packages/ide-typescript)) - a summary of the ones available at launch include:

### TypeScript & JavaScript (ide-typescript)

The [ide-typescript](https://github.com/atom/ide-typescript/) package takes advantage of the Microsoft TypeScript server wrapped up in a language server protocol thanks to the work of the team at SourceGraph. While targeted at TypeScript it also works great with JavaScript providing you with autocompletion, document outlines, diagnostics and errors, etc.

### Flow (ide-flowtype)

Our good friends over at Facebook have published [ide-flowtype](https://github.com/flowtype/ide-flowtype) to bring the power of the Flow type annotation system to Atom.

### C# (ide-csharp)

One of the earliest examples of a language server was OmniSharp for the C# language. By taking advantage of the node-omnisharp package we are able to bring many IDE-like features into Atom for C# via [ide-csharp](https://github.com/atom/ide-csharp/).

### Java (ide-java)

The Eclipse foundation and Red Hat have been a big proponent of language servers and the Java package shows!  You will need a Java 8 runtime installed to get going but then can enjoy much richer editor facilities. Check out [ide-java](https://github.com/atom/ide-java/).

### PHP (ide-php)

The [ide-php](https://github.com/atom/ide-php/) utilizes a [PHP language server by FelixFBecker](https://github.com/felixfbecker/php-language-server) to provide support for the PHP scripting language. (Requires the PHP 7 runtime installed.)

# Using Atom-IDE

Each of the IDE packages expose a selection of functionality that is dependent on the underlying language server and is activated when you open files it supports. (Some take a few seconds to start-up and others like ide-java and ide-php will take a short while on first open to download the language server itself.)

Here's a quick summary of how these features are exposed within Atom IDE:

### Autocomplete

Autocomplete is enabled in all the ide packages we are shipping today. Start typing to get improved results. Some providers may require you to manually trigger autocompletion by pressing <kbd>Ctrl</kbd><kbd>Space</kbd> for performance reasons.

### Diagnostics

You can see diagnostics by clicking the red exclamation mark and yellow warning triangle at the bottom left of your Atom window. This will open the new Diagnostics pane that shows you the errors and warnings and allow you to click them to jump right to that location in the code. You will also see indicators to the left of line numbers in the editor itself.

### Find all references

Position the text cursor in the class or variable you are interested in then activate **Find all references** either from the right-mouse button menu or **Find References: Activate** from the command palette.

Some providers allow you to reformat the document. Simply select **Code Format: Format Code** from the command palette.
### Formatting

### Go to definition

<kbd>Ctrl</kbd> click on a class or variable reference to be taken directly to where it is defined within your project.

### Hover

Hover the mouse pointer over a type or other supported object and you can see some additional information relating to it.

### Outline view

Many providers let you see a tree-based outline view of the current document which you can search and then click to go right to that area of code. You can toggle the new Outline View from the View menu or the **Outline View: Toggle** command.

### Reference highlighting

Some providers let you see immediate references to the variable or object you are working on. Positioning your text cursor within that variable can highlight other references instantly.

# Future plans

This is just the start of our journey. With the help of our community, we plan to expand the number of languages that Atom-IDE can support and make it possible for you to run and edit applications, making Atom-IDE a true IDE.

We hope to see future language support for the great languages out there including Rust, Go, Python, etc.

If a language server exists for your favorite language it is incredibly easy to create your own Atom-IDE package that takes advantage of it by using our [atom-languageclient npm library](https://github.com/atom/atom-languageclient) that provides common automatic wire-up of the major features as well as helper tools such as downloading support files and conversions.
