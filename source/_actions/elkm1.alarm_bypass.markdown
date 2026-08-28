---
title: "Alarm bypass"
action: elkm1.alarm_bypass
domain: elkm1
description: "Bypasses all zones for an Elk-M1 area."
related_actions:
  - elkm1.alarm_clear_bypass
  - elkm1.sensor_zone_bypass
---

The **Alarm bypass** action bypasses all zones associated with the specified Elk-M1 area. Bypassed zones are ignored while the system is armed.

This is useful when you want an automation to temporarily exclude all zones in an area, for example to arm the system while a door or window is intentionally left open.

{% include actions/targets.md domain="alarm_control_panel" %}

{% include actions/ui_header.md %}

To bypass an area from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Alarm bypass**.
6. Choose the Elk-M1 area to bypass, then enter the **Code**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The alarm code to authorize the bypass of the alarm control panel.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.alarm_bypass`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.alarm_bypass
  target:
    entity_id: alarm_control_panel.home
  data:
    code: "1234"
{% endexample %}

This bypasses all zones in the area.

### Options in YAML

{% options_yaml %}
code:
  description: >
    The alarm code to authorize the bypass of the alarm control panel.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- To undo a bypass, use the [Alarm clear bypass](/actions/elkm1.alarm_clear_bypass/) action. Clearing bypass always clears every bypassed zone in the area.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
