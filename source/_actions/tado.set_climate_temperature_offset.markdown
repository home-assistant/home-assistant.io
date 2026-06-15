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
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
