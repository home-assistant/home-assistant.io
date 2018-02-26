---
layout: page
title: "Working with Async"
description: "A breakdown of all the different ways to work with the asynchronous core of Home Assistant."
date: 2016-10-17 21:49
sidebar: true
comments: false
sharing: true
footer: true
---

Although we have a backwards compatible API, using the async core directly will be a lot faster. Most core components have already been rewritten to leverage the async core. This includes the EntityComponent helper (foundation of light, switch, etc), scripts, groups and automation.

## {% linkable_title Interacting with the core %}

[All methods in the Home Assistant core][dev-docs] are implemented in two flavors: an async version and a version to be called from other threads. The versions for other are merely wrappers that call the async version in a threadsafe manner using [the available async utilities][dev-docs-async].

So if you are making calls to the core (the hass object) from within a callback or coroutine, use the methods that start with async_. If you need to call an async_ function that is a coroutine, your task must also be a coroutine.

## {% linkable_title Implementing an async component %}

To make a component async, implement an async_setup.

```python
def setup(hass, config):
    # Setup your component outside of the event loop.
```

Will turn into:

```python
import asyncio

@asyncio.coroutine
def async_setup(hass, config):
    # Setup your component inside of the event loop.
```

## {% linkable_title Implementing an async platform %}

For platforms we support async setup. Instead of setup_platform you need to have a coroutine async_setup_platform.

```python
setup_platform(hass, config, add_entities, discovery_info=None):
    # Setup your platform outside of the event loop.
```

Will turn into:

```python
import asyncio

@asyncio.coroutine
def async_setup_platform(hass, config, async_add_entities,
                         discovery_info=None):
    # Setup your platform inside of the event loop
```

The only difference with the original parameters is that the `add_entities` function has been replaced by the async friendly callback `async_add_entities`.

## {% linkable_title Implementing an async entity %}

You can make your entity async friendly by converting your update method to be async. This requires the dependency of your entities to also be async friendly!

```python
class MyEntity(Entity):
    def update(self):
        """Retrieve latest state."""
        self._state = fetch_state()
```

Will turn into:

```python
import asyncio

class MyEntity(Entity):
    @asyncio.coroutine
    def async_update(self):
        """Retrieve latest state."""
        self._state = yield from async_fetch_state()
```

Make sure that all properties defined on your entity do not result in I/O being done. All data has to be fetched inside the update method and cached on the entity. This is because these properties are read from within the event loop and thus doing I/O will result in the core of Home Assistant waiting until your I/O is done.

## {% linkable_title Calling async functions from threads %}

Sometimes it will happen that you’re in a thread and you want to call a function that is only available as async. Home Assistant includes a few async helper utilities to help with this.

In the following example, `say_hello` will schedule `async_say_hello` and block till the function has run and get the result back.

```python
from homeassistant.util.async import run_callback_threadsafe

def say_hello(hass, target):
    return run_callback_threadsafe(
        hass.loop, async_say_hello, target).result()

def async_say_hello(hass, target):
    return "Hello {}!".format(target)
```

## {% linkable_title Dealing with passed in functions %}

If your code takes in functions from other code, you will not know which category the function belongs to and how they should be invoked. This usually only occurs if your code supplies an event helper like `mqtt.async_subscribe` or `track_state_change_listener`.

To help with this, there are two helper methods on the hass object that you can call from inside the event loop:

#### {% linkable_title hass.async_run_job %}

Use this method if the function should be called as soon as possible. This will call callbacks immediately, schedule coroutines for execution on the event loop and schedule other functions to be run inside the thread pool.

| Callback | Call immediately.
| Coroutine | Schedule for execution on the event loop.
| Other functions | Schedule for execution in the thread pool.

#### {% linkable_title hass.async_add_job %}

Use this method if the function should be called but not get priority over already scheduled calls.

| Callback | Schedule for execution on the event loop.
| Coroutine | Schedule for execution on the event loop.
| Other functions | Schedule for execution in the thread pool.

### [Next step: Miscellaneous &raquo;](/developers/asyncio_misc/)

[dev-docs]: https://dev-docs.home-assistant.io/en/master/api/core.html
[dev-docs-async]: https://dev-docs.home-assistant.io/en/dev/api/util.html#module-homeassistant.util.async
