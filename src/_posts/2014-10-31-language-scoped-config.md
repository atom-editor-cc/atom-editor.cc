---
author: "benogle"
title: "Language Specific Configuration Settings"
---

> **Update:** The `scoped-properties` directory in language packages is now named `settings`. See the `master` branch of the [language-gfm](https://github.com/atom/language-gfm) and [language-python](https://github.com/atom/language-python) packages for the latest examples.

<!--more-->

Previously Atom had no way to set language-specific configuration settings without a package. Language-specific settings are now built in ![:tada:](https://github.githubassets.com/images/icons/emoji/unicode/1f389.png){.emoji width="20" height="20" title=":tada:"}. For example, you may want Atom to soft wrap markdown files, have two-space tabs for ruby files, and four-space tabs for python files.

There are several settings now scoped to an editor's language. Here is the list so far:

- `editor.tabLength`
- `editor.softWrap`
- `editor.softWrapAtPreferredLineLength`
- `editor.preferredLineLength`
- `editor.scrollPastEnd`
- `editor.showInvisibles`
- `editor.showIndentGuide`
- `editor.nonWordCharacters`
- `editor.invisibles`
- `editor.autoIndent`
- `editor.normalizeIndentOnPaste`

## Language-specific Settings in the Settings View

Now you can edit these config settings in the settings view on a per-language basis. Just search for the language of your choice in the left panel, select it, and edit away!

![screen shot 2014-10-30 at 3 08 38 pm](https://cloud.githubusercontent.com/assets/69169/4852963/5f8c3968-6081-11e4-8b3e-590b1e3e8245.png)

## Language-specific Settings in your Config File

Open your config file via the command palette (`cmd-shift-p` or `ctrl-shift-p` for windows / linux), type `open config`, and hit enter.

Global settings are now under a `global` key, and each language can have its own top-level key. This key is the language's [scope](https://github.com/atom/language-python/blob/master/grammars/python.cson#L1). Language-specific settings override anything set in the `global` section.

```coffee
'global': # all languages unless overridden
  'editor':
    'softWrap': false
    'tabLength': 8

'.source.gfm': # markdown overrides
  'editor':
    'softWrap': true

'.source.ruby': # ruby overrides
  'editor':
    'tabLength': 2

'.source.python': # python overrides
  'editor':
    'tabLength': 4
```

### Finding a language's scope name

The scope name is shown in the settings view for each language. Search for the language of your choice in the left panel, select it, and you should see the scope name under the language name heading:

![screen shot 2014-10-30 at 3 09 57 pm](https://cloud.githubusercontent.com/assets/69169/4852978/8905f9f0-6081-11e4-8e5c-a6851e705871.png)

## Using in your own packages

You can use scoped settings in your own packages. [Config::get](https://flight-manual.atom-editor.cc/api/latest/Config#instance-get) now accepts a `scopeDescriptor` and [Config::set](https://flight-manual.atom-editor.cc/api/latest/Config#instance-set) accepts a `scopeSelector`. See the [the scopes docs](https://flight-manual.atom.io/behind-atom/sections/scoped-settings-scopes-and-scope-descriptors/) to learn more about scopes.

The simplest way to implement language specific settings is to `get` your setting with the language scope descriptor — the editor's root scope descriptor.

```coffee
# Falls back to a global value if no language specific value is defined.
atom.config.get(editor.getRootScopeDescriptor(), 'my-package.my-setting')
```

You can watch for changes on a given keyPath for a scope with [Config::observe](https://flight-manual.atom-editor.cc/api/latest/Config#instance-observe).

```coffee
atom.config.observe editor.getRootScopeDescriptor(), 'my-package.my-setting', (value) ->
  # do stuff
```

When watching for changes to a config setting for a given scope, you should take grammar changes into account.

```coffee
editor = atom.workspace.getActiveTextEditor()
subscription = null
editor.observeGrammar (grammar) ->
  subscription?.dispose()
  # re-observe the setting when the grammar is changed.
  subscription = atom.config.observe editor.getRootScopeDescriptor(), 'my-package.my-setting', (value) ->
    # do stuff
```

## Language defaults

A language grammar can provide language-specific defaults. For example, the Markdown grammar now defaults `editor.softWrap` to `true` in its [scoped-properties file](https://github.com/atom/language-gfm/blob/4404b63c0d42fff71bab4e84bf81e859701cbb3b/scoped-properties/gfm.cson#L3), and Python now has a [default tab length](https://github.com/atom/language-python/blob/03501b6a8eab0341fbaeb188f6876c4dd8c74cb2/scoped-properties/language-python.cson#L3) of 4.

## Conclusion

We hope this improves the editing experience to all of you who regularly use a variety of languages!

## References

- [Docs on scopes and scope descriptors](https://flight-manual.atom.io/behind-atom/sections/scoped-settings-scopes-and-scope-descriptors/)
- [Config class API docs](https://flight-manual.atom-editor.cc/api/latest/Config)
