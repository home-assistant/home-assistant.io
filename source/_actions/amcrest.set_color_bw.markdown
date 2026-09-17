---
title: Set color mode
action: amcrest.set_color_bw
domain: amcrest
description: "Sets the color mode of an Amcrest or Dahua camera."
related_actions:
  - amcrest.enable_audio
  - amcrest.disable_audio
---

With this action, you can set the color mode of your Amcrest or Dahua camera. You can switch between color, black and white, or let the camera decide automatically.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Amcrest: Set color mode**.
7. In the **Color mode** field, select the mode you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Color mode:
  description: "The color mode to set. Choose `auto` to let the camera decide, `color` for color, or `bw` for black and white."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `amcrest.set_color_bw`. A basic example looks like this:

{% example %}
action: |
  action: amcrest.set_color_bw
  target:
    entity_id: camera.driveway
  data:
    color_bw: auto
{% endexample %}

This sets the `camera.driveway` camera to automatic color mode.

### Options in YAML

{% options_yaml %}
color_bw:
  description: "The color mode to set. One of `auto`, `color`, or `bw`."
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
