---
layout: page
title: "Automation Trigger"
description: "All the different ways how automations can be triggered."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/automation-trigger/
---

Triggers are what starts the processing of an automation rule. It is possible to specify multiple triggers for the same rule. Once a trigger starts, Home Assistant will validate the conditions, if any, and call the action.

### {% linkable_title Event trigger %}
Triggers when an event is being processed. Events are the raw building blocks of Home Assistant. You can match events on just the event name or also require specific event data to be present.

Events can be fired by components or via the API. There is no limitation to the types. A list of built-in events can be found [here](/docs/configuration/events/).

```yaml
automation:
  trigger:
    platform: event
    event_type: MY_CUSTOM_EVENT
    # optional
    event_data:
      mood: happy
```

<p class='note warning'>
  Starting 0.42, it is no longer possible to listen for event `homeassistant_start`. Use the 'homeassistant' platform below instead.
</p>

### {% linkable_title Home Assistant trigger %}

Triggers when Home Assistant starts up or shuts down.

```yaml
automation:
  trigger:
    platform: homeassistant
    # Event can also be 'shutdown'
    event: start
```

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
Triggers when numeric value of an entity's state crosses a given threshold. On state change of a specified entity, attempts to parse the state as a number and triggers once if value is changing from above to below or from below to above the given threshold.

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

    # If given, will trigger when condition has been for X time.
    for:
      hours: 1
      minutes: 10
      seconds: 5
```

<p class='note'>
Listing above and below together means the numeric_state has to be between the two values.
In the example above, a numeric_state that is 17.1-24.9 would fire this trigger.
</p>

### {% linkable_title State trigger %}

Triggers when the state of a given entity changes. If only entity_id is given trigger will activate for all state changes, even if only state attributes change.

```yaml
automation:
  trigger:
    platform: state
    entity_id: device_tracker.paulus, device_tracker.anne_therese
    # Optional
    from: 'not_home'
    # Optional
    to: 'home'

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
Triggers when the sun is setting or rising. An optional time offset can be given to have it trigger a set time before or after the sun event (i.e. 45 minutes before sunset, when dusk is setting in).

```yaml
automation:
  trigger:
    platform: sun
    # Possible values: sunset, sunrise
    event: sunset
    # Optional time offset. This example is 45 minutes.
    offset: '-00:45:00'
```

Sometimes you may want more granular control over an automation based on the elevation of the sun. This can be used to layer automations to occur as the sun lowers on the horizon or even after it is below the horizon. This is also useful when the "sunset" event is not dark enough outside and you would like the automation to run later at a precise solar angle instead of the time offset such as turning on exterior lighting. 

```yaml
automation:
  alias: "Exterior Lighting on when dark outside"
  trigger:
    platform: numeric_state
    entity_id: sun.sun
    value_template: "{% raw %}{{ state.attributes.elevation }}{% endraw %}"
    # Can be a positive or negative number
    below: -4.0
  action:
    service: switch.turn_on
    entity_id: switch.exterior_lighting
```
The US Naval Observatory has a [tool](http://aa.usno.navy.mil/data/docs/AltAz.php) that will help you estimate what the solar angle will be at any specific time.

### {% linkable_title Template trigger %}

Template triggers work by evaluating a [template] on every state change for all of the recognized entities. The trigger will fire if the state change caused the template to render 'true'. This is achieved by having the template result in a true boolean expression (`{% raw %}{{ is_state('device_tracker.paulus', 'home') }}{% endraw %}`) or by having the template render 'true' (example below).
With template triggers you can also evaluate attribute changes by using is_state_attr (`{% raw %}{{ is_state_attr('climate.living_room', 'away_mode', 'off') }}{% endraw %}`)

```yaml
automation:
  trigger:
    platform: template
    value_template: "{% raw %}{% if is_state('device_tracker.paulus', 'home') %}true{% endif %}{% endraw %}"
```

[template]: /docs/configuration/templating/

### {% linkable_title Time trigger %}

Time can be triggered in many ways. The most common is to specify `at` and trigger at a specific point in time each day. Alternatively, you can also match if the hour, minute or second of the current time has a specific value. You can prefix the value with a `/` to match whenever the value is divisible by that number. You cannot use `at` together with hour, minute or second.

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
    # When 'at' is used, you cannot also match on hour, minute, seconds.
    # Military time format.
    at: '15:32:00'

automation 3:
  trigger:
    platform: time
    # You can also match on interval. This will match every 5 minutes
    minutes: '/5'
    seconds: 00
```
<p class='note warning'>
  Remember that if you are using matching to include both `minutes` and `seconds`.  Without `seconds`, your automation will trigger 60 times during the matching minute. 
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


### {% linkable_title Multiple triggers %}

When your want your automation rule to have multiple triggers, just prefix the first line of each trigger with a dash (-) and indent the next lines accordingly. Whenever one of the triggers fires, your rule is executed.

```yaml
automation:
  trigger:
      # first trigger
    - platform: time
      minutes: 5
      seconds: 00
      # our second trigger is the sunset
    - platform: sun
      event: sunset
```
