---
title: "Conditions"
description: "Documentation about all available conditions."
toc: true
---

Conditions can be used within a {% term script %} or {% term automation %} to prevent further execution. When a condition evaluates true, the script or automation will be executed. If any other value is returned, the script or automation stops executing. A condition will look at the system at that moment. For example, a condition can test if a switch is currently turned on or off.

Unlike a {% term trigger %}, which is always `or`, conditions are `and` by default - all conditions have to be true.

All conditions support an optional `alias`.

## Logical conditions

### AND condition

Test multiple conditions in one condition statement. Passes if all embedded conditions are true.

```yaml
conditions:
  - alias: "Paulus home AND temperature below 20"
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
conditions:
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
conditions:
  alias: "Paulus home AND temperature below 20"
  - and:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

### OR condition

Test multiple conditions in one condition statement. Passes if any embedded condition is true.

```yaml
conditions:
  - alias: "Paulus home OR temperature below 20"
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
conditions:
  - alias: "Paulus home OR temperature below 20"
    or:
      - condition: state
        entity_id: "device_tracker.paulus"
        state: "home"
      - condition: numeric_state
        entity_id: "sensor.temperature"
        below: 20
```

### Mixed AND and OR conditions

Test multiple AND and OR conditions in one condition statement. Passes if any embedded condition is true.
This allows you to mix several AND and OR conditions together.

```yaml
conditions:
  - condition: and
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
conditions:
  - and:
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

Test multiple conditions in one condition statement. Passes if all embedded conditions are **not** true.

```yaml
conditions:
  - alias: "Paulus not home AND alarm not disarmed"
    condition: not
    conditions:
      - condition: state
        entity_id: device_tracker.paulus
        state: "home"
      - condition: state
        entity_id: alarm_control_panel.home_alarm
        state: "disarmed"
```

The NOT condition also has a shorthand form. The following configuration works the same as the one listed above:

```yaml
conditions:
  alias: "Paulus not home AND alarm not disarmed"
  not:
    - condition: state
      entity_id: device_tracker.paulus
      state: "home"
    - condition: state
      entity_id: alarm_control_panel.home_alarm
      state: disarmed
```

## Types of conditions

For individual condition pages, refer to the [list of available conditions](/conditions/).

The conditions that are built into Home Assistant are:

- <a id="state-condition"></a>[State](/conditions/state/)
- <a id="numeric-state-condition"></a>[Numeric state](/conditions/numeric_state/)
- <a id="time-condition"></a>[Time](/conditions/time/)
- <a id="template-condition"></a><a id="template-condition-shorthand-notation"></a>[Template](/conditions/template/), including its [shorthand notation](/conditions/template/#shorthand-notation)
- <a id="trigger-condition"></a><a id="triggered-by-condition"></a>[Triggered by](/conditions/trigger/)
- <a id="device-conditions"></a>[Device](/conditions/device/)
- <a id="sun-condition"></a><a id="sun-conditions"></a><a id="sun-state-condition"></a><a id="sun-elevation-condition"></a><a id="sunsetsunrise-condition"></a>[Sun](/conditions/sun/)
- <a id="zone-condition"></a><a id="zone-conditions"></a>[Zone](/conditions/zone/)

## Examples

```yaml
conditions:
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

## Disabling a condition

Every individual condition can be disabled, without removing it.
To do so, add `enabled: false` to the condition configuration.

This can be useful if you want to temporarily disable a condition, for example,
for testing. A disabled condition will behave as if it were removed.

For example:

```yaml
# This condition will always pass, as it is disabled.
conditions:
  - enabled: false
    condition: state
    entity_id: sun.sun
    state: "above_horizon"
```

Conditions can also be disabled based on limited templates or blueprint inputs.

```yaml
blueprint:
  input:
    input_boolean:
      name: Boolean
      selector:
        boolean:
    input_number:
      name: Number
      selector:
        number:
          min: 0
          max: 100

  trigger_variables:
    _enable_number: !input input_number

  conditions:
    - condition: state
      entity_id: sun.sun
      state: "above_horizon"
      enabled: !input input_boolean
    - condition: state
      entity_id: sun.sun
      state: "below_horizon"
      enabled: "{{ _enable_number < 50 }}"
```
