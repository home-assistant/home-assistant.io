---
title: "PTZ"
action: foscam.ptz
domain: foscam
description: "Pans or tilts a Foscam camera in a given direction."
related_actions:
  - foscam.ptz_preset
---

Use this action to pan or tilt a Foscam camera in a given direction from an automation or a script. This action is available for cameras that support pan, tilt, and zoom (PTZ).

{% include actions/ui_header.md %}

To move a camera from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Foscam camera you want to move.
6. From the actions shown for that target, select **PTZ**.
7. Select the **Movement** direction, and optionally set the **Travel time**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Movement:
  description: "The direction to move the camera: `up`, `down`, `left`, `right`, `top_left`, `top_right`, `bottom_left`, or `bottom_right`."
  required: true
Travel time:
  description: How long the camera moves, in seconds, from 0 to 1. Defaults to 0.125.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `foscam.ptz`. A basic example looks like this:

{% example %}
action: |
  action: foscam.ptz
  target:
    entity_id: camera.bedroom
  data:
    movement: up
{% endexample %}

This tilts the camera upward.

### Options in YAML

{% options_yaml %}
movement:
  description: "The direction to move the camera: `up`, `down`, `left`, `right`, `top_left`, `top_right`, `bottom_left`, or `bottom_right`."
  required: true
  type: string
travel_time:
  description: How long the camera moves, in seconds, from 0 to 1.
  required: false
  type: float
  default: 0.125
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- This action only works with Foscam cameras that support pan, tilt, and zoom (PTZ).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
