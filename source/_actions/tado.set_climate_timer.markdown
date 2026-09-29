---
title: "Set climate timer"
action: tado.set_climate_timer
domain: tado
description: "Turns on a Tado climate entity for a set time."
related_actions:
  - tado.set_water_heater_timer
  - tado.set_climate_temperature_offset
  - tado.add_meter_reading
---

The **Set climate timer** action switches a Tado climate device, such as a radiator valve, to a target temperature for a set time. This is the equivalent of a manual boost: the device heats to the temperature you choose and then returns to its schedule.

You can either set a fixed time period or choose an overlay that decides when the change ends, such as keeping it until the next scheduled block.

{% include actions/ui_header.md %}

To set a climate timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tado: Set climate timer**.
6. Under **Targets**, choose the climate entities to control.
7. Enter the **Temperature**, and optionally a **Time period** or an **Overlay**.
8. Select **Save**.

{% include actions/targets.md domain="climate" %}

### Options in the UI

{% options_ui %}
Temperature:
  description: The target temperature to set the climate entity to.
  required: true
Time period:
  description: The length of time the change should last, for example 01:30:00. Choose this or an overlay.
  required: false
Overlay:
  description: "Choose this or a time period. Decides when the change ends: NEXT_TIME_BLOCK keeps it until the next scheduled block, MANUAL keeps it until you remove it, and TADO_DEFAULT uses the setting from the Tado app."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tado.set_climate_timer`. A basic example looks like this:

{% example %}
action: |
  action: tado.set_climate_timer
  target:
    entity_id: climate.heating
  data:
    temperature: 20.5
    time_period: "01:30:00"
{% endexample %}

### Options in YAML

{% options_yaml %}
temperature:
  description: >
    The target temperature to set the climate entity to.
  required: true
  type: float
time_period:
  description: >
    The length of time the change should last, for example 01:30:00.
    Choose this or an overlay.
  required: false
  type: string
requested_overlay:
  description: >
    Choose this or a time period. Decides when the change ends:
    NEXT_TIME_BLOCK keeps it until the next scheduled block, MANUAL keeps
    it until you remove it, and TADO_DEFAULT uses the setting from the
    Tado app.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Set either a time period or an overlay, not both.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: boost heating and hot water together

Boost the radiator and the hot water at the same time with a single script. Handy as a dashboard button on a cold morning.

- **Action**: Tado: Set climate timer
- **Target**: Heating
- **Temperature**: 25
- **Time period**: 01:30:00
- **Action**: Tado: Set water heater timer
- **Target**: Hot water
- **Time period**: 01:30:00

{% details "YAML example for boosting heating and hot water" %}

{% example %}
script: |
  alias: "Boost heating and hot water"
  sequence:
    - action: tado.set_climate_timer
      target:
        entity_id: climate.heating
      data:
        temperature: 25
        time_period: "01:30:00"
    - action: tado.set_water_heater_timer
      target:
        entity_id: water_heater.hot_water
      data:
        time_period: "01:30:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
