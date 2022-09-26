---
title: "Conditions"
description: "Documentation about all available conditions."
toc: true
no_toc: true
---

Conditions can be used within a script or automation to prevent further execution. When a condition does not return true, the script or automation stops executing. A condition will look at the system at that moment. For example, a condition can test if a switch is currently turned on or off.

Unlike a trigger, which is always `or`, conditions are `and` by default - all conditions have to be true.

All conditions support an optional `alias`.

{{ page.content | markdownify | toc_only }}

## Logical conditions

### AND condition

Test multiple conditions in one condition statement. Passes if all embedded conditions are valid.

```yaml
condition:
  alias: "Paulus home AND temperature below 20"
  condition: and
  conditions:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

If you do not want to combine AND and OR conditions, you can list them sequentially.

The following configuration works the same as the one listed above:

```yaml
condition:
  - condition: state
    entity_id: "device_tracker.paulus"
    state: "home"
  - condition: numeric_state
    entity_id: "sensor.temperature"
    below: 20
```

Currently you need to format your conditions like this to be able to edit them using the [automations editor](/docs/automation/editor/).

The AND condition also has a shorthand form. The following configuration works the same as the ones listed above:

```yaml
condition:
  alias: "Paulus home AND temperature below 20"
  and:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

### OR condition

Test multiple conditions in one condition statement. Passes if any embedded condition is valid.

```yaml
condition:
  alias: "Paulus home OR temperature below 20"
  condition: or
  conditions:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

The OR condition also has a shorthand form. The following configuration works the same as the one listed above:

```yaml
condition:
  alias: "Paulus home OR temperature below 20"
  or:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

### Mixed AND and OR conditions

Test multiple AND and OR conditions in one condition statement. Passes if any embedded condition is valid.
This allows you to mix several AND and OR conditions together.

```yaml
condition:
  condition: and
  conditions:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: or
      conditions:
        - condition: state
          entity_id: sensor.weather_precip
          state: "rain"
        - condition: numeric_state
          entity_id: "sensor.temperature"
          below: 20
```

Or in shorthand form:

```yaml
condition:
  and:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - or:
      - condition: state
        entity_id: sensor.weather_precip
        state: "rain"
      - condition: numeric_state
        entity_id: "sensor.temperature"
        below: 20
```

### NOT condition

Test multiple conditions in one condition statement. Passes if all embedded conditions are **not** valid.

```yaml
condition:
  alias: "Paulus not home AND alarm not disarmed"
  condition: not
  conditions:
    - condition: state
      entity_id: device_tracker.paulus
      state: "home"
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: disarmed
```

The NOT condition also has a shorthand form. The following configuration works the same as the one listed above:

```yaml
condition:
  alias: "Paulus not home AND alarm not disarmed"
  not:
    - condition: state
      entity_id: device_tracker.paulus
      state: "home"
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: disarmed
```

## Numeric state condition

This type of condition attempts to parse the state of the specified entity or the attribute of an entity as a number, and triggers if the value matches the thresholds.

If both `below` and `above` are specified, both tests have to pass.

```yaml
condition:
  alias: "Temperature between 17 and 25 degrees"
  condition: numeric_state
  entity_id: sensor.temperature
  above: 17
  below: 25
```

You can optionally use a `value_template` to process the value of the state before testing it.

{% raw %}

```yaml
condition:
  condition: numeric_state
  entity_id: sensor.temperature
  above: 17
  below: 25
  # If your sensor value needs to be adjusted
  value_template: "{{ float(state.state) + 2 }}"
```

{% endraw %}

It is also possible to test the condition against multiple entities at once.
The condition will pass if **all** entities match the thresholds.

```yaml
condition:
  condition: numeric_state
  entity_id:
    - sensor.kitchen_temperature
    - sensor.living_room_temperature
  below: 18
```

Alternatively, the condition can test against a state attribute.
The condition will pass if the attribute value of the entity matches the thresholds.

