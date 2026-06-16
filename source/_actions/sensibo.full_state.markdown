---
title: "Set the full state of a Sensibo device"
action: sensibo.full_state
domain: sensibo
description: "Sends a complete state to a Sensibo climate device in a single command."
related_actions:
  - sensibo.get_device_capabilities
  - sensibo.assume_state
---

Use this action to send a complete state to a Sensibo climate device in one command, instead of changing each setting separately.

The values must match what the Sensibo API expects, and they are case-sensitive. Only provide the fields your device supports. Use the [Get device mode capabilities](/integrations/sensibo/#action-sensiboget_device_capabilities) action first to find the valid values for your device.

{% include actions/ui_header.md %}

To set the full state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sensibo climate device.
6. From the actions shown for that target, select **Sensibo: Set full state**.
7. Select the **HVAC mode** and set the other options your device supports.
8. Select **Save**.

### Options in the UI

{% options_ui %}
HVAC mode:
  description: The HVAC mode to set. Choose from cool, heat, fan, auto, dry, or off.
Target temperature:
  description: The target temperature to set, if your device supports it.
  required: false
Fan mode:
  description: The fan mode to set, if your device supports it.
  required: false
Swing mode:
  description: The swing mode to set, if your device supports it.
  required: false
Horizontal swing mode:
  description: The horizontal swing mode to set, if your device supports it.
  required: false
Light:
  description: Turn the device light on, off, or dim, if your device supports it.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sensibo.full_state`. A basic example looks like this:

{% example %}
action: |
  action: sensibo.full_state
  target:
    entity_id: climate.living_room
  data:
    mode: heat
    target_temperature: 23
{% endexample %}

### Options in YAML

{% options_yaml %}
mode:
  description: The HVAC mode to set. Choose from cool, heat, fan, auto, dry, or off.
  required: true
  type: string
target_temperature:
  description: The target temperature to set, if your device supports it.
  required: false
  type: integer
fan_mode:
  description: The fan mode to set, if your device supports it.
  required: false
  type: string
swing_mode:
  description: The swing mode to set, if your device supports it.
  required: false
  type: string
horizontal_swing_mode:
  description: The horizontal swing mode to set, if your device supports it.
  required: false
  type: string
light:
  description: Turn the device light on, off, or dim, if your device supports it. Choose from on, off, or dim.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- All values are case-sensitive and must match what the Sensibo API expects. Use the [Get device mode capabilities](/integrations/sensibo/#action-sensiboget_device_capabilities) action to find the valid values for your device.
- Only provide the fields your device supports.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a full state in the evening

Apply a complete state to the HVAC device every day at 6 PM.

- **Trigger**: Every day at 18:00
- **Action**: Sensibo: Set full state
  - **Target**: Living room

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Example full state"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: sensibo.full_state
      target:
        entity_id: climate.hvac_device
      data:
        mode: heat
        target_temperature: 23
        fan_mode: medium
        swing_mode: fixedMiddleTop
        horizontal_swing_mode: fixedCenter
        light: "off"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
