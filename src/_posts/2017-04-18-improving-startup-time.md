---
author: "as-cii"
title: "Improving Startup Time"
---

Over the last months, the Atom team has been working hard on improving one of the aspects of the editor our users care about the most: startup time. We will first provide the reader with some background about why reducing startup time is a non-trivial task, then illustrate the optimizations we have shipped in Atom 1.17 (currently in [beta](https://atom.io/beta)) and, finally, describe what other improvements to expect in the future.

![Startup Time Illustration](/assets/images/blog.atom.io/img/posts/startup-time.png)

<!--more-->

For a long time, we've been wanting to have more control over Atom's startup code. In November of last year, as part of this effort, we created an [in-depth issue](https://github.com/atom/atom/issues/13253) that carefully described where time was spent when opening an Atom window. We realized that many of the operations happening during startup were redundant and that we could use the information we knew at build-time to minimize their cost.

### V8 snapshots

[V8 snapshots](https://v8project.blogspot.it/2015/09/custom-startup-snapshots.html) allow Electron applications to execute some arbitrary JavaScript code and output a binary file containing a serialized heap with all the data that is left in memory after running a GC at the end of the provided script.

This perfectly suits the startup scenario described above because snapshots can be used to eagerly perform work when building Atom; then, at runtime, we can simply reuse the JavaScript objects that were created as part of the snapshotting phase, thus reducing the amount of work needed to load a window. The tricky part of using this technology, however, is that the code is executed in a bare V8 context. In other words, it only allows us to run plain JavaScript code and does not provide access to native modules, Node/Electron APIs or DOM manipulation.

While this constraint was remarkably restrictive, we still saw a great potential in using snapshots as a tool to make our startup situation better, and so we started experimenting with different approaches that could allow us to use them in Atom. One of them was to try using V8 native APIs to load Node/Electron into the snapshot context so that we could work around the limitation of not being able to use modules like `path`, `fs`, etc. This turned out to be non-trivial though, especially because some of the modules that Electron and Node access when they boot up rely on native code, which is very difficult to deal with in snapshots.

Therefore, in order to circumvent some of the restrictions discussed above, we started exploring a simpler approach. Specifically, we decided to defer the usage of forbidden APIs until runtime so that all the other computation could still happen as part of the snapshot script. To do so, we set out to create a tool that automated this process without compromising code readability: electron-link.

### electron-link

[electron-link](https://github.com/atom/electron-link) is a node module that takes a JavaScript file (typically the entry point of an application) and a list of modules that need to be required lazily (see [Atom's build scripts](https://github.com/atom/atom/blob/d9ebd7e125d5f07def1a057a0a8278d4d9d7d23a/script/lib/generate-startup-snapshot.js#L19-L65) for an example). Then, starting from that file, it traverses the entire require graph and replaces all the forbidden `require` calls in each file with a function that will be called at runtime. The output is a single script containing the code for all the modules reachable from the entry point. This file can be then supplied to `mksnapshot` to generate the snapshot blob, which will be eventually used by Electron.

electron-link can also determine whether a module can be snapshotted or not. For instance, the following code can be snapshotted:

```js
const path = require('path')

module.exports = function () {
  return path.join('a', 'b', 'c')
}
```

And generates the following code:

```js
let path;
function get_path () {
  return path || path = require('path');
}

module.exports = function () {
  return get_path().join('a', 'b', 'c')
}
```

You can notice that the above code is valid because the forbidden module (i.e. `path`) is used inside a function that doesn't get called when requiring the script. On the other hand, when trying to process the following code, electron-link will throw an error because it is trying to access a forbidden module right when it gets required:

```js
const path = require('path')

module.exports = path.join('a', 'b', 'c')
```

Being a tool based on static analysis, however, electron-link is unable to detect all the cases where a piece of code can't be included in a snapshot. Therefore, as part of the build process, Atom will [run the generated JavaScript file](https://github.com/atom/atom/blob/d9ebd7e125d5f07def1a057a0a8278d4d9d7d23a/script/lib/generate-startup-snapshot.js#L70-L71) in an empty V8 context (similar to the one provided by `mksnapshot`) and catch any invalid code that potentially slipped through.

### Custom Elements and jQuery

As you may remember from the previous section, requiring native modules or using Node APIs is not the only forbidden operation in V8 snapshots. In fact, DOM APIs can't be accessed either when requiring a script. This was quite challenging from a technical standpoint, because many of our bundled packages used jQuery or HTML custom elements. The former used some feature detection techniques that relied on DOM globals, while, in order to use the latter, objects needed to extend the `HTMLElement` class, which is not available when generating a snapshot.

To solve both of these issues we could have taken some shortcuts by, for example, patching jQuery to stop performing feature detection at require time. However, we realized that neither jQuery nor custom elements were providing any tangible benefit to our users. In the case of jQuery it was quite the opposite, as sometimes it would cause unnecessary DOM reflows and a slower user experience. As such, we decided to take this as an opportunity to remove them from the codebase and improve Atom's code quality.

For the most curious, [#13254](https://github.com/atom/atom/issues/13254) provides a summary of all the work that went into this process, along with the relevant pull requests.

### Improving `require` time

All the tasks illustrated in the sections above laid the groundwork for finally reducing startup time. After dealing with all those roadblocks, we started addressing one of the major sources of slowness when opening Atom: calling `require`. Requiring a module involves the following steps:

- Resolving the module, as explained in [Node's documentation](https://nodejs.org/api/modules.html#modules_all_together).
- Reading synchronously its contents.
- Compiling it.
- Executing it.

Each of them has a cost, and in a big codebase like Atom's this cost is even more emphasized. For instance, take the following CPU profile of the initialization code:

![before-require-improvements](https://cloud.githubusercontent.com/assets/482957/24651248/64939ff2-192d-11e7-9101-5cb22a7aa1da.png)

You can notice how a lot of it is spent in `Module._compile` and `require`. On average it took `~ 0.9s-1.0s` to load a stock Atom window and activate its packages when no editor was open and the tree-view was closed. By using snapshots, we were able to cut this cost down to `~ 0.7s-0.8s`, thus improving startup time by 15-20%.

![after-require-improvements](https://cloud.githubusercontent.com/assets/482957/24651246/64864370-192d-11e7-85db-7ee669b36a07.png)

For more details, please check out [#13916](https://github.com/atom/atom/pull/13916).

### Eagerly constructing the `atom` global

Atom exposes many of its functionality through the `atom` global. This object is an instance of `AtomEnvironment` and, when created, takes care of loading the workspace, keymaps, configuration, etc. This is summarized by the following CPU profile:

![before-atom-env-improvements](https://cloud.githubusercontent.com/assets/482957/24651244/64709aac-192d-11e7-9da2-712ebfc9d38b.png)

Even though some of these tasks are dynamic (e.g. reading the user's configuration), others are repeated every time a new window is created and, thus, waste CPU cycles and I/O resources. Similarly to what we did for requiring modules, we used snapshots to improve this code path, making it two times faster.

![after-atom-env-improvements](https://cloud.githubusercontent.com/assets/482957/24651245/64732542-192d-11e7-8108-1e1bae8cd7cb.png)

For more details, please check out [#14024](https://github.com/atom/atom/pull/14024).

### Optimizing style sheet loading

After the improvements described above, all the noise related to requiring modules and constructing the `AtomEnvironment` disappeared from the graph, which emphasized other problems that were affecting startup time. Specifically, we started noticing that reading style sheets was causing significant slowdowns, especially on machines with a slow hard drive:

![before-style-sheets-improvements](https://cloud.githubusercontent.com/assets/482957/24651247/64872dc6-192d-11e7-9b64-e1a54be9e2db.png)

Almost every package that ships with Atom has a style sheet that customizes its appearance; considering that we ship 58 packages, we decided to bake all the core style sheets into the snapshot in order to make them already available when loading core packages at runtime. This resulted in a `~ 100ms` improvement on a fast machine with an SSD but, since most of this work was I/O bound, we expect it to be even more noticeable on slower hardware.

![after-style-sheets-improvements](https://cloud.githubusercontent.com/assets/482957/24651243/646f6876-192d-11e7-80d6-11a30e207dc9.png)

For more details, please check out [#14038](https://github.com/atom/atom/pull/14038).

### Preloading bundled packages

The last optimization that could be achieved thanks to snapshots was to reduce the cost associated to loading and activating bundled packages. This involves reading keymaps, settings, menus, etc. and registering them. As shown in the CPU profile below, doing this work in the snapshot allowed us to save `~ 60-90ms`:

![after-packages-preloading](https://cloud.githubusercontent.com/assets/482957/24651242/646efdb4-192d-11e7-9a4b-ec33cee7866d.png)

This is confirmed by Timecop, which highlights how packages loading alone became almost instantaneous:

![timecop-after-packages-preloading](https://cloud.githubusercontent.com/assets/482957/24651241/646e8398-192d-11e7-9bc7-79b0dc789064.png)

For more details, please check out [#14080](https://github.com/atom/atom/pull/14080).

### Conclusion

This marks the end of the first round of performance improvements to startup time. Overall, on a stock installation, we made loading Atom almost **50% faster** and snapshots were a crucial tool that enabled some otherwise impossible optimizations.

Performance continues to be one of the concerns the Atom team cares about the most. We believe there are still many things we can do to reduce startup time even further and, in the future, we would like to explore an approach where we take full advantage of Electron's multi-process architecture. Specifically, the main process (which was not affected by the improvements described in this blog post) and the renderer process could load almost in parallel, as opposed to the current situation where we fully load the main process first and only then spawn child renderer processes.

As always, we will keep you posted as we make progress on these enhancements. In the meantime we hope you will enjoy opening your editor faster with [Atom 1.17 Beta](https://atom.io/beta)! ![:zap:](https://github.githubassets.com/images/icons/emoji/unicode/26a1.png){.emoji width="20" height="20" title=":zap:"}
