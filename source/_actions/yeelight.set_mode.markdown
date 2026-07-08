---
title: "Set mode"
action: yeelight.set_mode
domain: yeelight
description: "Sets the operation mode of a Yeelight light."
related_actions:
  - yeelight.set_music_mode
  - yeelight.start_flow
  - yeelight.set_color_flow_scene
---

The **Set mode** action sets the operation mode of a Yeelight light.

This is useful for switching a light into a specific mode, such as moonlight mode for a soft nighttime glow, or color flow mode for a continuous color effect.

{% include actions/ui_header.md %}

To set the mode of a Yeelight light from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Yeelight light you want to control.
6. From the actions shown for that target, select **Set mode**.
7. Select the **Mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: >
    The operation mode to set. One of: last, normal, rgb, hsv, color_flow, or
    moonlight.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `yeelight.set_mode`. A basic example looks like this:

{% example %}
action: |
  action: yeelight.set_mode
  target:
    entity_id: light.bedroom
  data:
    mode: moonlight
{% endexample %}

### Options in YAML

{% options_yaml %}
mode:
  description: >
    The operation mode to set. One of: last, normal, rgb, hsv, color_flow, or
    moonlight.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
