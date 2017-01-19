---
layout: page
title: "Automation Trigger"
description: "All the different ways how automations can be triggered."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

Triggers are what starts the processing of an automation rule. It is possible to specify multiple triggers for the same rule. Once a trigger starts, Home Assistant will validate the conditions, if any, and call the action.

### {% linkable_title Event trigger %}
Triggers when an event is being processed. Events are the raw building blocks of Home Assistant. You can match events on just the event name or also require specific event data to be present.

```yaml
automation:
  trigger:
    platform: event
    event_type: MY_CUSTOM_EVENT
    # optional
    event_data:
      mood: happy
```
For example, to carry out actions when Home Assistant starts, you can use `event_type: homeassistant_start`. See other 'events' supported by Home Assistant [here](https://home-assistant.io/topics/events/).

### {% linkable_title MQTT trigger %}
Triggers when a specific message is received on given topic. Optionally can match on the payload being sent over the topic.

```yaml
automation:
  trigger:
    platform: mqtt
    topic: living_room/switch/ac
    # Optional
    payload: 'on'
```

### {% linkable_title Numeric state trigger %}
On state change of a specified entity, attempts to parse the state as a number and triggers if value is above and/or below a threshold.

```yaml
automation:
  trigger:
    platform: numeric_state
    entity_id: sensor.temperature
    # Optional
    value_template: '{% raw %}{{ state.attributes.battery }}{% endraw %}'
    # At least one of the following required
    above: 17
    below: 25
```

### {% linkable_title State trigger %}

Triggers when the state of tracked entities change. If only entity_id given will match all state changes.

```yaml
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus, device_tracker.anne_therese
    # Optional 
    from: 'not_home'
    to: 'home'

    # Alias for 'to'
    state: 'home'

    # If given, will trigger when state has been the to state for X time.
    for:
      hours: 1
      minutes: 10
      seconds: 5
```

<p class='note warning'>
  Use quotes around your values for `from` and `to` to avoid the YAML parser interpreting values as booleans.
</p>

### {% linkable_title Sun trigger %}
Trigger when the sun is setting or rising. An optional time offset can be given to have it trigger for example 45 minutes before sunset, when dusk is setting in.

```yaml
automation:
  trigger:
    platform: sun
    # Possible values: sunset, sunrise
    event: sunset
    # Optional time offset. This example is 45 minutes.
    offset: '-00:45:00'
```

### {% linkable_title Template trigger %}

Template triggers work by evaluating a [template] on each state change. The trigger will fire if the state change caused the template to render 'true'. This is achieved by having the template result in a true boolean expression (`{% raw %}{{ is_state('device_tracker.paulus', 'home') }}{% endraw %}`) or by having the template render 'true' (example below).
With template triggers you can also evaluate attribute changes by using is_state_attr (`{% raw %}{{ is_state_attr('climate.living_room', 'away_mode', 'off') }}{% endraw %}`)

```yaml
automation:
  trigger:
    platform: template
    value_template: "{% raw %}{% if is_state('device_tracker.paulus', 'home') %}true{% endif %}{% endraw %}"
```

### {% linkable_title Time trigger %}

Time can be triggered in many ways. The most common is to specify `after` and trigger at a specific point in time each day. Alternatively, you can also match if the hour, minute or second of the current time has a specific value. You can prefix the value with a `/` to match whenever the value is divisible by that number. You cannot use `after` together with hour, minute or second.

```yaml
automation:
  trigger:
    platform: time
    # Matches every hour at 5 minutes past whole
    minutes: 5
    seconds: 00

automation 2:
  trigger:
    platform: time
    # When 'after' is used, you cannot also match on hour, minute, seconds.
    # Military time format.
    after: '15:32:00'

automation 3:
  trigger:
    platform: time
    # You can also match on interval. This will match every 5 minutes
    minutes: '/5'
    seconds: 00
```
<p class='note warning'>
  Rememebr that if you are using matching to include both `minutes` and `seconds`.  Without `seconds`, your automation will trigger 60 times during the matching minute. 
</p>

### {% linkable_title Zone trigger %}

Zone triggers can trigger when an entity is entering or leaving the zone. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. Currently this is limited to the [OwnTracks platform](/components/device_tracker.owntracks/) as well as the [iCloud platform](/components/device_tracker.icloud/).

```yaml
automation:
  trigger:
    platform: zone
    entity_id: device_tracker.paulus
    zone: zone.home
    # Event is either enter or leave
    event: enter  # or "leave"
```