```yaml
condition:
  condition: numeric_state
  entity_id: climate.living_room_thermostat
  attribute: temperature
  above: 17
  below: 25
```

Number helpers (`input_number` entities), `number` and `sensor` entities that
contain a numeric value, can be used in the `above` and `below`
options to make the condition more dynamic.

```yaml
condition:
  condition: numeric_state
  entity_id: climate.living_room_thermostat
  attribute: temperature
  above: input_number.temperature_threshold_low
  below: input_number.temperature_threshold_high
```

## State condition

Tests if an entity is a specified state.

```yaml
condition:
  alias: "Paulus not home for an hour and a bit"
  condition: state
  entity_id: device_tracker.paulus
  state: "not_home"
  # optional: trigger only if state was this for last X time.
  for:
    hours: 1
    minutes: 10
    seconds: 5
```

It is also possible to test the condition against multiple entities at once.
The condition will pass if **all** entities match the state.

```yaml
condition:
  condition: state
  entity_id:
    - light.kitchen
    - light.living_room
  state: "on"
```

Instead of matching all, it is also possible if one of the entities matches.
In the following example the condition will pass if **any** entities match the state.

```yaml
condition:
  condition: state
  entity_id:
    - binary_sensor.motion_sensor_left
    - binary_sensor.motion_sensor_right
  match: any
  state: "on"
```

Testing if an entity is matching a set of possible conditions;
The condition will pass if the entity matches one of the states given.

```yaml
condition:
  condition: state
  entity_id: alarm_control_panel.home
  state:
    - "armed_away"
    - "armed_home"
```

Or, combine multiple entities with multiple states. In the following example,
both media players need to be either paused or playing for the condition to pass.

```yaml
condition:
  condition: state
  entity_id:
    - media_player.living_room
    - media_player.kitchen
  state:
    - "playing"
    - "paused"
```

Alternatively, the condition can test against a state attribute.
The condition will pass if the attribute matches the given state.

```yaml
condition:
  condition: state
  entity_id: climate.living_room_thermostat
  attribute: hvac_modes
  state: "heat"
```

Finally, the `state` option accepts helper entities (also known as `input_*`
entities). The condition will pass if the state of the entity matches the state
of the given helper entity.

```yaml
condition:
  condition: state
  entity_id: alarm_control_panel.home
  state: input_select.guest_mode
```

### Sun condition

#### Sun state condition

The sun state can be used to test if the sun has set or risen.

```yaml
condition:
  alias: "Sun up"
  condition: state  # 'day' condition: from sunrise until sunset
  entity_id: sun.sun
  state: "above_horizon"
```

```yaml
condition:
  alias: "Sun down"
  condition: state  # from sunset until sunrise
  entity_id: sun.sun
  state: "below_horizon"
```

### Sun elevation condition

The sun elevation can be used to test if the sun has set or risen, it is dusk, it is night, etc. when a trigger occurs.
For an in-depth explanation of sun elevation, see [sun elevation trigger][sun_elevation_trigger].

[sun_elevation_trigger]: /docs/automation/trigger/#sun-elevation-trigger

{% raw %}

```yaml
condition:
  condition: and  # 'twilight' condition: dusk and dawn, in typical locations
  conditions:
    - condition: template
      value_template: "{{ state_attr('sun.sun', 'elevation') < 0 }}"
    - condition: template
      value_template: "{{ state_attr('sun.sun', 'elevation') > -6 }}"
```

{% endraw %}

{% raw %}

```yaml
condition:
  condition: template  # 'night' condition: from dusk to dawn, in typical locations
  value_template: "{{ state_attr('sun.sun', 'elevation') < -6 }}"
```

{% endraw %}

### Sunset/sunrise condition

