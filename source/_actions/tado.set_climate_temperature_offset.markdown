---
title: "Set climate temperature offset"
action: tado.set_climate_temperature_offset
domain: tado
description: "Sets the temperature offset of Tado climate entities."
related_actions:
  - tado.set_climate_timer
  - tado.set_water_heater_timer
  - tado.add_meter_reading
---

The **Set climate temperature offset** action calibrates the temperature reading of a Tado climate device. If the device reports a temperature that is consistently higher or lower than the real room temperature, you can apply an offset to correct it.

This is useful when a radiator valve sits close to the radiator and reads warmer than the rest of the room. An automation can keep the offset in sync with a separate, better-placed temperature sensor.

{% include actions/ui_header.md %}

To set a temperature offset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tado: Set climate temperature offset**.
6. Under **Targets**, choose the climate entities to adjust.
7. Enter the **Offset**.
8. Select **Save**.

{% include actions/targets.md domain="climate" %}

### Options in the UI

{% options_ui %}
Offset:
  description: The temperature offset to apply, in the unit your device uses.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tado.set_climate_temperature_offset`. A basic example looks like this:

{% example %}
action: |
  action: tado.set_climate_temperature_offset
  target:
    entity_id: climate.tado
  data:
    offset: -1.5
{% endexample %}

### Options in YAML

{% options_yaml %}
offset:
  description: >
    The temperature offset to apply, in the unit your device uses.
    When left out, the offset is set to 0, which means no correction.
  required: false
  type: float
  default: 0
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: keep the offset in sync with another sensor

When a better-placed room sensor and the Tado reading drift apart, recalculate the offset so the Tado device reflects the real room temperature.

- **Trigger**: The room sensor or the Tado temperature changes
- **Condition**: The two readings differ by more than 0.5°
- **Action**: Tado: Set climate temperature offset
- **Target**: Tado
- **Offset**: Calculated from the difference between the two sensors

{% details "YAML example for syncing the offset" %}

{% example %}
automation: |
  alias: "Sync Tado offset with room sensor"
  triggers:
    - trigger: state
      entity_id:
        - sensor.temp_sensor_room
        - sensor.tado_temperature
  conditions:
    - condition: template
      value_template: >
        {% set tado_temp = states('sensor.tado_temperature') | float(20) %}
        {% set room_temp = states('sensor.temp_sensor_room') | float(20) %}
        {{ (tado_temp - room_temp) | abs > 0.5 }}
  actions:
    - action: tado.set_climate_temperature_offset
      target:
        entity_id: climate.tado
      data:
        offset: >
          {% set tado_temp = states('sensor.tado_temperature') | float(20) %}
          {% set room_temp = states('sensor.temp_sensor_room') | float(20) %}
          {% set current_offset = state_attr('climate.tado', 'offset_celsius') %}
          {{ (-(tado_temp - room_temp) + current_offset) | round(1) }}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
