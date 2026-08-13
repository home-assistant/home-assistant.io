---
title: "Set light power tracked state"
action: bond.set_light_power_tracked_state
domain: bond
description: "Updates the power state Home Assistant believes a Bond light is in."
related_actions:
  - bond.set_light_brightness_tracked_state
  - bond.set_fan_speed_tracked_state
  - bond.set_switch_power_tracked_state
---

Use this action to tell Home Assistant whether a Bond light is actually on or off, without sending any signal to the light. Bond controls many devices over one-way radio, so it cannot always sense their real state. If the tracked power state drifts out of sync with the light, this action corrects it.

{% include actions/ui_header.md %}

To set the tracked light power state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Set light power tracked state**.
7. Turn **Power state** on or off to match the light's actual state.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Power state:
  description: "Turn on if the light is actually on, or off if it is actually off."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bond.set_light_power_tracked_state`. A basic example looks like this:

{% example %}
action: |
  action: bond.set_light_power_tracked_state
  target:
    entity_id: light.living_room_lights
  data:
    power_state: true
{% endexample %}

This tells Home Assistant that `light.living_room_lights` is on.

### Options in YAML

{% options_yaml %}
power_state:
  description: "Whether the light is actually on (true) or off (false)."
  required: true
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- This action only updates the tracked state. It does not send a signal to the light, so the light stays exactly as it is.
- To also correct the tracked brightness, use [Set light brightness tracked state](/actions/bond.set_light_brightness_tracked_state/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: resync the light state after using the remote

Use this automation when a physical remote tells Home Assistant the light was turned on, so the tracked state matches reality.

- **Trigger**: Remote "on" button pressed
- **Action**: Set light power tracked state
  - **Target**: Living room lights
  - **Power state**: On

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Resync the living room light state"
    triggers:
      - trigger: state
        entity_id: sensor.light_remote_button
        to: "on"
    actions:
      - action: bond.set_light_power_tracked_state
        target:
          entity_id: light.living_room_lights
        data:
          power_state: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
