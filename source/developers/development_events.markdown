---
layout: page
title: "Using Events"
description: "Introduction to using events in Home Assistant."
date: 2017-05-13 05:40:00 +0000
sidebar: true
comments: false
sharing: true
footer: true
---

The core of Home Assistant is driven by events. That means that if you want to respond to something happening, you'll have to respond to events. Most of the times you won't interact directly with the event system but use one of the [event listener helpers][helpers].

The event system is very flexible. There are no limitations on the event type, as long as it's a string. Each event can contain data. The data is a dictionary that can contain any data as long as it's JSON serializable. This means that you can use number, string, dictionary and list.

[List of events that Home Assistant fires.][object]

### {% linkable_title Firing events %}

To fire an event, you have to interact with the event bus. The event bus is available on the Home Assistant instance as `hass.bus`.

Example component that will fire an event when loaded.

```python
DOMAIN = 'hello_event'

def setup(hass, config):
    """Set up is called when Home Assistant is loading our component."""

    # Fire event my_cool_event with event data answer=42
    hass.bus.fire('my_cool_event', {
        'answer': 42
    })
```

### {% linkable_title Listening to events %}

Most of the times you'll not be firing events but instead listen to events. For example, the state change of an entity is broadcasted as an event.

```python
DOMAIN = 'hello_event'

def setup(hass, config):
    """Set up is called when Home Assistant is loading our component."""
    count = 0

    # Listener to handle fired events
    def handle_event(event):
        nonlocal count
        count += 1
        print('Total events received:', count)

    # Listen for when my_cool_event is fired
    hass.bus.listen('my_cool_event', handle_event)
```

#### {% linkable_title Helpers %}

Home Assistant comes with a lot of bundled helpers to listen to specific types of event. There are helpers to track a point in time, to track a time interval, a state change or the sun set. [See available methods.][helpers]

[helpers]: https://dev-docs.home-assistant.io/en/master/api/helpers.html#module-homeassistant.helpers.event
[object]: /docs/configuration/events/
