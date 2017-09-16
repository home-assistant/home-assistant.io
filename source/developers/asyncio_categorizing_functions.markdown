---
layout: page
title: "Categorizing Functions"
description: "A categorization of functions to work with the asynchronous core of Home Assistant."
date: 2016-10-17 21:49
sidebar: true
comments: false
sharing: true
footer: true
---

A piece of work within Home Assistant is represented by a function that will be invoked. It will either run inside our event loop or inside our thread pool, depending on if it is async safe.

Home Assistant uses the convention that all functions that must be run from within the event loop are prefixed with `async_`.

## {% linkable_title The coroutine function %}

Coroutines are special functions based on Python’s generators syntax which allows them to suspend execution while waiting on a result.

Invoking a coroutine function will return a Generator object back, but will not actually begin execution. This object will execute the task when it is either yielded from (from within another coroutine) or it is scheduled on the event loop.

To declare a function a coroutine, import the coroutine annotation from the asyncio package and annotate your function.

```python
import asyncio

@asyncio.coroutine
def async_look_my_coroutine(target):
    result = yield from entity.async_turn_on()
    if result:
        print("hello {}".format(target))

hass.loop.create_task(async_look_my_coroutine("world"))
```

In this example, we schedule the coroutine by calling `hass.loop.create_task`. This will add the coroutine to the queue of tasks to be run. When the event loop is running `async_look_my_coroutine` it will suspend the task when `yield from entity.async_turn_on()` is called. At that point a new task will be scheduled to execute `entity.async_turn_on()`. When that job has been executed, `async_look_my_coroutine` will resume.

## {% linkable_title The callback function %}

This is a normal function that is considered safe to be run from within the event loop. A callback is unable to suspend itself and thus cannot do any I/O or call a coroutine. A callback is capable of scheduling a new task but it will not be able to wait for the results.

To declare a function as a callback, import the callback annotation from the core package and annotate your function.

A common use case for a callback in Home Assistant is as a listener for an event or a service call. It can process the incoming information and then schedule the right calls to be made. Example from the automation component.

```python
from homeassistant.core import callback

@callback
def async_trigger_service_handler(service_call):
    """Handle automation trigger service calls."""
    vars = service_call.data.get(ATTR_VARIABLES)
    for entity in component.async_extract_from_service(service_call):
        hass.loop.create_task(entity.async_trigger(vars, True))
```

In this example, `entity.async_trigger` is a coroutine function. Invoking the coroutine function will return a coroutine task. The passed in parameters will be used when the task gets executed.

To execute the task we have to schedule it for execution on the event loop. This is done by calling `hass.loop.create_task`.

### {% linkable_title Why even have callbacks? %}

You might wonder, if a coroutine can do everything a callback can do, why even have a callback. The reason is performance and better state consistency of the core API objects.

When coroutine A waits for coroutine B, it will suspend itself and schedule a new task to run B. This means that the event loop is now running A, B and then A again. If B is a callback, A will never have to suspend itself and thus the event loop is just running A. The consistency implication is that other events queued to run on the event loop continue to wait until callbacks complete, but will be interleaved when yielding to another coroutine.

## {% linkable_title Event loop and thread safe %}

These are functions that are safe to run both in a thread and inside the event loop. These functions are usually performing a computation or transform data in memory. Anything that does I/O does not fall under this category. Many standard library functions fall in this category. For example generating the sum of a set of numbers using sum or merging two dictionaries.

There is no special annotation to mark functions as part of this category and care should be taken when using these functions from inside the event loop. When in doubt, look at their implementation.

## {% linkable_title Other functions %}

These are all the functions that did not fit in the previous categories. These functions are either thread-safe or not considered safe to be run within the event loop. These are functions that use sleep, or perform I/O.

There is no special annotation necessary to be considered part of this category.

### [Next step: Working with Async &raquo;](/developers/asyncio_working_with_async/)