The sun condition can also test if the sun has already set or risen when a trigger occurs. The `before` and `after` keys can only be set to `sunset` or `sunrise`. They have a corresponding optional offset value (`before_offset`, `after_offset`) that can be added, similar to the [sun trigger][sun_trigger]. When both keys are used, the result is a logical `and` of separate conditions.

Note that if only `before` key is used, the condition will be `true` _from midnight_ until sunrise/sunset. If only `after` key is used, the condition will be `true` from sunset/sunrise _until midnight_. Therefore, to cover time between sunset and sunrise one need to use `after: sunset` and `before: sunrise` as 2 separate conditions and combine them using `or`.

[sun_trigger]: /docs/automation/trigger/#sun-trigger

<div class='note warning'>
The sunset/sunrise conditions do not work in locations inside the polar circles, and also not in locations with a highly skewed local time zone.

In those cases it is advised to use conditions evaluating the solar elevation instead of the before/after sunset/sunrise conditions.
</div>

This is an example of 1 hour offset before sunset:
```yaml
condition:
  condition: sun
  after: sunset
  after_offset: "-01:00:00"
```

This is 'when dark' - equivalent to a state condition on `sun.sun` of `below_horizon`:

```yaml
condition:
  - condition: sun
    after: sunset
    before: sunrise
```

This is 'when light' - equivalent to a state condition on `sun.sun` of `above_horizon`:

```yaml
condition:
  - condition: sun
    after: sunrise
    before: sunset
```

We cannot use both keys in this case as it will always be `false`.

```yaml
condition:
  condition: or
  conditions:
    - condition: sun
      after: sunset
    - condition: sun
      before: sunrise
```

A visual timeline is provided below showing an example of when these conditions are true. In this chart, sunrise is at 6:00, and sunset is at 18:00 (6:00 PM). The green areas of the chart indicate when the specified conditions are true.

![Graphic showing an example of sun conditions](/images/docs/scripts/sun-conditions.svg)

## Template condition

The template condition tests if the [given template][template] renders a value equal to true. This is achieved by having the template result in a true boolean expression or by having the template render 'true'.

{% raw %}

```yaml
condition:
  alias: "Iphone battery above 50%"
  condition: template
  value_template: "{{ (state_attr('device_tracker.iphone', 'battery_level')|int) > 50 }}"
```

{% endraw %}

Within an automation, template conditions also have access to the `trigger` variable as [described here][automation-templating].

### Template condition shorthand notation

The template condition has a shorthand notation that can be used to make your scripts and automations shorter.

For example:

{% raw %}

```yaml
conditions: "{{ (state_attr('device_tracker.iphone', 'battery_level')|int) > 50 }}"
```

{% endraw %}

Or in a list of conditions, allowing to use existing conditions as described in this
chapter and one or more shorthand template conditions

{% raw %}

```yaml
conditions:
  - "{{ (state_attr('device_tracker.iphone', 'battery_level')|int) > 50 }}"
  - condition: state
    entity_id: alarm_control_panel.home
    state: armed_away
  - "{{ is_state('device_tracker.iphone', 'away') }}"
```

{% endraw %}

