---
author: "jlord"
title: "New Services API"
---

Many packages don't just work in isolation, they depend on other packages. For instance, the `vim-mode` package depends on the `status-bar` package because it uses it to display the current editing mode.

<!--more-->

![statusbar](https://cloud.githubusercontent.com/assets/1305617/6344034/324fc20e-bba7-11e4-8946-855c83bcebde.png)

Previously a package like `vim-mode` would be forced to wait for all packages to load and then query the DOM for the `status-bar` in order to interact with it. Not only was this cumbersome, but it also created the possibility for breakage if the API of the `status-bar` ever changed.

Node's package manager, `npm`, solves a similar problem for static dependencies by giving each library its own copy of its dependencies based on a semantic version range. But in this case, we can't give every package its own copy of the status bar, since there's only one status bar in the atom workspace.

### Providing and Consuming Services

Atom's solution is the new [Services API](https://flight-manual.atom.io/behind-atom/sections/interacting-with-other-packages-via-services/), which allows packages to provide semantically versioned APIs for other packages to consume. With services, the `status-bar` package can provide multiple versions of its API simultaneously, providing a smooth upgrade path for dependent packages when the `status-bar` package evolves its API.

Services will also provide flex-points in the package ecosystem by enabling any package to provide the same service. For example, if someone wanted to implement a `status-bar-plus` package with a new and improved status bar, they could still provide the original `status-bar`'s services in order to be compatible with packages such as `vim-mode`. This ensures that authors will enjoy a level playing field when competing against incumbent packages by preventing calcification of the dependency graph.

Packages define what they are providing and consuming in their `package.json`. The `status-bar` package's `package.json` contains its [provided services API](https://github.com/atom/status-bar/blob/d4da6a42b7e5a8ec8b09807fd0e92cdb6919b0ec/package.json#L16-L23) with two versioned methods:

```json
"providedServices": {
  "status-bar": {
    "description": "A container for indicators at the bottom of the workspace",
    "versions": {
      "1.0.0": "provideStatusBar",
      "0.58.0": "legacyProvideStatusBar"
    }
  }
}
```

This gives other packages [access to the `status-bar` method `provideSatusBar`](https://github.com/atom/status-bar/blob/076d51ef89f2875ba32219343787d079b4bfbf64/lib/main.coffee#L92-L96) when they consume the 'status-bar' service. The `vim-mode` package does so by [declaring in its `package.json`](https://github.com/atom/vim-mode/blob/74cead837678bc14b3f484bce03ded1cf2996afe/package.json#L16-L21):

```json
"consumedServices": {
  "status-bar": {
    "versions": {
      "^1.0.0": "consumeStatusBar"
    }
  }
}
```

Now when `vim-mode` [calls `consumeStatusBar`](https://github.com/atom/vim-mode/blob/762a480c93cc444746c1a8150b5a24db90836144/lib/vim-mode.coffee#L42-L46) it is returned the result of the `provideStatusBar` method from `status-bar` which it can then use to insert the user's current state.

```coffee
consumeStatusBar: (statusBar) ->
    @statusBarManager.initialize(statusBar)
    @statusBarManager.attach()
    @disposables.add new Disposable =>
      @statusBarManager.detach()
```

For more details on the Services API see [Interacting with Other Packages via Services](https://flight-manual.atom.io/behind-atom/sections/interacting-with-other-packages-via-services/) in the documentation.
