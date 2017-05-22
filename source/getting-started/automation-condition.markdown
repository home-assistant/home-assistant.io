---
layout: page
title: "Automation Conditions"
description: "Automations can test conditions when invoked."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

Conditions are an optional part of an automation rule and be used to prevent an action from happening when triggered. Conditions look very similar to triggers but are very different. A trigger will look at events happening in the system while a condition only looks at how the system looks right now. A trigger can observe that a switch is being turned on. A condition can only see if a switch is currently on or off.

An automation rule can have multiple conditions. By default the action will only fire if all conditions pass. An optional key `condition_type: 'or'` can be set on the automation rule to fire action if any condition matches.  In the example below, the automation would trigger if the time is before 05:00 _OR_ after 20:00.

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

This type of condition attempts to parse the state of specified entity as a number and triggers if the value matches all of the above or below thresholds.
Either `above` or `below`, or both need to be specified. If both are used, the condition is true when the value is >= `before` *and** < `after`.
You can optionally use a `value_template` to make the value of the entity the same type of value as the condition.

```yaml
automation:
  condition:
    platform: numeric_state
    entity_id: sensor.temperature
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
    # optional: trigger only if state was this for last X time.
    for:
      hours: 1
      minutes: 10
      seconds: 5
```

#### {% linkable_title Sun condition %}

The sun condition can test if the sun has already set or risen when a trigger occurs. The `before` and `after` keys can only be set to `sunset` or `sunrise`. They have a corresponding optional offset value (`before_offset`, `after_offset`) that can be added, similar to the [sun trigger](#sun-trigger).

```yaml
automation:
  condition:
    platform: sun
    after: sunset
    # Optional offset value
    after_offset: "-1:00:00"
```

#### {% linkable_title Template condition %}

The template condition will test if the [given template][template] renders a value equal to true. This is achieved by having the template result in a true boolean expression or by having the template render 'true'.


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

Zone conditions test if an entity is in a certain zone. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. Currently this is limited to the [OwnTracks platform](/components/device_tracker.owntracks/) and the [iCloud platform](/components/device_tracker.icloud/).

```yaml
automation:
  condition:
    platform: zone
    entity_id: device_tracker.paulus
    zone: zone.home
```
