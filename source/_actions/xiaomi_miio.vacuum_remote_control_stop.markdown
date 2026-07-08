---
title: "Vacuum remote control stop"
action: xiaomi_miio.vacuum_remote_control_stop
domain: xiaomi_miio
description: "Takes a Xiaomi robot vacuum out of remote control mode."
related_actions:
  - xiaomi_miio.vacuum_remote_control_start
  - xiaomi_miio.vacuum_remote_control_move
---

The **Vacuum remote control stop** action takes a Xiaomi robot vacuum out of remote control mode. Use it once you finish steering the vacuum with the [Vacuum remote control move](/actions/xiaomi_miio.vacuum_remote_control_move/) action.

{% include actions/ui_header.md %}

To stop remote control mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xiaomi robot vacuum you want to control.
6. From the actions shown for that target, select **Vacuum remote control stop**.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.vacuum_remote_control_stop`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.vacuum_remote_control_stop
  target:
    entity_id: vacuum.xiaomi_vacuum
{% endexample %}

This takes `vacuum.xiaomi_vacuum` out of remote control mode.

{% include actions/targets.md domain="vacuum" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
