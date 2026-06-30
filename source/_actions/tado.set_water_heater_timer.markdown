---
title: "Set water heater timer"
action: tado.set_water_heater_timer
domain: tado
description: "Turns on a Tado water heater for a set time."
related_actions:
  - tado.set_climate_timer
  - tado.set_climate_temperature_offset
  - tado.add_meter_reading
---

The **Set water heater timer** action switches a Tado water heater on for a set time. This is the equivalent of a manual boost: the water heater runs for the period you choose and then returns to its schedule.

You can optionally set the target temperature the water heater should reach during the boost.

{% include actions/ui_header.md %}

To set a water heater timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tado: Set water heater timer**.
6. Under **Targets**, choose the water heater entities to control.
7. Enter the **Time period**, and optionally a **Temperature**.
8. Select **Save**.

{% include actions/targets.md domain="water_heater" %}

### Options in the UI

{% options_ui %}
Time period:
  description: The length of time the boost should last, for example 01:30:00.
  required: true
Temperature:
  description: The target temperature to set the water heater to.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tado.set_water_heater_timer`. A basic example looks like this:

{% example %}
action: |
  action: tado.set_water_heater_timer
  target:
    entity_id: water_heater.hot_water
  data:
    time_period: "01:30:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
time_period:
  description: >
    The length of time the boost should last, for example 01:30:00.
  required: true
  type: string
  default: "01:00:00"
temperature:
  description: >
    The target temperature to set the water heater to.
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
