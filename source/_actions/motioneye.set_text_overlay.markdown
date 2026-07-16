---
title: "Set text overlay"
action: motioneye.set_text_overlay
domain: motioneye
description: "Sets the text overlay for a camera."
related_actions:
  - motioneye.snapshot
  - motioneye.action
---

Use this action to set the text overlay shown on the left and right side of one or more motionEye cameras. Each side can show a timestamp, the camera name, custom text, or nothing.

{% include actions/ui_header.md %}

To set a text overlay from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the motionEye camera you want to change.
6. From the actions shown for that target, select **Set text overlay**.
7. Choose what to show with **Left text overlay** and **Right text overlay**. If you pick custom text, enter it in **Left custom text** or **Right custom text**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Left text overlay:
  description: What to show on the left side. One of timestamp, camera name, custom text, or disabled.
  required: false
Left custom text:
  description: The custom text to show on the left, when left text overlay is set to custom text.
  required: false
Right text overlay:
  description: What to show on the right side. One of timestamp, camera name, custom text, or disabled.
  required: false
Right custom text:
  description: The custom text to show on the right, when right text overlay is set to custom text.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `motioneye.set_text_overlay`. A basic example looks like this:

{% example %}
action: |
  action: motioneye.set_text_overlay
  target:
    entity_id: camera.office
  data:
    left_text: timestamp
    right_text: custom-text
    custom_right_text: "Alarm armed"
{% endexample %}

This shows a timestamp on the left and the custom text `Alarm armed` on the right of the `camera.office` camera.

### Options in YAML

{% options_yaml %}
left_text:
  description: >
    What to show on the left side. One of `timestamp`, `camera-name`,
    `custom-text`, or `disabled`.
  required: false
  type: string
custom_left_text:
  description: The custom text to show on the left, when `left_text` is set to `custom-text`.
  required: false
  type: string
right_text:
  description: >
    What to show on the right side. One of `timestamp`, `camera-name`,
    `custom-text`, or `disabled`.
  required: false
  type: string
custom_right_text:
  description: The custom text to show on the right, when `right_text` is set to `custom-text`.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- Calling this action resets the motionEye cameras, which briefly pauses the stream, recordings, and motion detection.
- Make sure the **Text overlay** switch is turned on so the configured text overlays are actually displayed.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
