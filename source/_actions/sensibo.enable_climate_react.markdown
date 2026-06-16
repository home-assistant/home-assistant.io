---
title: "Enable Climate React on a Sensibo device"
action: sensibo.enable_climate_react
domain: sensibo
description: "Enables and configures Climate React on a Sensibo climate device."
related_actions:
  - sensibo.get_device_capabilities
  - sensibo.full_state
---

Use this action to enable and configure Climate React on a Sensibo climate device. Climate React automatically switches the device to a state you define when the temperature, feels-like temperature, or humidity crosses a threshold you set.

Enabling this action also turns Climate React on. The high and low states must match what the Sensibo API expects exactly, so the first time, it is easiest to configure Climate React in the Sensibo app. Use the [Get device mode capabilities](/integrations/sensibo/#action-sensiboget_device_capabilities) action to find the valid values for your device.

{% include actions/ui_header.md %}

To enable Climate React from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sensibo climate device.
6. From the actions shown for that target, select **Sensibo: Enable Climate React**.
7. Set the thresholds, the states, and the trigger type.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Threshold high:
  description: The value above which the high state is applied.
State high threshold:
  description: The full state to apply when the value goes above the high threshold.
Threshold low:
  description: The value below which the low state is applied.
State low threshold:
  description: The full state to apply when the value goes below the low threshold.
Trigger type:
  description: What to react to, either temperature, feels-like temperature, or humidity.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sensibo.enable_climate_react`. A basic example looks like this:

{% example %}
action: |
  action: sensibo.enable_climate_react
  target:
    entity_id: climate.living_room
  data:
    high_temperature_threshold: 24
    high_temperature_state:
      on: true
      targetTemperature: 21
      mode: cool
      fanLevel: high
      temperatureUnit: C
      swing: stopped
      horizontalSwing: stopped
      light: "on"
    low_temperature_threshold: 19
    low_temperature_state:
      on: true
      targetTemperature: 23
      mode: heat
      fanLevel: high
      temperatureUnit: C
      swing: stopped
      horizontalSwing: stopped
      light: "on"
    smart_type: temperature
{% endexample %}

### Options in YAML

{% options_yaml %}
high_temperature_threshold:
  description: The value above which the high state is applied.
  required: true
  type: float
high_temperature_state:
  description: The full state to apply when the value goes above the high threshold.
  required: true
  type: map
low_temperature_threshold:
  description: The value below which the low state is applied.
  required: true
  type: float
low_temperature_state:
  description: The full state to apply when the value goes below the low threshold.
  required: true
  type: map
smart_type:
  description: What to react to. Choose from temperature, feelslike, or humidity.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- The high and low states are full states. A full state looks like this:

  ```yaml
  on: true
  fanLevel: high
  temperatureUnit: C
  targetTemperature: 23
  mode: cool
  swing: fixedBottom
  horizontalSwing: fixedLeft
  light: "on"
  ```

- All values are case-sensitive and must match what the Sensibo API expects. Use the [Get device mode capabilities](/integrations/sensibo/#action-sensiboget_device_capabilities) action to find the valid values for your device.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
