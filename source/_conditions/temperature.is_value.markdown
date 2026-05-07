---
title: "Temperature"
condition: temperature.is_value
domain: temperature
description: "Tests if a temperature value is above a threshold, below a threshold, or in a range of values."
related_triggers:
  - temperature.changed
  - temperature.crossed_threshold
---

The **Temperature** condition passes when a temperature reading meets a threshold you define. You can check that temperature is above, below, or within a specific range. The condition works with temperature sensors, climate devices, water heaters, and weather entities. Use it to run an automation only when the bedroom is too warm, or only when the temperature is low enough to need heating.

When you target more than one entity, the condition's **Condition passes if** option controls how the check combines results. You can require any targeted entity to meet the threshold, or demand that all of them do.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Temperature** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your temperature sensor is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Temperature**.
6. Under **Threshold type**, set the temperature level the condition checks against:
   - Select **Number** to enter a fixed temperature directly, for example `20` for 20°C.
   - Select **Entity** to use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold. When you pick a number helper, you can adjust the threshold without editing the automation. When you pick a temperature sensor, its current reading becomes the threshold and updates automatically as the sensor changes. This is useful for comparing two temperature readings, for example to check whether indoor temperature is higher than outdoor temperature.
     - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
   - Then pick whether the reading must be above, below, or within a range of the threshold.
7. Under **Unit of measurement**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: >
    The temperature level the entity has to meet for the condition to pass. You can enter a fixed temperature (select **Number**), or pick an entity as a dynamic threshold (select **Entity**). When you pick an `input_number` or `number` helper, you can change the threshold without editing the automation. When you pick a temperature sensor, its live reading becomes the threshold, which is useful for comparing two temperature values, for example indoor versus outdoor. In both cases, also pick whether the reading must be above, below, or within a range of that value.
  required: true
Unit of measurement:
  description: The temperature unit (°C or °F) to use for threshold comparison. All temperature values (from sensors and thresholds) are converted to this unit.
  required: true
Condition passes if:
  description: When multiple entities are targeted, controls how results combine. Pick **Any** to pass if at least one targeted entity meets the threshold, or **All** to pass only when every targeted entity does.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `temperature.is_value`. A basic example looks like this:

{% example %}
condition: |
  condition: temperature.is_value
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      above: 20
    unit: "°C"
    behavior: any
{% endexample %}

This passes when the living room temperature sensor reads above 20°C.

To check that temperature stays below a certain level:

{% example %}
condition: |
  condition: temperature.is_value
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      below: 24
    unit: "°C"
    behavior: any
{% endexample %}

This passes when the living room temperature sensor reads below 24°C.

To check that temperature stays within a comfortable range:

{% example %}
condition: |
  condition: temperature.is_value
  target:
    entity_id: sensor.living_room_temperature
  options:
    threshold:
      above: 20
      below: 22
    unit: "°C"
    behavior: any
{% endexample %}

This passes when the living room temperature sensor reads between 20 and 22°C.

### Options in YAML

{% options_yaml %}
threshold:
  description: >
    The temperature level the entity has to meet for the condition to pass. Use `above` to set a minimum, `below` to set a maximum, or both to define a range. Accepts a fixed temperature, or a reference to a [number helper](/integrations/input_number/) or sensor entity. When you reference a sensor, its current reading is used as the threshold at the moment the condition is evaluated. This lets you compare two temperature readings dynamically, for example checking whether indoor temperature is above outdoor temperature.
  required: true
  type: any
unit:
  description: >
    The temperature unit (°C or °F) to use for threshold comparison. Accepts `°C` or `°F`.
  required: true
  type: string
behavior:
  description: >
    When multiple entities are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with temperature sensors, [climate](/integrations/climate/) entities (using the current temperature reading), [water heater](/integrations/water_heater/) entities (using the current temperature reading), and [weather](/integrations/weather/) entities.
- Entities that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- Indoor comfort is generally between 20 and 22°C (68 to 72°F). Below 18°C (64°F) often feels too cold. Above 24°C (75°F) can feel uncomfortably warm.
- This condition checks the entity's current temperature reading, not its target setpoint. To check a climate device's target setpoint instead, use the [Climate target temperature](/conditions/climate.is_target_temperature/) condition.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation fires.
- All temperature values are automatically converted to the unit you specify. For example, if your sensor reports in Fahrenheit but you configure the condition in Celsius, the conversion happens automatically.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: run heating when the room is cold

When the living room temperature sensor reads below 18°C, turn on the heating to bring the room to a comfortable temperature. The condition prevents the heating from running when the room is already warm enough.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Temperature (below 18°C)
- **Target**: Living room temperature sensor
- **Condition passes if**: Any
- **Action**: Climate: Set HVAC mode

{% details "YAML example for running heating when cold" %}

{% example %}
automation: |
  alias: "Run heating when living room is cold"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: temperature.is_value
      target:
        entity_id: sensor.living_room_temperature
      options:
        threshold:
          below: 18
        unit: "°C"
        behavior: any
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.living_room
      data:
        hvac_mode: heat
{% endexample %}

{% enddetails %}

### Automation: cool only when temperature is high

This automation runs a fan only when the bedroom temperature is above 24°C, helping you save energy by avoiding unnecessary cooling.

- **Trigger**: State: Fan is off
- **Condition**: Temperature (above 24°C)
- **Target**: Bedroom temperature sensor
- **Condition passes if**: Any
- **Action**: Fan: Turn on

{% details "YAML example for cooling when warm" %}

{% example %}
automation: |
  alias: "Run fan when bedroom is warm"
  triggers:
    - trigger: state
      entity_id: fan.bedroom_fan
      to: "off"
  conditions:
    - condition: temperature.is_value
      target:
        entity_id: sensor.bedroom_temperature
      options:
        threshold:
          above: 24
        unit: "°C"
        behavior: any
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_fan
{% endexample %}

{% enddetails %}

### Automation: alert when temperature is outside comfort range

This automation sends a notification only when the living room temperature is outside the comfort range of 20 to 22°C, helping you maintain consistent conditions.

- **Trigger**: Time pattern: Every hour
- **Condition**: Temperature (below 20°C or above 22°C)
- **Target**: Living room temperature sensor
- **Condition passes if**: Any
- **Action**: Notify: Send notification

{% details "YAML example for temperature out of range alert" %}

{% example %}
automation: |
  alias: "Alert when temperature is uncomfortable"
  triggers:
    - trigger: time_pattern
      hours: "/1"
  conditions:
    - condition: or
      conditions:
        - condition: temperature.is_value
          target:
            entity_id: sensor.living_room_temperature
          options:
            threshold:
              below: 20
            unit: "°C"
            behavior: any
        - condition: temperature.is_value
          target:
            entity_id: sensor.living_room_temperature
          options:
            threshold:
              above: 22
            unit: "°C"
            behavior: any
  actions:
    - action: notify.mobile_app
      data:
        message: >
          Living room temperature is
          {{ states('sensor.living_room_temperature') }}°C
{% endexample %}

{% enddetails %}
