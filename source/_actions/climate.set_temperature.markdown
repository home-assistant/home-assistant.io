---
title: "Set thermostat target temperature"
action: climate.set_temperature
domain: climate
description: "Sets the target temperature of a climate device."
related_actions:
  - climate.set_hvac_mode
  - climate.set_humidity
  - climate.set_preset_mode
---

Use this action to set the target temperature of a climate device, for example to warm a room to a comfortable temperature.

{% include actions/ui_header.md %}

To set the target temperature from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to control.
6. From the actions shown for that target, select **Set thermostat target temperature**.
7. Set the temperature options you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Target temperature:
  description: The temperature setpoint. Use this when the device targets a single temperature.
  required: false
Upper target temperature:
  description: The highest temperature in a target range. Use this together with the lower target temperature when the device targets a range, such as in heat/cool mode.
  required: false
Lower target temperature:
  description: The lowest temperature in a target range. Use this together with the upper target temperature when the device targets a range, such as in heat/cool mode.
  required: false
HVAC mode:
  description: The HVAC mode to switch to before applying the temperature. If not set, the current mode is kept.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_temperature`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_temperature
  target:
    entity_id: climate.living_room
  data:
    temperature: 21
    hvac_mode: heat
{% endexample %}

This sets `climate.living_room` to heat to 21 degrees.

To set a temperature range in heat/cool mode, use the upper and lower target temperatures instead:

{% example %}
action: |
  action: climate.set_temperature
  target:
    entity_id: climate.living_room
  data:
    target_temp_high: 24
    target_temp_low: 20
    hvac_mode: heat_cool
{% endexample %}

### Options in YAML

{% options_yaml %}
temperature:
  description: The temperature setpoint. Use this when the device targets a single temperature. Do not use together with the upper and lower target temperatures.
  required: false
  type: float
target_temp_high:
  description: The highest temperature in a target range. Required together with the lower target temperature when the device targets a range, such as in heat/cool mode.
  required: false
  type: float
target_temp_low:
  description: The lowest temperature in a target range. Required together with the upper target temperature when the device targets a range, such as in heat/cool mode.
  required: false
  type: float
hvac_mode:
  description: The HVAC mode to switch to before applying the temperature. If not set, the current mode is kept.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Use either a single target temperature or a target range, depending on what the device supports. Devices in heat/cool mode use the upper and lower target temperatures together.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: lower the temperature at night

Set a climate device to a cooler temperature at bedtime to save energy overnight.

- **Trigger**: Time: 22:30
- **Action**: Set thermostat target temperature
  - **Target**: Living room thermostat
  - **Target temperature**: 18

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Lower the living room temperature at night"
    triggers:
      - trigger: time
        at: "22:30:00"
    actions:
      - action: climate.set_temperature
        target:
          entity_id: climate.living_room
        data:
          temperature: 18
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
