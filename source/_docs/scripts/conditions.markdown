---
layout: page
title: "Conditions"
description: "Documentation about all available conditions."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/scripts-conditions/
---

Conditions can be used within a script or automation to prevent further execution. A condition will look at the system right now. For example a condition can test if a switch is currently turned on or off.

Unlike a trigger, which is always `or`, conditions are `and` by default - all conditions have to be true.

### {% linkable_title AND condition %}

Test multiple conditions in 1 condition statement. Passes if all embedded conditions are valid.

```yaml
condition:
  condition: and
  conditions:
    - condition: state
      entity_id: 'device_tracker.paulus'
      state: 'home'
    - condition: numeric_state
      entity_id: 'sensor.temperature'
      below: 20
```

If you do not want to combine AND and OR conditions, you can also just list them sequentially.

The following configuration works the same as the one listed above:

```yaml
condition:
  - condition: state
    entity_id: 'device_tracker.paulus'
    state: 'home'
  - condition: numeric_state
    entity_id: 'sensor.temperature'
    below: 20
```

Currently you need to format your conditions like this to be able to edit them using the [automations editor](/docs/automation/editor/).

### {% linkable_title OR condition %}

Test multiple conditions in 1 condition statement. Passes if any embedded condition is valid.

```yaml
condition:
  condition: or
  conditions:
    - condition: state
      entity_id: 'device_tracker.paulus'
      state: 'home'
    - condition: numeric_state
      entity_id: 'sensor.temperature'
      below: 20
```

### {% linkable_title MIXED AND and OR conditions %}

Test multiple AND and OR conditions in 1 condition statement. Passes if any embedded conditions is valid.
This allows you to mix several AND and OR conditions together.

```yaml
condition:
  condition: and
  conditions:
    - condition: state
      entity_id: 'device_tracker.paulus'
      state: 'home'
    - condition: or
      conditions:
        - condition: state
          entity_id: sensor.weather_precip
          state: 'rain'
        - condition: numeric_state
          entity_id: 'sensor.temperature'
          below: 20
```

### {% linkable_title Numeric state condition %}

This type of condition attempts to parse the state of specified entity as a number and triggers if the value matches the thresholds.

If both `below` and `above` are specified, both tests have to pass.

You can optionally use a `value_template` to process the value of the state before testing it.

```yaml
condition:
  condition: numeric_state
  entity_id: sensor.temperature
  above: 17
  below: 25
  # If your sensor value needs to be adjusted
  value_template: {% raw %}{{ float(state.state) + 2 }}{% endraw %}
```

### {% linkable_title State condition %}

Tests if an entity is a specified state.

```yaml
condition:
  condition: state
  entity_id: device_tracker.paulus
  state: 'not_home'
  # optional: trigger only if state was this for last X time.
  for:
    hours: 1
    minutes: 10
    seconds: 5
```

### {% linkable_title Sun condition %}

The sun condition can test if the sun has already set or risen when a trigger occurs. The `before` and `after` keys can only be set to `sunset` or `sunrise`. They have a corresponding optional offset value (`before_offset`, `after_offset`) that can be added, similar to the [sun trigger][sun_trigger].

[sun_trigger]: /docs/automation/trigger/#sun-trigger

```yaml
condition:
  condition: sun
  after: sunset
  # Optional offset value - in this case it must from -1 hours relative to sunset, or after
  after_offset: "-01:00:00"
```

```yaml
condition:
    condition: or  # 'when dark' condition: either after sunset or before sunrise - equivalent to a state condition on `sun.sun` of `below_horizon`
    conditions:
      - condition: sun
        after: sunset
      - condition: sun
        before: sunrise
```

```yaml
condition:
    condition: and  # 'when light' condition: before sunset and after sunrise - equivalent to a state condition on `sun.sun` of `above_horizon`
    conditions:
      - condition: sun
        before: sunset
      - condition: sun
        after: sunrise
```

A visual timeline is provided below showing an example of when these conditions will be true. In this chart, sunrise is at 6:00, and sunset is at 18:00 (6:00 PM). The green areas of the chart indicate when the specified conditions will be true.

<img src='/images/docs/scripts/sun-conditions.svg' alt='Graphic showing an example of sun conditions' />

### {% linkable_title Template condition %}

The template condition will test if the [given template][template] renders a value equal to true. This is achieved by having the template result in a true boolean expression or by having the template render 'true'.

```yaml
condition:
  condition: template
  value_template: "{% raw %}{{ state_attr('device_tracker.iphone', 'battery') > 50 }}{% endraw %}"
```

Within an automation, template conditions also have access to the `trigger` variable as [described here][automation-templating].

[template]: /topics/templating/
[automation-templating]: /getting-started/automation-templating/

### {% linkable_title Time condition %}

The time condition can test if it is after a specified time, before a specified time or if it is a certain day of the week

```yaml
condition:
  condition: time
  # At least one of the following is required.
  after: '15:00:00'
  before: '02:00:00'
  weekday:
    - mon
    - wed
    - fri
```

Valid values for `weekday` are `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
Time condition windows can span across the midnight threshold. In the example above, the condition window is from 3pm to 2am.

<p class='note tip'>
A better weekday condition could be by using the [Workday Binary Sensor](/components/binary_sensor.workday/).
</p>

### {% linkable_title Zone condition %}

Zone conditions test if an entity is in a certain zone. For zone automation to work, you need to have setup a device tracker platform that supports reporting GPS coordinates. Currently this is limited to the [OwnTracks platform](/components/device_tracker.owntracks/) and the [iCloud platform](/components/device_tracker.icloud/).

```yaml
condition:
  condition: zone
  entity_id: device_tracker.paulus
  zone: zone.home
```

### {% linkable_title Examples %}

```yaml
    condition:
      - condition: numeric_state
        entity_id: sun.sun
        value_template: '{{ state.attributes.elevation }}'
        below: 1
      - condition: state
        entity_id: light.living_room
        state: 'off'
      - condition: time
        before: '23:00:00'
        after: '14:00:00'
      - condition: state
        entity_id: script.light_turned_off_5min
        state: 'off'
```
