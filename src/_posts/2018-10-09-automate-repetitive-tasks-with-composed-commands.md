---
author: "jasonrudolph"
title: "Automate Repetitive Tasks with Composed Commands"
---

When working with text, it's common to find yourself performing a certain set of actions in the same order, time and time again. By taking advantage of Atom's hackability, you can eliminate this repetition with a custom command to perform an entire sequence of actions for you.

<!--more-->

### Thinking in commands

Many of the actions that you perform in Atom are accessible as [commands](https://flight-manual.atom.io/getting-started/sections/atom-basics/#command-palette). Whether you're moving the cursor to the right, saving the current file, closing a tab, or pushing code to a Git repository, each action is a named command. And while you may currently perform those actions using the menu, using the keyboard, or clicking with your mouse, they can also be triggered programatically.

### Composing a command to run other commands

Imagine you often encounter files where you want to change the use of whitespace. For example, assume you want to convert tabs to spaces, trim any trailing whitespace on each line, and convert line endings from Windows-style (CRLF) to Unix-style (LF). You could accomplish this by running these three commands, one after another:

- [Whitespace: Convert All Tabs to Spaces](https://github.com/atom/whitespace/blob/v0.37.7/lib/whitespace.js#L58)
- [Whitespace: Removing Trailing Whitespace](https://github.com/atom/whitespace/blob/v0.37.7/lib/whitespace.js#L15)
- [Line Ending Selector: Convert to LF](https://github.com/atom/line-ending-selector/blob/v0.7.7/README.md#atom-commands)

Or, you could combine them into a single ["composed" command](https://flight-manual.atom.io/behind-atom/sections/keymaps-in-depth/#composed-commands). Let's give that a shot.

#### 1. Open your init script

First, activate the [command palette](https://flight-manual.atom.io/getting-started/sections/atom-basics/#command-palette), and run the "Application: Open Your Init Script" command.

![open init script via command palette](/assets/images/user-images.githubusercontent.com/2988/46099338-8249df00-c194-11e8-80ca-2d2c8af77ff9.png){width="776"}

#### 2. Add a custom command

Next, paste in the snippet below to define your new command:

```coffee
atom.commands.add 'atom-workpace', 'me:personalize-whitespace', ->
  view = atom.views.getView(atom.workspace.getActiveTextEditor())
  atom.commands.dispatch(view, 'whitespace:convert-all-tabs-to-spaces')
  .then () -> atom.commands.dispatch(view, 'whitespace:remove-trailing-whitespace')
  .then () -> atom.commands.dispatch(view, 'line-ending-selector:convert-to-LF')
```

For the purposes of this example, there are two important items to note in this snippet:

- On line 1, the second argument specifies the name of the new command. In this case, it's `me:personalize-whitespace`.
- Line 3 invokes, the first command (`whitespace:convert-all-tabs-to-spaces`). Once that command completes, line 4 invokes the second command (`whitespace:remove-trailing-whitespace`). And once that command completes, line 5 invokes the final command (`line-ending-selector:convert-to-LF`).

As you venture into defining your own composed commands, [Atom's API docs](https://flight-manual.atom-editor.cc/api) can guide you in understanding the details of each function used above as well as the many other functions available to help you customize Atom.

#### 3. Reload Atom to pick up your new command

Each time you open a new Atom window, Atom loads your [init script](https://flight-manual.atom.io/hacking-atom/sections/the-init-file/#the-init-file). You can reload Atom to pick up changes you've made to your init script. To do so, activate the command palette, and run the "Window: Reload" command.

![reload atom via command palette](/assets/images/user-images.githubusercontent.com/2988/46098990-9e994c00-c193-11e8-87c3-01a42c6b18e4.png){width="775"}

#### 4. Use your new command

Now your new command is ready for action. Open a file where you want to run the new command ([example file](https://gist.github.com/jasonrudolph/c9422a2671a4bee2ff12633705eded33#file-hello-rs)), activate the command palette, find your new command by name ("Me: Personalize Whitespace"), and run it:

![demo](/assets/images/user-images.githubusercontent.com/2988/46299239-e7c01600-c56e-11e8-9b8a-bfff5f7febae.gif)

### Context matters

Note that some commands are designed to be executed only in specific contexts. For example, the `line-ending-selector:convert-to-LF` command [assumes that there is an active text editor](https://github.com/atom/line-ending-selector/blob/v0.7.7/lib/main.js#L53-L54) in your Atom workspace. If you run that command when there are no active text editors open in Atom, the command obviously can't change any line endings.

If you see that a command isn't functioning as expected, it can be helpful to look at the command's implementation to understand what assumptions the command is making.

### Next steps

With just the few simple steps shown above, you're ready to combine any repetitive sequence of commands into a single composed command:

- Check out the [command palette](https://flight-manual.atom.io/getting-started/sections/atom-basics/#command-palette) to see the hundreds of commands available to you, including commands from the community [packages](/packages) you've installed.
- Want to get things done even faster? You can also [define a keyboard shortcut](https://flight-manual.atom.io/behind-atom/sections/keymaps-in-depth/#composed-commands) for your new command.
- Explore public init scripts to [see how other people combine commands to improve their workflows](https://github.com/search?q=filename%3Ainit.coffee+filename%3Ainit.js+atom.commands.dispatch&type=Code). You might just find inspiration for your own composed commands.
- Need help? Hop into the [Atom Slack](https://atom-slack.herokuapp.com/) or ask for help [on the forum](https://discuss.atom.io/).

Happy automating!
