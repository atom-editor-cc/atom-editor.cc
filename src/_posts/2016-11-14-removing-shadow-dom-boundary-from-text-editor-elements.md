---
author: "as-cii"
title: "Removing Shadow DOM boundaries from text editor elements"
---

We recently released Atom 1.13 Beta and it features a foundational change to the editor rendering internals that we would like to share with you: the removal of the Shadow DOM boundary from `<atom-text-editor>` elements. In this blog post we are going to shed some light on the reasons that drove its introduction, as well as why we eventually decided to transition away from it and employ a different technique instead.

![Shadow DOM](/assets/images/blog.atom.io/img/posts/shadow-dom.png)

<!--more-->

# A little bit of history

On the road to 1.0, the number of packages in the Atom ecosystem was growing very rapidly. Back then, we started observing collisions caused by syntactic scopes with generic names (e.g. `.notification`) clashing with outer style sheets targeting unrelated HTML elements (e.g. Atom notifications).

At the same time, a web standard aimed at solving a similar problem was being developed and an early implementation of it was already available in the Chrome version Atom was using: the Shadow DOM. Therefore, [back in 2014](/blog/2014/11/18/avoiding-style-pollution-with-the-shadow-dom), we decided to embrace this new technology and changed Atom text editors to render their contents inside a Shadow DOM boundary instead.

What we did not realize at the time was that, although this new mechanism helped in many ways, it came with some negative trade-offs, too. In particular, it forced us to duplicate some of the style sheets (e.g. the syntax theme ones) within each shadow root so that package and theme authors could have still been able to explicitly target the editor visual elements. An alternative solution to this problem that we suggested (before the Shadow DOM spec was finalized) was to use `/deep/` and `::shadow` pseudo selectors, which are now unfortunately [being deprecated](https://bugs.chromium.org/p/chromium/issues/detail?id=489954).

Even more importantly, this architecture was getting in the way of making `atom-text-editor` a reusable component, because it made it even more coupled to Atom (and its ecosystem) and notably complicated the interface for injecting styles into the editor. [Other issues](https://github.com/atom/atom/issues/4590) were being reported too, causing a more complex user experience for package and theme authors. Ultimately, we started feeling like the extra complexity of the Shadow DOM was not worth its benefits.

# Transitioning to the Light DOM

For all the reasons stated above, today we are happy to announce that we have recently merged a [pull request](https://github.com/atom/atom/pull/12903) that removes Shadow DOM boundaries from `<atom-text-editor>` elements. It does so in a way that prevents grammar scopes from being mistakenly styled from the outside by a package. Specifically, every syntactic class name will now be prepended with `syntax--` to avoid collisions or style mismatches; as a result, styling a JavaScript operator will now look similar to the following snippet:

```css
.syntax--source.syntax--js .syntax--operator {
  color: #000000;
}
```

This has a number of advantages over using a shadow boundary, the first being simplicity and ease of use. In addition, it provides a solution to the problems listed above that does not clutter the DOM with duplicate style sheets and [shadow-piercing selectors](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/#toc-style-cat-hat).

This is a backward-incompatible change, but we haven't yet accumulated enough API changes to warrant a bump of Atom's major version number to 2.0.0. Instead, we're following a familiar strategy of deprecating the old API while keeping it working by automatically upgrading old selectors and showing a deprecation warning in the status bar. You can [take a look](https://github.com/atom/autocomplete-plus/pull/779) at [some](https://github.com/atom/atom-dark-syntax/pull/31) of the [pull requests](https://github.com/atom/atom-dark-ui/pull/64) we have opened on bundled packages to get a sense of how style sheets will need to be changed. We have also updated the [flight manual](https://flight-manual.atom-editor.cc/) to provide guidance on the upgrade process.

Please note that once you change your style sheets to remove the deprecated shadow DOM selectors, they will no longer be compatible with versions of Atom prior to 1.13. As such, we recommend that package and theme authors set the Atom version to `>= 1.13` in the `engines` section of their packages' `package.json` to prevent the upgraded packages from being installed on older versions of Atom.

# Conclusion

Removing the Shadow DOM is an important step for the editor's future, as doing so will allow us to extract it, clean it up and continue optimizations. This change was rolled out with Atom 1.13 beta and we are really excited for you to try it out! ![:zap:](https://github.githubassets.com/images/icons/emoji/unicode/26a1.png){.emoji width="20" height="20" title=":zap:"}

We expect package breakage to be minimal but, considering the invasive nature of this change, we would ![:heart:](https://github.githubassets.com/images/icons/emoji/unicode/2764.png){.emoji width="20" height="20" title=":heart:"} to have your feedback! If you notice any problem you think could be related to the Shadow DOM removal, please create an issue and we will be happy to fix it!
