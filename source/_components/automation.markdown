---
layout: component
title: "Automation"
description: "Instructions how to setup automation within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation
---

This page will go into more detail about the various options the `automation` component offers. If you haven't yet, read the [getting started page on automation](/getting-started/automation/).

A configuration section of an automation requires a `trigger` and an `action` section. `condition` and `condition_type` are optional. To keep this page compact, all following sections will not show the full configuration but only the relevant part.

```yaml
# Example of entry in configuration.yaml
automation:
# Turns on lights 1 hour before sunset if people are home
# and if people get home between 16:00-23:00
- alias: 'Rule 1 Light on in the evening'
  trigger:
    # Prefix the first line of each trigger configuration
    # with a '-' to enter multiple
    - platform: sun
      event: sunset
      offset: '-01:00:00'
    - platform: state
      entity_id: group.all_devices
      state: 'home'
  condition:
    # Prefix the first line of each condition configuration
    # with a '-'' to enter multiple
    - platform: state
      entity_id: group.all_devices
      state: 'home'
    - platform: time
      after: '16:00:00'
      before: '23:00:00'
  action:
    service: homeassistant.turn_on
    entity_id: group.living_room

# Turn off lights when everybody leaves the house
- alias: 'Rule 2 - Away Mode'
  trigger:
    platform: state
    entity_id: group.all_devices
    state: 'not_home'
  action:
    service: light.turn_off
    entity_id: group.all_lights

# Notify when Paulus leaves the house in the evening
- alias: 'Leave Home notification'
  trigger:
    platform: zone
    event: leave
    zone: zone.home
    entity_id: device_tracker.paulus
  condition:
    platform: time
    after: '20:00'
  action:
    service: notify.notify
    data:
      message: 'Paulus left the house'
```

 - [Jump to conditions](#conditions)
 - [Jump to actions](#actions)
 - [Jump to troubleshooting](#troubleshooting)

## {% linkable_title Triggers %}

Triggers are what starts the processing of an automation rule. It is possible to specify multiple triggers for the same rule. Once a trigger starts, Home Assistant will validate the conditions, if any, and call the action.

#### {% linkable_title Event trigger %}
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

#### {% linkable_title MQTT trigger %}
Triggers when a specific message is received on given topic. Optionally can match on the payload being sent over the topic.

```yaml
automation:
  trigger:
    platform: mqtt
    topic: living_room/switch/ac
    # Optional
    payload: 'on'
```

#### {% linkable_title Numeric state trigger %}
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

#### {% linkable_title State trigger %}

Triggers when the state of an entity changes. If only entity_id given will match all state changes.

```yaml
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus
    # Optional
    from: 'not_home'
    to: 'home'
```

<p class='note warning'>
  Use quotes around your values for `from` and `to` to avoid the YAML parser interpreting values as booleans.
</p>

#### {% linkable_title Sun trigger %}
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

#### {% linkable_title Template trigger %}

Template triggers work by evaluating a [template] on each state change. The trigger will fire if the state change caused the template to render 'true'. This is achieved by having the template result in a true boolean expression (`{% raw %}{{ is_state('device_tracker.paulus', 'home') }}{% endraw %}`) or by having the template render 'true' (example below).

```yaml
automation:
  trigger:
    platform: template
    value_template: '{% raw %}{% if is_state('device_tracker.paulus', 'home') %}true{% endif %}{% endraw %}'
```

#### {% linkable_title Time trigger %}

Time can be triggered in many ways. The most common is to specify `after` and trigger at a specific point in time each day. Alternatively, you can also match if the hour, minute or second of the current time has a specific value. For example, by only setting minutes in the config to 5 it will trigger every hour when it is 5 minutes past whole.  You cannot use `after` together with hour, minute or second.

```yaml
automation:
  trigger:
    platform: time
    # All following are optional.
    # When 'after' is used, you cannot also match on hour, minute, seconds.
    # Military time format.
    # after: '15:32:00'
    hours: 0
    minutes: 5
    seconds: 0
```

The above example will trigger every hour on the 5 (2:05, 3:05, 4:05, etc).

#### {% linkable_title Zone trigger %}

Zone triggers can trigger when an entity is entering or leaving the zone. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. Currently this is limited to the [OwnTracks platform](/components/device_tracker.owntracks/).

```yaml
automation:
  trigger:
    platform: zone
    entity_id: device_tracker.paulus
    zone: zone.home
    # Event is either enter or leave
    event: enter
```

## {% linkable_title Conditions %}

Conditions are an optional part of an automation rule and be used to prevent an action from happening when triggered. Conditions look very familiar to triggers but are very different. A trigger will look at events happening at the system while a condition only looks at how the system looks right now. A trigger can observe that a switch is being turned on. A condition can only see if a switch is on or off.

An automation rule can have mulitiple triggers. By default the action will only fire if all conditions pass. An optional key `condition_type: 'or'` can be set on the automation rule to fire action if any condition matches.  In the example below, the automation would trigger if the time is before 05:00 _OR_ after 20:00.

```yaml
automation:
  condition_type: or
  condition:
   - platform: time
     before: '05:00'
   - platform: time
     after: '20:00'
```

If your triggers and conditions are exactly the same, you can use a shortcut to specify conditions. In this case, triggers that are not valid conditions will be ignored.

```yaml
automation:
  condition: use_trigger_values
```

#### {% linkable_title Numeric state condition %}

Attempts to parse the state of specified entity as a number and triggers if value is above and/or below a threshold.

```yaml
automation:
  condition:
    platform: numeric_state
    entity_id: sensor.temperature
    # At least one of the following required
    above: 17
    below: 25
    # Optional
    value_template: '{% raw %}{{ state.attributes.battery }}{% endraw %}'
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

#### {% linkable_title Template condition %}

The template condition will test if [given template][template] renders a value equal to true. This is achieved by having the template result in a true boolean expression or by having the template render 'true'.


```yaml
automation:
  condition:
    platform: template
    value_template: '{% raw %}{{ state.attributes.battery > 50 }}{% endraw %}'
    # Or value_template could be:
    # {% raw %}{% if state.attributes.battery > 50 %}true{% else %}false{% endif %}{% endraw %}
```

#### {% linkable_title Time condition %}

The time condition can test if it is after a specified time, before a specified time or if it is a certain day of the week

```yaml
automation:
  condition:
    platform: time
    # At least one of the following is required.
    after: '15:00:00'
    before: '23:00:00'
    weekday:
      - mon
      - wed
      - fri
```

Valid values for `weekday` are (`sun`, `mon`, `tue`, `wed`, `thu`, `fri` & `sat`)

#### {% linkable_title Zone condition %}

Zone conditions test if an entity is in a certain zone. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. Currently this is limited to the [OwnTracks platform](/components/device_tracker.owntracks/).

```yaml
automation:
  condition:
    platform: zone
    entity_id: device_tracker.paulus
    zone: zone.home
```

## {% linkable_title Actions %}

When an automation rule fires, it calls a service. For this service you can specify an entity id it should apply to and optional service parameters (to specify for example the brightness).

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

If you want to specify multiple services to be called or include a delay, have a look at the [script component](/components/script/). If you want to describe how certain entities should look, check out the [scene component](/components/scene/).

## {% linkable_title Troubleshooting %}

You can verify that your automation rules are being initialized correctly by watching both the realtime logs and also the logbook.  The realtime logs will show the rules being initialized (once for each trigger):

```plain
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rainy Day
INFO [homeassistant.components.automation] Initialized rule Rain is over
```

The Logbook component will show a line entry when an automation is triggered.  You can look at the previous entry to determine which trigger in the rule triggered the event.

![Logbook example](/images/components/automation/logbook.png)

[template]: /getting-started/templating/