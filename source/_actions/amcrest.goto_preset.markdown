---
title: Go to preset
action: amcrest.goto_preset
domain: amcrest
description: "Moves an Amcrest or Dahua camera to a configured PTZ preset position."
related_actions:
  - amcrest.ptz_control
  - amcrest.start_tour
  - amcrest.stop_tour
---

With this action, you can move your Amcrest or Dahua camera to one of the <abbr title="pan, tilt, and zoom">PTZ</abbr> positions configured within the camera.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Amcrest: Go to preset**.
7. In the **Preset** field, enter the preset number you want to move to.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Preset:
  description: The preset number to move to, starting from 1.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `amcrest.goto_preset`. A basic example looks like this:

{% example %}
action: |
  action: amcrest.goto_preset
  target:
    entity_id: camera.driveway
  data:
    preset: 1
{% endexample %}

This moves the `camera.driveway` camera to preset 1.

### Options in YAML

{% options_yaml %}
preset:
  description: The preset number to move to, starting from 1.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
