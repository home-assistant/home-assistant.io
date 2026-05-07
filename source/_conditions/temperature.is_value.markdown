---
title: "Temperature"
condition: temperature.is_value
domain: temperature
description: "Tests if a temperature value is above a threshold, below a threshold, or in a range of values."
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
   1. Pick whether the reading must be **Above**, **Below**, **In range**, or **Outside range** of the threshold.
   2. Select **Number** or **Entity**:
      - **Number**: Enter a fixed temperature directly, for example `20` for 20°C. For **In range** or **Outside range**, enter both a lower and upper bound.
      - **Entity**: Use a sensor entity or a [number helper](/integrations/input_number/) entity as the threshold:
        - Number helper: You can adjust the threshold value without editing the automation. The sensor reading is compared against the number helper's current value.
        - Sensor: Its current reading becomes the threshold and updates automatically as the sensor changes. This is useful for comparing two temperature readings, for example to check whether indoor temperature is higher than outdoor temperature.
        - For **In range** or **Outside range**, you need two entities: one for the lower bound and one for the upper bound (for example, two separate number helpers).
        - If you don't have a number helper, you can create one by selecting **Create a new number helper**.
7. Under **Unit of measurement**, select the temperature unit (°C or °F) to use for the threshold comparison.
8. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold type:
  description: |
    The temperature level the entity has to meet for the condition to pass. Options are **Above**, **Below**, **In range**, or **Outside range**. **Number** provides a fixed temperature value (or both a lower and upper bound for ranges). **Entity** uses a sensor or number helper as a dynamic threshold.
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
  description: |
    The temperature level the entity has to meet for the condition to pass:

    - `above`: Sets a minimum
    - `below`: Sets a maximum
    - `between`: Defines a range (for example, `between: [20, 25]`)
    - `outside`: Defines an outside-range (for example, `outside: [20, 25]`)

    Accepts a `number`, a reference to an `input_number`, or a `sensor` entity. A `sensor` entity's current reading is used as the threshold at the moment the condition is evaluated, which lets you compare two temperature readings dynamically (for example, checking whether indoor temperature is above outdoor temperature).
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
- Entities that have an `unavailable` or `unknown` state are skipped for **Any** and fail for **All**.
- This condition checks the entity's current temperature reading, not its target setpoint. To check a climate device's target setpoint instead, use the [Climate target temperature](/conditions/climate.is_target_temperature/) condition.
- When you use a sensor as a dynamic threshold, its value is read at the moment the condition runs. The threshold is not continuously tracked; it is re-evaluated each time the automation fires.
- All temperature values are automatically converted to the unit you specify. For example, if your sensor reports in Fahrenheit but you configure the condition in Celsius, the conversion happens automatically.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

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

### Automation: adjust climate when entering bedroom at night

When presence is detected in the bedroom between 9pm and 7am, check the temperature against your comfort thresholds and automatically heat if too cold or cool if too hot. Use number helpers to set your preferred temperature range, so you can easily adjust it without editing the automation.

- **Trigger**: Binary sensor: Bedroom presence detected
- **Condition**: Time (21:00-07:00)
- **Action**: Check temperature and heat if below lower threshold or cool if above upper threshold

{% details "YAML example for nighttime climate control with number helpers" %}

{% example %}
automation: |
  alias: "Adjust bedroom climate when occupied at night"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bedroom_presence
      to: "on"
  conditions:
    - condition: time
      after: "21:00:00"
      before: "07:00:00"
  actions:
    - choose:
        - conditions:
            - condition: temperature.is_value
              target:
                entity_id: sensor.bedroom_temperature
              options:
                threshold:
                  below: input_number.comfort_temperature_min
                unit: "°C"
          sequence:
            - action: climate.set_hvac_mode
              target:
                entity_id: climate.bedroom
              data:
                hvac_mode: heat
        - conditions:
            - condition: temperature.is_value
              target:
                entity_id: sensor.bedroom_temperature
              options:
                threshold:
                  above: input_number.comfort_temperature_max
                unit: "°C"
          sequence:
            - action: climate.set_hvac_mode
              target:
                entity_id: climate.bedroom
              data:
                hvac_mode: cool
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}
{% include conditions/related.md %}
