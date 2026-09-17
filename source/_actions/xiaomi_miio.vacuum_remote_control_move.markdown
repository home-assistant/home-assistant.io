---
title: "Vacuum remote control move"
action: xiaomi_miio.vacuum_remote_control_move
domain: xiaomi_miio
description: "Steers a Xiaomi robot vacuum while it is in remote control mode."
related_actions:
  - xiaomi_miio.vacuum_remote_control_start
  - xiaomi_miio.vacuum_remote_control_move_step
  - xiaomi_miio.vacuum_remote_control_stop
---

The **Vacuum remote control move** action steers a Xiaomi robot vacuum. First put the vacuum into remote control mode with the [Vacuum remote control start](/actions/xiaomi_miio.vacuum_remote_control_start/) action, then call this action to set the speed, rotation, and duration of the movement.

{% include actions/ui_header.md %}

To move the vacuum from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi robot vacuum you want to control.
6. From the actions shown for that target, select **Vacuum remote control move**.
7. Set the **Velocity**, **Rotation**, and **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Velocity:
  description: The speed of the movement, between -0.29 and 0.29. Negative values move the vacuum backward.
Rotation:
  description: The rotation of the movement, between -179 and 179 degrees.
Duration:
  description: How long, in milliseconds, the vacuum should move for.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.vacuum_remote_control_move`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.vacuum_remote_control_move
  target:
    entity_id: vacuum.xiaomi_vacuum
  data:
    velocity: 0.2
    rotation: 0
    duration: 1500
{% endexample %}

This moves `vacuum.xiaomi_vacuum` forward for 1.5 seconds.

### Options in YAML

{% options_yaml %}
velocity:
  description: The speed of the movement, between -0.29 and 0.29. Negative values move the vacuum backward.
  required: false
  type: float
rotation:
  description: The rotation of the movement, between -179 and 179 degrees.
  required: false
  type: integer
duration:
  description: How long, in milliseconds, the vacuum should move for.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="vacuum" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