This shorthand notation can be used everywhere in Home Assistant where
conditions are accepted. For example, in [`and`](#and-condition), [`or`](#or-condition)
and [`not`](#not-condition) conditions:

{% raw %}

```yaml
condition:
  condition: or
  conditions:
    - "{{ is_state('device_tracker.iphone', 'away') }}"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

{% endraw %}

It's also supported in the `repeat` action's `while` or `until` option, or in a `choose` action's `conditions` option:

{% raw %}

```yaml
- while: "{{ is_state('sensor.mode', 'Home') and repeat.index < 10 }}"
  sequence:
    - ...
```

{% endraw %}

{% raw %}

```yaml
- choose:
    - conditions: "{{ is_state('sensor.mode', 'Home') and repeat.index < 10 }}"
      sequence:
       - ...
```

{% endraw %}

It's also supported in script or automation `condition` actions:

{% raw %}

```yaml
- condition: "{{ is_state('device_tracker.iphone', 'away') }}"
```

{% endraw %}

[template]: /topics/templating/
[automation-templating]: /getting-started/automation-templating/

## Time condition

The time condition can test if it is after a specified time, before a specified time or if it is a certain day of the week.

```yaml
condition:
  alias: "Time 15~02"
  condition: time
  # At least one of the following is required.
  after: "15:00:00"
  before: "02:00:00"
  weekday:
    - mon
    - wed
    - fri
```

Valid values for `weekday` are `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`.
Note that if only `before` key is used, the condition will be `true` *from midnight* until the specified time.
If only `after` key is used, the condition will be `true` from the specified time *until midnight*.
Time condition windows can span across the midnight threshold if **both** `after` and `before` keys are used. In the example above, the condition window is from 3pm to 2am.

<div class='note tip'>

A better weekday condition could be by using the [Workday Binary Sensor](/integrations/workday/).

</div>

For the `after` and `before` options a time helper (`input_datetime` entity)
or another `sensor` entity containing a timestamp with the "timestamp" device
class, can be used instead.

```yaml
condition:
  - alias: "Example referencing a time helper"
    condition: time
    after: input_datetime.house_silent_hours_start
    before: input_datetime.house_silent_hours_end

  - alias: "Example referencing another sensor"
    after: sensor.groceries_delivery_time
```

<div class='note warning'>

Please note that the time condition only takes the time into account. If
an referenced sensor or helper entity contains a timestamp with a date, the
date part is fully ignored.

</div>

## Trigger condition

The trigger condition can test if an automation was triggered by a certain trigger, identified by the trigger's `id`.

```yaml
condition:
  condition: trigger
  id: event_trigger
```

For a trigger identified by its index, both a string and integer is allowed:
```yaml
condition:
  condition: trigger
  id: "0"
```

```yaml
condition:
  condition: trigger
  id: 0
```

It is possible to give a list of triggers:

```yaml
condition:
  condition: trigger
  id:
    - event_1_trigger
    - event_2_trigger
```

## Zone condition

Zone conditions test if an entity is in a certain zone. For zone automation to work, you need to have set up a device tracker platform that supports reporting GPS coordinates.

```yaml
condition:
  alias: "Paulus at home"
  condition: zone
  entity_id: device_tracker.paulus
  zone: zone.home
```

It is also possible to test the condition against multiple entities at once.
The condition will pass if all entities are in the specified zone.

```yaml
condition:
  condition: zone
  entity_id:
    - device_tracker.frenck
    - device_tracker.daphne
  zone: zone.home
```

Testing if an entity is matching a set of possible zones;
The condition will pass if the entity is in one of the zones.

```yaml
condition:
  condition: zone
  entity_id: device_tracker.paulus
  state:
    - zone.home
    - zone.work
```

Or, combine multiple entities with multiple zones. In the following example,
both entities need to be either in the home or the work zone for the condition
to pass.

```yaml
condition:
  condition: zone
  entity_id:
    - device_tracker.frenck
    - device_tracker.daphne
  state:
    - zone.home
    - zone.work
```

## Examples

{% raw %}

```yaml
condition:
  - condition: numeric_state
    entity_id: sun.sun
    value_template: "{{ state.attributes.elevation }}"
    below: 1
  - condition: state
    entity_id: light.living_room
    state: "off"
  - condition: time
    before: "23:00:00"
    after: "14:00:00"
  - condition: state
    entity_id: script.light_turned_off_5min
    state: "off"
```

{% endraw %}

## Disabling a condition

Every individual condition can be disabled, without removing it.
To do so, add `enabled: false` to the condition configuration.

This can be useful if you want to temporarily disable a condition, for example,
for testing. A disabled condition will always pass.

For example:

```yaml
# This condition will always pass, as it is disabled.
condition:
  enabled: false
  condition: state
  entity_id: sun.sun
  state: "above_horizon"
```
