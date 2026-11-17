---
title: "Capture SmartCam image"
action: verisure.capture_smartcam
domain: verisure
description: "Captures a new image from a Verisure SmartCam."
related_actions:
  - verisure.enable_autolock
  - verisure.disable_autolock
---

Use this action to capture a new image from a Verisure SmartCam. This is handy in automations, for example to grab a fresh image when motion is detected.

{% include actions/ui_header.md %}

To capture an image from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Verisure: Capture SmartCam image**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select the SmartCam you want to use.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `verisure.capture_smartcam`. A basic example looks like this:

{% example %}
action: |
  action: verisure.capture_smartcam
  target:
    entity_id: camera.hallway
{% endexample %}

{% include actions/targets.md domain="camera" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
