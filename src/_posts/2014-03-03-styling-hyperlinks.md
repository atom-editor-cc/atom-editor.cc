---
author: "kevinsawicki"
title: "Styling Hyperlinks"
---

The journey to completely customizing Atom starts with a single step. Today, I'll show you how to take that first step with a simple tweak to your Atom stylesheet to make hyperlinks in code stand out.

<!--more-->

![](/assets/images/f.cloud.github.com/assets/671378/2315759/2333bf3e-a328-11e3-8457-5bc8fae0883a.png)

Atom comes with the [language-hyperlink](https://github.com/atom/language-hyperlink) package that tokenizes links found in strings and comments. These link tokens have a `.markup.underline.link.hyperlink` CSS class that can be styled in your `~/.atom/styles.less` file.

Start by opening Atom and clicking the _Atom > Open Your Stylesheet_ menu. Then paste the following snippet into the opened editor:

```css
.editor .markup.underline.link.hyperlink {
  color: #F9EE98;
  text-decoration: underline;
}
```

Hit `cmd-s` to save and hyperlinks will now be yellow and underlined.

![](/assets/images/posts/40024cde-a328-11e3-9f37-eb20e0e8ee34.png)

Atom automatically reloads `~/.atom/styles.less` whenever it changes on disk so
the new styles will be applied to every open Atom window as soon as you save.

You can use the `ctrl-shift-o` keybinding to open the hyperlink under the
cursor in an external browser. This is provided by the [link](https://github.com/atom/link)
package that comes with Atom.

Happy hacking!
