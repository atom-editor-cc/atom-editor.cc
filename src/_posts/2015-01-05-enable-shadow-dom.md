---
author: "nathansobo"
title: "The Shadow DOM Is Now Enabled By Default"
---

After a successful trial period, the shadow DOM is now enabled by default to prevent style pollution in Atom's text editor component starting in today's release, 0.166.0. Check out the [introductory blog post](/blog/2014/11/18/avoiding-style-pollution-with-the-shadow-dom) for more details.

<!--more-->

If you're targeting the text editor's content with a selector that descends from `atom-text-editor` or `.editor` in your user style sheet or in a theme, you should use the `::shadow` expression to puncture the shadow boundary as follows:

```css
/* before */
atom-text-editor .gfm.markup.heading {
  font-weight: bold;
}

/* after */
atom-text-editor::shadow .gfm.markup.heading {
  font-weight: bold;
}
```

If you experience problems, please open an issue on the relevant package or [Atom core](https://github.com/atom/atom/issues). You can temporarily disable the shadow DOM in the settings view, but this option will be removed prior to Atom 1.0.

![screenshot_2015-01-05_13_46_01](https://cloud.githubusercontent.com/assets/1789/5619669/40391452-94e1-11e4-96ab-9e576547fd27.png)
