---
title: "Numeric state"
condition: numeric_state
domain: homeassistant
description: "Tests if the number in the state of an entity, or in one of its attributes, is above or below a limit."
related_conditions:
  - state
  - temperature.is_value
  - power.is_value
---

The **Numeric state** condition checks whether a number is above or below a limit right now. The number comes from the state of an {% term entity %}, or from one of its attributes. Use it when an automation should only continue if a value is in a certain range. For example, the automation only continues if the temperature in a room is above 24&nbsp;°C, or if the battery of a device is below 20%.

The limit can be a fixed number, or the value of another entity. With the value of a [number helper](/integrations/input_number/#creating-a-number-helper) that you create yourself, you can change the limit later without editing the automation.

If the editor shows a condition named after what you want to check, use that one instead. For example, use [Temperature value](/conditions/temperature.is_value/) for temperatures, or [Power value](/conditions/power.is_value/) for power readings.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Numeric state**.
5. In **Entity**, select the entity to check.
6. Optional: In **Attribute**, select an attribute to check instead of the main state.
7. Set at least one limit:
   - For a lower limit, under **Lower limit**, select **Fixed number** or **Value of an entity**. Then, in **Above**, enter the number or select the entity.
   - For an upper limit, do the same with **Upper limit** and **Below**.
   - To check whether the value is in a range, set both limits.
8. Optional: In **Value template**, enter a template that calculates the number from the state.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The entity to check.
  required: true
Attribute:
  description: An attribute of the entity to check instead of the main state.
  required: false
Lower limit:
  description: Whether **Above** is a **Fixed number**, or the **Value of an entity**. Default is **Fixed number**.
  required: false
Above:
  description: The value must be higher than this number. The number itself doesn't pass. As **Value of an entity**, you can select a number helper, a number entity, or a sensor.
  required: false
Upper limit:
  description: Whether **Below** is a **Fixed number**, or the **Value of an entity**. Default is **Fixed number**.
  required: false
Below:
  description: The value must be lower than this number. The number itself doesn't pass. As **Value of an entity**, you can select a number helper, a number entity, or a sensor.
  required: false
Value template:
  description: A template that calculates the number to check. For example, a template can convert a unit. In the template, `state` is the state object of the entity.
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, use `condition: numeric_state`. A basic example looks like this:

{% example %}
condition: |
  condition: numeric_state
  entity_id: sensor.living_room_temperature
  above: 17
  below: 25
{% endexample %}

This passes when the living room temperature is above 17 and below 25.

### Options in YAML

The options in YAML are the same as in the UI.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `numeric_state`.
  required: true
  type: string
entity_id:
  description: The ID of the entity, or a list of entity IDs, to check. With several entities, all of them must be within the limits.
  required: true
  type: [string, list]
attribute:
  description: An attribute of the entity to check instead of the main state.
  required: false
  type: string
above:
  description: >
    The value must be higher than this number. Instead of a number, you can use the entity ID of an `input_number`, `number`, `sensor`, or `zone` entity. The condition then uses the current state of that entity. You must set `above`, `below`, or both.
  required: false
  type: [float, string]
below:
  description: >
    The value must be lower than this number. Instead of a number, you can use the entity ID of an `input_number`, `number`, `sensor`, or `zone` entity. The condition then uses the current state of that entity. You must set `above`, `below`, or both.
  required: false
  type: [float, string]
value_template:
  description: >
    A template that calculates the number to check. In the template, `state` is the state object of the entity.
  required: false
  type: template
{% endoptions_yaml %}

The following example passes if both temperatures are below 18:

{% example %}
condition: |
  condition: numeric_state
  entity_id:
    - sensor.kitchen_temperature
    - sensor.living_room_temperature
  below: 18
{% endexample %}

The following example corrects the value of a sensor by 2&nbsp;degrees before it checks the limits:

{% example %}
condition: |
  condition: numeric_state
  entity_id: sensor.living_room_temperature
  above: 17
  below: 25
  value_template: "{{ float(state.state) + 2 }}"
{% endexample %}

## Targets of the condition

This condition checks one or more entities:

- Use the UI option **Entity**, or the YAML option `entity_id`, to check one entity.
- To check more than one entity, use a list of `entity_id` values in YAML. All of them must be within the limits. In the UI, add one **Numeric state** condition per entity.

## Good to know

- A value that is exactly the same as a limit doesn't pass. For example, with **Above** set to `24`, a value of `24` doesn't pass.
- If the value is unavailable (`unavailable`) or unknown (`unknown`), the condition doesn't pass. The same happens if an entity that you use as a limit is unavailable or unknown.
- If an entity that you use as a limit doesn't exist, the condition fails with an error. The error is shown in the trace.
- If the value isn't a number, the condition fails with an error. For example, a state like `on` or `open` isn't a number. The error is shown in the trace.
- If you select an **Attribute** that the entity doesn't have, the condition doesn't pass.
- This condition checks the value right now. To start an automation when a value crosses a limit, use the [Numeric state crossed threshold](/triggers/numeric_state/) trigger.
- To check a state that isn't a number, use the [State](/docs/scripts/conditions/#state-condition) condition.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: turn on the bedroom fan at night only when it's warm

At 22:00, this automation turns on the bedroom fan, but only if the bedroom is warmer than 24&nbsp;°C.

- **Trigger**: Time
  - **At time**: 22:00:00
- **Condition**: Numeric state
  - **Entity**: Bedroom temperature (`sensor.bedroom_temperature`)
  - **Above**: 24
- **Action**: Turn on fan
  - **Target**: Bedroom fan (`fan.bedroom`)

{% details "YAML example for turning on the bedroom fan when it's warm" %}

{% example %}
automation: |
  alias: "Bedroom fan on warm nights"
  triggers:
    - trigger: time
      at: "22:00:00"
  conditions:
    - condition: numeric_state
      entity_id: sensor.bedroom_temperature
      above: 24
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom
{% endexample %}

{% enddetails %}

### Automation: water the garden only when the soil is dry

Every morning at 07:00, this automation turns on the garden irrigation, but only if the soil moisture is below a limit. The limit comes from a [number helper](/integrations/input_number/#creating-a-number-helper) that you create yourself, for example, **Soil moisture limit** (`input_number.soil_moisture_limit`). To change the limit later, change the value of the helper. You don't need to edit the automation.

- **Trigger**: Time
  - **At time**: 07:00:00
- **Condition**: Numeric state
  - **Entity**: Garden soil moisture (`sensor.garden_soil_moisture`)
  - **Upper limit**: Value of an entity
  - **Below**: Soil moisture limit (`input_number.soil_moisture_limit`)
- **Action**: Turn on switch
  - **Target**: Garden irrigation (`switch.garden_irrigation`)

{% details "YAML example for watering the garden when the soil is dry" %}

{% example %}
automation: |
  alias: "Water the garden when the soil is dry"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: numeric_state
      entity_id: sensor.garden_soil_moisture
      below: input_number.soil_moisture_limit
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.garden_irrigation
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
