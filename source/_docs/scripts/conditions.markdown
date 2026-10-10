---
title: "Conditions"
description: "Documentation about all available conditions."
toc: true
---

Conditions can be used within a {% term script %} or {% term automation %} to prevent further execution. When a condition evaluates true, the script or automation will be executed. If any other value is returned, the script or automation stops executing. A condition will look at the system at that moment. For example, a condition can test if a switch is currently turned on or off.

Unlike a {% term trigger %}, which is always `or`, conditions are `and` by default - all conditions have to be true.

All conditions support an optional `alias`.

{{ page.content | markdownify | toc_only }}

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

A condition of an automation has a type that depends on the target of the condition, usually corresponding to the domain of the target. Conditions are grouped in the following main types.

For an overview of every condition across all integrations, refer to the [list of available conditions](/conditions/).

### Air quality conditions

For the full list of available conditions and its details, refer to the [Air quality conditions](/integrations/air_quality/#list-of-conditions).

### Alarm control panel conditions

The available conditions are:

- Alarm is armed (`alarm_control_panel.is_armed`).
- Alarm is armed home (`alarm_control_panel.is_armed_home`).
- Alarm is armed away (`alarm_control_panel.is_armed_away`).
- Alarm is armed night (`alarm_control_panel.is_armed_night`).
- Alarm is armed vacation (`alarm_control_panel.is_armed_vacation`).
- Alarm is disarmed (`alarm_control_panel.is_disarmed`).
- Alarm is triggered (`alarm_control_panel.is_triggered`).

For information about each condition, refer to the [Alarm control panel conditions](/integrations/alarm_control_panel/#list-of-conditions).

### Assist satellite conditions

The available conditions are:

- Satellite is idle (`assist_satellite.is_idle`).
- Satellite is listening (`assist_satellite.is_listening`).
- Satellite is processing (`assist_satellite.is_processing`).
- Satellite is responding (`assist_satellite.is_responding`).

For information about each condition, refer to the [Assist satellite conditions](/integrations/assist_satellite/#list-of-conditions).

### Battery conditions

For the full list of available conditions and its details, refer to the [Battery conditions](/integrations/battery/#list-of-conditions).

### Calendar conditions

For the full list of available conditions and its details, refer to the [Calendar conditions](/integrations/calendar/#list-of-conditions).

### Climate conditions

Some of the available conditions are:

- Thermostat is on (`climate.is_on`).
- Thermostat is off (`climate.is_off`).
- Thermostat is heating (`climate.is_heating`).
- Thermostat is cooling (`climate.is_cooling`).
- Thermostat is drying (`climate.is_drying`).

For the full list of available conditions and its details, refer to the [Climate conditions](/integrations/climate/#list-of-conditions).

#### Example: Continue only if the climate is heating

```yaml
conditions:
  - condition: climate.is_heating
    target:
      entity_id: climate.living_room
```

### Counter conditions

For the full list of available conditions and its details, refer to the [Counter conditions](/integrations/counter/#list-of-conditions).

### Cover conditions

For the full list of available conditions and its details, refer to the [Cover conditions](/integrations/cover/#list-of-conditions).

### Device conditions

For setup steps, YAML options, and examples for the **Device** condition, refer to [Device](/conditions/device/).

### Fan conditions

The available conditions are:

- Fan is on (`fan.is_on`).
- Fan is off (`fan.is_off`).

For information about each condition, refer to the [Fan conditions](/integrations/fan/#list-of-conditions).

### Garage door conditions

For the full list of available conditions and details, refer to the [Garage door conditions](/integrations/garage_door/#list-of-conditions).

### Humidifier conditions

Some of the available conditions are:

- Humidifier is on (`humidifier.is_on`).
- Humidifier is off (`humidifier.is_off`).
- Humidifier is humidifying (`humidifier.is_humidifying`).
- Humidifier is drying (`humidifier.is_drying`).

For the full list of available conditions and its details, refer to [Humidifier conditions](/integrations/humidifier/#list-of-conditions).

### Humidity conditions

For the full list of available conditions and its details, refer to the [Humidity conditions](/integrations/humidity/#list-of-conditions).

### Lawn mower conditions

The available conditions are:

- Lawn mower is mowing (`lawn_mower.is_mowing`).
- Lawn mower is docked (`lawn_mower.is_docked`).
- Lawn mower is paused (`lawn_mower.is_paused`).
- Lawn mower is returning (`lawn_mower.is_returning`).
- Lawn mower is encountering an error (`lawn_mower.is_encountering_an_error`).

For information about each condition, refer to the [Lawn mower conditions](/integrations/lawn_mower/#list-of-conditions).

### Light conditions

The available conditions are:

- Light is on (`light.is_on`).
- Light is off (`light.is_off`).
- Light is off (`light.is_brightness`).

For information about each condition, refer to the [Light conditions](/integrations/light/#list-of-conditions).

#### Example: Continue only if the living room light is on

```yaml
conditions:
  - condition: light.is_on
    target:
      entity_id: light.living_room
```

### Lock conditions

The available conditions are:

- Lock is locked (`lock.is_locked`).
- Lock is unlocked (`lock.is_unlocked`).
- Lock is open (`lock.is_open`).
- Lock is jammed (`lock.is_jammed`).

For information about each condition, refer to the [Lock conditions](/integrations/lock/#list-of-conditions).

### Media player conditions

Some of the available conditions are:

- Media player is on (`media_player.is_on`).
- Media player is off (`media_player.is_off`).
- Media player is playing (`media_player.is_playing`).
- Media player is paused (`media_player.is_paused`).
- Media player is not playing (`media_player.is_not_playing`).

For information about each condition, refer to the [Media player conditions](/integrations/media_player/#list-of-conditions).

### Moisture conditions

For the full list of available conditions and its details, refer to the [Moisture conditions](/integrations/moisture/#list-of-conditions).

### Motion conditions

For the full list of available conditions and its details, refer to the [Motion conditions](/integrations/motion/#list-of-conditions).

### Numeric state condition

For setup steps, YAML options, and examples for the **Numeric state** condition, refer to [Numeric state](/conditions/numeric_state/).

### Power condition

The available condition is: Power value (`power.is_value`).

For details, refer to the [Power value](/conditions/power.is_value) condition page.

### Remote conditions

For the full list of available conditions and its details, refer to the [Remote conditions](/integrations/remote/#list-of-conditions).

### Schedule conditions

For the full list of available conditions and its details, refer to the [Schedule conditions](/integrations/schedule/#list-of-conditions).

### Select condition

The available condition is: Dropdown option is selected (`select.is_option_selected`).

For details, refer to the [Dropdown option is selected](/conditions/select.is_option_selected) condition page.

### Siren conditions

The available conditions are:

- Siren is on (`siren.is_on`).
- Siren is off (`siren.is_off`).

For information about each condition, refer to [Siren conditions](/integrations/siren/#list-of-conditions).

### State condition

For setup steps, YAML options, and examples for the **State** condition, refer to [State](/conditions/state/).

### Sun conditions

For the full list of available conditions and its details, refer to the [Sun conditions](/integrations/sun/#list-of-conditions).

#### Sun state condition

The sun state can be used to test if the sun has set or risen.

```yaml
conditions:
  - alias: "Sun up"
    condition: sun.is_up
```

```yaml
conditions:
  - alias: "Sun down"
    condition: sun.is_set
```

#### Sun elevation condition

The sun elevation can be used to test if the sun has set or risen, it is dusk, or it is night when a trigger occurs.
For an in-depth explanation of sun elevation, see [sun elevation trigger][sun_elevation_trigger].

[sun_elevation_trigger]: /docs/automation/trigger/#sun-elevation-trigger

```yaml
conditions:
  - condition: and  # 'twilight' condition: dusk and dawn, in typical locations
    conditions:
      - condition: template
        value_template: "{{ state_attr('sun.sun', 'elevation') < 0 }}"
      - condition: template
        value_template: "{{ state_attr('sun.sun', 'elevation') > -6 }}"
```

```yaml
conditions:
  condition: template  # 'night' condition: from dusk to dawn, in typical locations
  value_template: "{{ state_attr('sun.sun', 'elevation') < -6 }}"
```

#### Sunset/sunrise condition

The sun condition can also test if the sun has already set or risen when a trigger occurs. The `before` and `after` keys can only be set to `sunset` or `sunrise`. They have a corresponding optional offset value (`before_offset`, `after_offset`) that can be added, similar to the [sun trigger][sun_trigger].

Note that if only `before` key is used, the condition will be true _from midnight_ until sunrise/sunset. If only `after` key is used, the condition will be true from sunset/sunrise _until midnight_. If both `before: sunrise` and `after: sunset` keys are used, the condition will be true _from midnight_ until sunrise **and** from sunset _until midnight_. If both `after: sunrise` and `before: sunset` keys are used, the condition will be true from sunrise until sunset.

[sun_trigger]: /docs/automation/trigger/#sun-trigger

{% tip %}
The sunset/sunrise conditions do not work in locations inside the polar circles, and also not in locations with a highly skewed local time zone. In those cases it is advised to use conditions evaluating the solar elevation instead of the before/after sunset/sunrise conditions.
{% endtip %}

This is an example of 1 hour offset before sunset:

```yaml
conditions:
  - condition: sun
    after: sunset
    after_offset: "-01:00:00"
```

This is 'when dark' - equivalent to a state condition on `sun.sun` of `below_horizon`:

```yaml
conditions:
  - condition: sun
    after: sunset
    before: sunrise
```

This is 'when light' - equivalent to a state condition on `sun.sun` of `above_horizon`:

```yaml
conditions:
  - condition: sun
    after: sunrise
    before: sunset
```

A visual timeline is provided below, showing an example of when these conditions are true. In this chart, sunrise is at 6:00, and sunset is at 18:00 (6:00 PM). The green areas of the chart indicate when the specified conditions are true.

![Graphic showing an example of sun conditions](/images/docs/scripts/sun-conditions.svg)

### Switch conditions

The available conditions are:

- Switch is on (`switch.is_on`).
- Switch is off (`switch.is_off`).

For information about each condition, refer to the [Switch conditions](/integrations/switch/#list-of-conditions).

### Temperature condition

The available condition is: Temperature value (`temperature.is_value`).

For details, refer to the [Temperature value](/conditions/temperature.is_value) condition page.

### Template condition

For setup steps, YAML options, and examples for the **Template** condition, refer to [Template](/conditions/template/).

#### Template condition shorthand notation

For the shorthand notation of the **Template** condition, refer to [Shorthand notation](/conditions/template/#shorthand-notation).

### Text condition

The available condition is: (`text.is_equal_to`).

For details, refer to the [Text is equal to](/conditions/text.is_equal_to) condition page.

### Time condition

For setup steps, YAML options, and examples for the **Time** condition, refer to [Time](/conditions/time/).

### Timer conditions

For the full list of available conditions and its details, refer to the [Timer conditions](/integrations/timer/#list-of-conditions).

### To-do list conditions

For the full list of available conditions and its details, refer to the [To-do list conditions](/integrations/todo/#list-of-conditions).

### Triggered by condition

The **Triggered by** condition tests whether a specific trigger started the automation.

In the visual automation editor, add a **Triggered by** condition and select one or more triggers. Home Assistant creates and manages the trigger IDs needed for your selections. It removes IDs it created when no **Triggered by** condition uses them. If you use `trigger.id` directly in a template or action data, assign and maintain an ID in YAML instead.

If the editor shows a **Missing trigger** warning, the condition references an ID it cannot match to a trigger. This can happen if you delete a trigger or change its ID in YAML. If the trigger still exists, check the YAML configuration and reselect the trigger before clearing the reference.

If the editor warns that triggers share the same ID, select **Fix** to open a confirmation dialog. It gives each trigger that shares an ID used by a trigger condition its own ID, removes duplicate IDs that trigger conditions do not use, and updates the affected trigger conditions. Review any templates or action data that use `trigger.id` directly, because Home Assistant does not update them.

In YAML, the condition identifies the trigger by its ID:

```yaml
conditions:
  - condition: trigger
    id: event_trigger
```

For a trigger identified by its index, both a string and integer is allowed:

```yaml
conditions:
  - condition: trigger
    id: "0"
```

```yaml
conditions:
  - condition: trigger
    id: 0
```

It is possible to give a list of triggers:

```yaml
conditions:
  - condition: trigger
    id:
      - event_1_trigger
      - event_2_trigger
```

### Update conditions

For the full list of available conditions and its details, refer to the [Update conditions](/integrations/update/#list-of-conditions).

### Vacuum conditions

The available **Vacuum** conditions are:

- Vacuum is cleaning (`vacuum.is_cleaning`).
- Vacuum is docked (`vacuum.is_docked`).
- Vacuum is paused (`vacuum.is_paused`).
- Vacuum is returning (`vacuum.is_returning`).
- Vacuum is encountering an error (`vacuum.is_encountering_an_error`).

For information about adding vacuum conditions in an automation and examples, refer to [Vacuum conditions](/integrations/vacuum/#list-of-conditions).

### Valve conditions

For the full list of available conditions and its details, refer to the [Valve conditions](/integrations/valve/#list-of-conditions).

### Water heater conditions

For the full list of available conditions and its details, refer to the [Water heater conditions](/integrations/water-heater/#list-of-conditions).

### Zone conditions

For setup steps, YAML options, and examples for the **Zone** condition, which checks whether an entity is in a zone, refer to [Zone](/conditions/zone/). For the other zone conditions, refer to the [list of Zone conditions](/integrations/zone/#list-of-conditions).

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
