---
title: "Stop flash"
action: hue.stop_flash
domain: hue
description: "Stops flashing a Hue light, room, or zone before the duration of the flash has passed."
related_actions:
  - hue.flash
---

Use this action to stop a flash that was started with the [Flash](/actions/hue.flash/) action, before its duration has passed. For example, you can flash the lights when the doorbell rings and stop flashing as soon as someone opens the door.

This action targets Hue light {% term entities %}, including the lights for Hue rooms and zones.

{% note %}
This action is only available for lights connected to a V2 Hue bridge (square shape).
{% endnote %}

{% include actions/ui_header.md %}

To stop flashing a Hue light from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Hue light, room, or zone you want to stop flashing.
6. From the actions shown for that target, select **Stop flash**.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hue.stop_flash`. A basic example looks like this:

{% example %}
action: |
  action: hue.stop_flash
  target:
    entity_id: light.living_room
{% endexample %}

This stops flashing the `light.living_room` Hue room.

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
