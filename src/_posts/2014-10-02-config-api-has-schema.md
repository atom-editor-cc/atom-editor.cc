---
author: "benogle"
title: "Config API Improvements"
---

As part of our [API freeze](https://github.com/atom/atom/issues/3041) initiative, the Config system got some love. It is heavily used, so we wanted to make it as robust and easy to use as possible.

<!--more-->

## The Past

Previously, packages exposed their config settings via a `configDefaults` object in the main module.

```coffee
# my-package main module
module.exports =
  configDefaults:
    myInteger: 16
    myArray: ['turtles', 'rabbits']
```

While simple, it left a lot to be desired throughout the rest of the config system. There was no type checking for storage, pushing the onus of checking onto the consumer.

```coffee
# totally accepted. :(
atom.config.set('my-package.myArray', 'not an array!')

# returns a string and I need an array. What do I do with it?
atom.config.get('my-package.myArray')
```

This problem led to adding `atom.config.getInt` style methods, but they were never complete, and made usage of `atom.config.observe` awkward:

```coffee
atom.config.set('my-package.myInteger', '500')

atom.config.observe 'my-package.myInteger', (value) ->
  # `value` is a string, so we shouldnt really use it. No bueno
  value = atom.config.getInt('my-package.myInteger', myDefaultVal)
```

## The Future: JSON Schema

Now, config settings are specified via [JSON Schema](http://json-schema.org/). JSON schema solves all these issues, and paves the way for more awesome in the future.

Your config in JSON Schema looks like this:

```coffee
# my-package main module
module.exports =
  config:
    myInteger:
      type: 'integer'
      default: 16
    myArray:
      type: 'array'
      default: ['turtles', 'rabbits']
      items:
        type: 'string'
```

Now the type checking is handled before the value makes it into the config.

```coffee
atom.config.set('my-package.myArray', 'not an array!') # => false
atom.config.get('my-package.myArray') # => ['turtles', 'rabbits']!
```

For primitive types, it will coerce the values from a string:

```coffee
atom.config.set('my-package.myInteger', '500') # => true
atom.config.get('my-package.myInteger') # => 500

atom.config.observe 'my-package.myInteger', (value) ->
  # We can use the value now because it's the right type: an integer
  # value == 500
```

`atom.config.getInt` and friends are _gone_ (deprecated). Now you can rely on `atom.config.get` returning a correct type all the time.

We also support other keys allowing you to specify minimum, maximum, or a list of acceptable values for your setting. Check out an [example](https://github.com/atom/atom/blob/master/src/config-schema.coffee) and the [Config API docs](https://atom.io/docs/api/latest/Config) for more info.

## Improved Settings View

The setting metadata allows for leveling up in the settings view. We can now specify titles and descriptions. eg.

```coffee
useHardwareAcceleration:
  type: 'boolean'
  default: true
  description: 'Disabling will improve editor font rendering but reduce scrolling performance.'
```

Produces:

![description](https://cloud.githubusercontent.com/assets/69169/4482366/f7a3f812-49a7-11e4-8edc-7e3d7cb9d1d7.png)

And now that we know the types, we can improve the setting rendering and editing. For example, the `editor.tabLength` now specifies a list of acceptable values, and renders as a select list:

```coffee
tabLength:
  type: 'integer'
  default: 2
  enum: [1, 2, 4, 6, 8]
```

Produces:

![screen shot 2014-10-01 at 1 07 44 pm](https://cloud.githubusercontent.com/assets/69169/4482421/83782fde-49a8-11e4-89ce-45e5f2e8f11f.png)

Editing settings will get even better as time goes on. Since we know so much more about each setting, the possibilities open up for more specific editors. Sliders? Text boxes with spinners? Custom?

## Other changes

An `onDidChange` method has been added in place of `observe` with `{callNow: false}`:

```coffee
# No more!
atom.config.observe 'my-package.myInteger', {callNow: false}, (value) ->
  # ...

# Instead, do this:
atom.config.onDidChange 'my-package.myInteger', ({newValue, oldValue, keyPath}) ->
  # ...
```

You can call `onDidChange` with no key path to get notifications on all paths:

```coffee
atom.config.onDidChange ({newValue, oldValue, keyPath}) ->
  # ...
```

## Where to go from here

You can update your packages to use JSON schema today. We have deprecated the old `configDefaults` mechanism, and will remove it as we near 1.0. Warnings will be displayed when running your package's specs or with an Atom window in dev mode.

Hopefully you'll find using the new Config system straightforward and robust!

## Resources

- [Config API docs](https://atom.io/docs/api/latest/Config)
- [Core config schema](https://github.com/atom/atom/blob/master/src/config-schema.coffee)
