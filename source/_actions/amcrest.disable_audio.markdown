---
title: Disable audio
action: amcrest.disable_audio
domain: amcrest
description: "Disables the audio stream on an Amcrest or Dahua camera."
related_actions:
  - amcrest.enable_audio
---

With this action, you can disable the audio stream on your Amcrest or Dahua camera.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the camera you want to control. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Amcrest: Disable audio**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `amcrest.disable_audio`. A basic example looks like this:

{% example %}
action: |
  action: amcrest.disable_audio
  target:
    entity_id: camera.driveway
{% endexample %}

This disables the audio stream for the `camera.driveway` camera.

This action has no additional options.

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
