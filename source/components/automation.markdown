---
layout: page
title: "Automation"
description: "Instructions how to setup automation within Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

This page will go into more detail about the various options the `automation` component offers. If
you haven't yet, read the [getting started page on automation](/getting-started/automation.html).

A configuration section of an automation requires a `trigger` and an `action` section. `condition` and
`condition_type` are optional. To keep this page compact, all following sections will not show the
full configuration but only the relevant part.

```yaml
# Example of entry in configuration.yaml
automation:
  alias: Light on in the evening
  trigger:
    - platform: sun
      event: sunset
      offset: "-01:00:00"
    - platform: state
      entity_id: group.all_devices
      state: home
  condition:
    - platform: state
      entity_id: group.all_devices
      state: home
    - platform: time
      after: "16:00:00"
      before: "23:00:00"
  action:
    service: homeassistant.turn_on
    entity_id: group.living_room
```

<p class='note'>
All configuration entries have to be sequential. If you have <code>automation:</code>,
<code>automation 2:</code> and <code>automation 4:</code> then the last one will not be processed.
</p>

 - [Jump to conditions](#conditions)
 - [Jump to actions](#actions)
 - [Jump to troubleshooting](#troubleshooting)

## {% linkable_title Triggers %}

Triggers are what starts the processing of an automation rule. It is possible to specify multiple
triggers for the same rule. Once a trigger starts, Home Assistant will validate the conditions, if any,
and call the action.

#### {% linkable_title Event trigger %}
Triggers when an event is being processed. Events are the raw building blocks of Home Assistant.
You can match events on just the event name or also require specific event data to be present.

```yaml
automation:
  trigger:
    platform: event
    event_type: MY_CUSTOM_EVENT
    # optional
    event_data:
      mood: happy
```

#### {% linkable_title MQTT trigger %}
Triggers when a specific message is received on given topic. Optionally can match on the payload
being sent over the topic.

```yaml
automation:
  trigger:
    platform: mqtt
    topic: living_room/switch/ac
    # Optional
    payload: 'on'
```

#### {% linkable_title Numeric state trigger %}
On state change of a specified entity, attempts to parse the state as a number and triggers if value
is above and/or below a threshold.

```yaml
automation:
  trigger:
    platform: numeric_state
    entity_id: sensor.temperature
    # At least one of the following required
    above: 17
    below: 25
```

#### {% linkable_title State trigger %}
Triggers when the state of an entity changes. If only entity_id given will match all state changes.

```yaml
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus
    # Optional
    from: "not_home"
    to: "home"
```

<p class='note'>
  Use quotes around your values for <code>from</code> and <code>to</code> to avoid the YAML parser
  interpreting some values as booleans.
</p>

#### {% linkable_title Sun trigger %}
Triggers based on sunrise and sunset, both with an optional offset.

```yaml
automation:
  trigger:
    platform: sun
    # Possible values: sunset, sunrise
    event: sunset
    # Optional time offset
    offset: -00:45:00
```

#### {% linkable_title Time trigger %}
Time can be triggered in many ways. The most common is to specify `after` and trigger at a specific
point in time each day. Alternatively, you can also match if the hour, minute or second of the current
time has a specific value. For example, by only setting minutes in the config to 5 it will trigger every
hour when it is 5 minutes past whole.  You cannot use `after` together with hour, minute or second.

```yaml
automation:
  trigger:
    platform: time
    # All following are optional.
    # When 'after' is used, you cannot also match on hour, minute, seconds.
    # Military time format.
    # after: "15:32:00"
    hours: 0
    minutes: 5
    seconds: 0
    weekday:
      - sat
      - sun
```

You can use `weekday` to limit the trigger times to speific days as well (also available in conditions).
Valid values for `weekday` are (`sun`, `mon`, `tue`, `wed`, `thu`, `fri` & `sat`)

The above example will trigger on Saturday and Sunday every hour on the 5 (2:05, 3:05, 4:05, etc).

## {% linkable_title Conditions %}

Conditions are an optional part of an automation rule and be used to prevent an action from happening
when triggered. Conditions look very familiar to triggers but are very different. A trigger will look
at events happening at the system while a condition only looks at how the system looks right now.
A trigger can observe that a switch is being turned on. A condition can only see if a switch is on
or off.

An automation rule can have mulitiple triggers. By default the action will only fire if all conditions
pass. An optional key `condition_type: 'or'` can be set on the automation rule to fire action if any
condition matches.

```yaml
automation:
  condition_type: or
```

If your triggers and conditions are exactly the same, you can use a shortcut to specify conditions.
In this case, triggers that are not valid conditions will be ignored.
```yaml
automation:
  condition: use_trigger_values
```

#### {% linkable_title Numeric state condition %}
Attempts to parse the state of specified entity as a number and triggers if value is above and/or
below a threshold.

```yaml
automation:
  condition:
    platform: numeric_state
    entity_id: sensor.temperature
    # At least one of the following required
    above: 17
    below: 25
```

#### {% linkable_title State condition %}
Tests if an entity is a specified state.

```yaml
automation:
  condition:
    platform: state
    entity_id: device_tracker.paulus
    state: not_home
```

#### {% linkable_title Time condition %}
The time condition can test if it is after a specified time, before a specified time or if it is a
certain day of the week

```yaml
automation:
  condition:
    platform: time
    # At least one of the following is required.
    after: "15:00:00"
    before: "23:00:00"
    weekday:
      - mon
      - wed
      - fri
```

Valid values for `weekday` are (sun, mon, tue, wed, thu, fri & sat)

## {% linkable_title Actions %}

When an automation rule fires, it calls a service. For this service you can specify an entity id it
should apply to and optional service parameters (to specify for example the brightness).

```yaml
automation:
  # Change the light in the kitchen and living room to 150 brightness and color red.
  action:
    service: homeassistant.turn_on
    entity_id:
      - light.kitchen
      - light.living_room
    data:
      brightness: 150
      rgb_color: [255, 0, 0]
```

```yaml
automation:
  # Notify me on my mobile phone of an event
  action:
    service: notify.notify
    data:
      message: Something just happened, better take a look!
```

If you want to specify multiple services to be called or include a delay, have a look at the
[script component](/components/script.html). If you want to describe how certain entities should look,
check out the [scene component](/components/scene.html).

## {% linkable_title Troubleshooting %}

You can verify that your automation rules are being initialized correctly by watching both the realtime
logs and also the logbook.  The realtime logs will show the rules being initialized (once for each trigger):

```bash
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rain is over
```

The Logbook component will show a line entry when an automation is triggered.  You can look at the
previous entry to determine which trigger in the rule triggered the event.

![Logbook example](/images/components/automation/logbook.png)
