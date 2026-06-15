---
title: "Record"
action: blink.record
domain: blink
description: "Requests a Blink camera to record a new video clip."
related_actions:
  - blink.trigger_camera
  - blink.save_video
  - blink.save_recent_clips
---

The **Record** action asks a Blink camera to record a new video clip.

This is handy when you want to capture a clip from an automation or a script, for example when motion is detected somewhere else in your home.

{% include actions/ui_header.md %}

To record a clip from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Blink camera you want to record.
6. From the actions shown for that target, select **Blink: Record**.
7. Select **Save**.

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `blink.record`. A basic example looks like this:

{% example %}
action: |
  action: blink.record
  target:
    entity_id: camera.blink_front_door
{% endexample %}

This action has no additional options in YAML.

{% include actions/targets.md domain="camera" %}

## Good to know

- Keep a minimum of 5 seconds between sequential Blink actions. Calls made too quickly after each other can be throttled and ignored.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
