---
title: "Enable motion detection"
action: camera.enable_motion_detection
domain: vivotek
description: "Enables motion detection for a VIVOTEK camera."
related_actions:
  - camera.enable_motion_detection
---

Use this action to enable motion detection on a VIVOTEK camera.

{% include actions/ui_header.md %}

To enable motion detection from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the VIVOTEK camera.
6. From the actions shown for that target, select **Enable motion detection**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `camera.enable_motion_detection`. A basic example looks like this:

{% example %}
action: |
  action: camera.enable_motion_detection
  target:
    entity_id: camera.front_door_camera
{% endexample %}

### Options in YAML

This action has no additional options.

{% include actions/targets.md domain="camera" %}

## Good to know

- This enables the first event configured on the camera.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
