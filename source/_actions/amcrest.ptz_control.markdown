---
title: PTZ control
action: amcrest.ptz_control
domain: amcrest
description: "Pans, tilts, or zooms an Amcrest or Dahua camera that supports PTZ."
related_actions:
  - amcrest.goto_preset
  - amcrest.start_tour
  - amcrest.stop_tour
---

With this action, you can pan, tilt, or zoom your Amcrest or Dahua camera, as long as the camera supports <abbr title="pan, tilt, and zoom">PTZ</abbr>.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Amcrest: PTZ control**.
6. In **Entity**, select the camera you want to control.
7. In the **Movement** field, select the direction you want the camera to move in.
8. Optionally, set the **Travel time** to control how long the movement lasts.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Movement:
  description: "The direction of the movement. One of `zoom_in`, `zoom_out`, `up`, `down`, `left`, `right`, `right_up`, `right_down`, `left_up`, or `left_down`."
Travel time:
  description: How long the movement lasts, in fractional seconds, from 0 to 1.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `amcrest.ptz_control`. A basic example looks like this:

{% example %}
action: |
  action: amcrest.ptz_control
  target:
    entity_id: camera.driveway
  data:
    movement: up
{% endexample %}

This pans the `camera.driveway` camera up.

### Options in YAML

{% options_yaml %}
movement:
  description: "The direction of the movement. One of `zoom_in`, `zoom_out`, `up`, `down`, `left`, `right`, `right_up`, `right_down`, `left_up`, or `left_down`."
  required: true
  type: string
travel_time:
  description: How long the movement lasts, in fractional seconds, from 0 to 1.
  required: false
  default: 0.2
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" entity_type="Amcrest camera" %}

In the UI, this action has an **Entity** field instead of targets. There, you can select one camera. To use a device, an area, a floor, or a label as the target, select the three dots menu {% icon "mdi:dots-vertical" %} on the action, and then select **Edit in YAML**.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
