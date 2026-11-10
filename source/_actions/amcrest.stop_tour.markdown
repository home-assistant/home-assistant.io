---
title: Stop tour
action: amcrest.stop_tour
domain: amcrest
description: "Stops the pan, tilt, and zoom tour on an Amcrest or Dahua camera."
related_actions:
  - amcrest.start_tour
  - amcrest.ptz_control
  - amcrest.goto_preset
---

With this action, you can stop the <abbr title="pan, tilt, and zoom">PTZ</abbr> tour function on your Amcrest or Dahua camera.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Amcrest: Stop tour**.
6. In **Entity**, select the camera you want to control.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `amcrest.stop_tour`. A basic example looks like this:

{% example %}
action: |
  action: amcrest.stop_tour
  target:
    entity_id: camera.driveway
{% endexample %}

This stops the tour function on the `camera.driveway` camera.

This action has no additional options.

{% include actions/targets.md domain="camera" entity_type="Amcrest camera" %}

In the UI, this action has an **Entity** field instead of targets. There, you can select one camera. To use a device, an area, a floor, or a label as the target, select the three dots menu {% icon "mdi:dots-vertical" %} on the action, and then select **Edit in YAML**.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
