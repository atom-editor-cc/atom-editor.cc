---
author: "nathansobo"
title: "A New Event Subscription API"
---

We've recently been focusing on cleaning up Atom's API, improving its consistency and usability before we commit to supporting it without breaking changes after Atom reaches version 1.0. As part of this effort, we're changing our approach to event subscription in Atom.

The previous design grew organically at a time when jQuery played a prominent role in Atom. As a result, we designed our event API to blend in with jQuery's `.on` and `.off` methods, which are based on passing around event names as strings. Over time, we've found this approach to be less than ideal in a number of respects.

## The Old Approach

String-based events are awkward to document and difficult to inspect at runtime. When subscribing, it's possible to pass an event name that isn't even emitted by the target object without receiving an error or warning. Unsubscribing is also confusing due to features we borrowed from jQuery that ended up being anti-patterns, such as namespaces and the ability to cancel subscriptions registered by other packages via `.off()`.

```coffee
# Subscribing
subscription = editor.on 'changed.my-namespace', handler = (change) -> # ...

# Unsubscribing
subscription.off()
# or...
editor.off 'changed', handler
# or...
editor.off 'changed.my-namespace'
# or...
editor.off 'changed' # ruin everything by unsubscribing everyone
```

## The New Approach

In our new approach to event subscription, we decided to focus on simplicity and consistency above all else. There should be _one_ way to subscribe and _one_ way to unsubscribe, and mixins shouldn't be required to interact with or implement event-based APIs. To support these goals, we've introduced explicit methods for subscribing to events:

```coffee
# Subscribing
subscription = editor.onDidChange (change) -> # ...
# Unsubscribing
subscription.dispose()
```

Event names always start with `onDid` or `onWill`, then follow with a verb and an optional noun. For example, `::onWillSave` or `::onDidChangePath`. While the auxilliary "will" or "did" adds a bit to the length, it makes it easy to name all the methods according to a consistent scheme, regardless of when callbacks are invoked relative to the named event.

## Managing Subscriptions

As you saw above, whenever you subscribe to an event via a new subscription method, it returns a _disposable_ instance. If the lifetime of the _observing_ object is shorter than that of the _observed_ object, it's important that you cancel the subscription by calling `.dispose()` on this disposable when the subscription is no longer needed. Failure to do this will cause a memory leak.

```coffee
class Observer
  constructor: (observed) ->
    @subscription = observed.onDidChange => # ...

  destroy: ->
    @subscription.dispose() # Don't forget to cancel your subscription!
```

If you're making multiple subscriptions, our new helper library [event-kit](https://github.com/atom/event-kit) has a simple `CompositeDisposable` class that you can use to aggregate multiple disposables.

```coffee
# include event-kit as a dependency if you want to use this
{CompositeDisposable} = require 'event-kit'

class Observer
  constructor: (observed1, observed2) ->
    @subscriptions = new CompositeDisposable

    @subscriptions.add observed1.onDidChange => # ...
    @subscriptions.add observed1.onDidActivate => # ...
    @subscriptions.add observed2.onWillDance => # ...

  destroy: ->
    @subscriptions.dispose() # Dispose of all subscriptions at once
```

Managing subscriptions was previously handled by including the `Subscriber` mixin from the [emissary](https://github.com/atom/emissary) library, which gave the including object `subscribe` and `unsubscribe` methods. We've now opted to use an explicit disposable instance instead, because it's not always possible or desirable to introduce a mixin in a situation where subscription tracking is needed. By making subscription management explicit, we hope to also make it easier to understand and emulate.

We plan to completely replace emissary with event-kit. Emissary is encumbered by supporting too many features we no longer need and is actually hurting performance because of it. By switching to a new, radically simplified library, we can easily leave the old event support in place during the deprecation period.

## Implementing Event-Oriented APIs

[Event-kit](https://github.com/atom/event-kit) also provides a simple toolkit for implementing event-oriented APIs. Using the library is completely optional, but it's a convenient way to build out APIs that blend in with the rest of Atom. Here's the pattern we now use internally to implement events:

```coffee
{Emitter} = require 'event-kit'

class Observed
  constructor: ->
    @emitter = new Emitter

  onDidChange: (callback) ->
    @emitter.on 'did-change', callback

  change: ->
    # do changes...
    @emitter.emit 'did-change', changeEvent # 1 optional argument allowed

  destroy: ->
    @emitter.dispose() # remove subscribers on destruction
```

The emitter automatically returns a `Disposable` instance which can be used to unsubscribe. You can also create your own disposable instance with an action to perform on disposal, which can be useful if you want to track when observers unsubscribe.

```coffee
{Emitter, Disposable} = require 'event-kit'

class Observed
  constructor: ->
    @emitter = new Emitter

  onDidChange: (callback) ->
    subscription = @emitter.on 'did-change', callback
    @changeSubscriptionAdded()
    new Disposable =>
      @changeSubscriptionRemoved()
      subscription.dispose()

  changeSubscriptionAdded: -> # ...

  changeSubscriptionRemoved: -> # ...

  # ...
```

## Conclusion

The old string-based approach to events will continue to work for now, but as of Atom 0.126.0, you'll see deprecation warnings in the spec runner guiding you to use the new approach. Once we complete some other planned changes to the API, we'll start showing deprecation warnings to users and make a big push to switch all packages to the 1.0 APIs before removing the deprecated methods entirely. Thanks for rolling with us as we iterate on the package authoring experience.
