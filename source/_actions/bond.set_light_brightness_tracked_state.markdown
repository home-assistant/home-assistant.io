---
title: "Set light brightness tracked state"
action: bond.set_light_brightness_tracked_state
domain: bond
description: "Updates the brightness Home Assistant believes a Bond light is set to."
related_actions:
  - bond.set_light_power_tracked_state
  - bond.set_fan_speed_tracked_state
  - bond.set_switch_power_tracked_state
---

Use this action to tell Home Assistant what brightness a Bond light is actually set to, without sending any signal to the light. Bond controls many devices over one-way radio, so it cannot always sense their real state. If the tracked brightness drifts out of sync with the light, this action corrects it.

{% include actions/ui_header.md %}

To set the tracked light brightness from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the area, floor, device, label, or entity you want to control.
6. From the actions shown for that target, select **Set light brightness tracked state**.
7. Set the **Brightness** to the value the light is actually at, from 0 to 255.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Brightness:
  description: "The brightness the light is actually set to, from 0 (off) to 255 (full brightness)."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `bond.set_light_brightness_tracked_state`. A basic example looks like this:

{% example %}
action: |
  action: bond.set_light_brightness_tracked_state
  target:
    entity_id: light.living_room_lights
  data:
    brightness: 128
{% endexample %}

This tells Home Assistant that `light.living_room_lights` is at half brightness.

### Options in YAML

{% options_yaml %}
brightness:
  description: "The brightness the light is actually set to, from 0 (off) to 255 (full brightness)."
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

## Good to know

- This action only updates the tracked state. It does not send a signal to the light, so the light stays exactly as it is.
- Brightness is on a 0 to 255 scale, where 255 is full brightness. To also correct whether the light is on or off, use [Set light power tracked state](/actions/bond.set_light_power_tracked_state/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: resync the light brightness after using the remote

Use this automation when a physical remote tells Home Assistant the light was dimmed, so the tracked brightness matches reality.

- **Trigger**: Remote "dim" button pressed
- **Action**: Set light brightness tracked state
  - **Target**: Living room lights
  - **Brightness**: 64

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Resync the living room light brightness"
    triggers:
      - trigger: state
        entity_id: sensor.light_remote_button
        to: "dim"
    actions:
      - action: bond.set_light_brightness_tracked_state
        target:
          entity_id: light.living_room_lights
        data:
          brightness: 64
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
