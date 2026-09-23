---
title: "Vacuum remote control start"
action: xiaomi_miio.vacuum_remote_control_start
domain: xiaomi_miio
description: "Puts a Xiaomi robot vacuum into remote control mode."
related_actions:
  - xiaomi_miio.vacuum_remote_control_move
  - xiaomi_miio.vacuum_remote_control_stop
---

The **Vacuum remote control start** action puts a Xiaomi robot vacuum into remote control mode. Once it is in this mode, you can steer it with the [Vacuum remote control move](/actions/xiaomi_miio.vacuum_remote_control_move/) action. When you're done, use [Vacuum remote control stop](/actions/xiaomi_miio.vacuum_remote_control_stop/).

{% include actions/ui_header.md %}

To start remote control mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi robot vacuum you want to control.
6. From the actions shown for that target, select **Vacuum remote control start**.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.vacuum_remote_control_start`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.vacuum_remote_control_start
  target:
    entity_id: vacuum.xiaomi_vacuum
{% endexample %}

This puts `vacuum.xiaomi_vacuum` into remote control mode.

{% include actions/targets.md domain="vacuum" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
