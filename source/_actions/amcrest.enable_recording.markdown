---
title: Enable recording
action: amcrest.enable_recording
domain: amcrest
description: "Lets the camera record continuously to its storage location."
related_actions:
  - amcrest.disable_recording
  - amcrest.enable_motion_recording
  - amcrest.disable_motion_recording
---

With this action, you let your Amcrest or Dahua camera record continuously to its configured storage location.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Amcrest: Enable recording**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `amcrest.enable_recording`. A basic example looks like this:

{% example %}
action: |
  action: amcrest.enable_recording
  target:
    entity_id: camera.driveway
{% endexample %}

This lets the `camera.driveway` camera record continuously.

This action has no additional options.

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
