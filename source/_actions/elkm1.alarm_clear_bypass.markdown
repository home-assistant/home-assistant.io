---
title: "Alarm clear bypass"
action: elkm1.alarm_clear_bypass
domain: elkm1
description: "Clears the bypass for all zones in an Elk-M1 area."
related_actions:
  - elkm1.alarm_bypass
  - elkm1.sensor_zone_bypass
---

The **Alarm clear bypass** action clears the bypass for all zones associated with the specified Elk-M1 area. The zones are then monitored again while the system is armed.

This is useful when you want an automation to restore monitoring of zones that were previously bypassed.

{% include actions/targets.md domain="alarm_control_panel" %}

{% include actions/ui_header.md %}

To clear the bypass for an area from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Alarm clear bypass**.
6. Choose the Elk-M1 area, then enter the **Code**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The alarm code to authorize the bypass clear of the alarm control panel.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.alarm_clear_bypass`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.alarm_clear_bypass
  target:
    entity_id: alarm_control_panel.home
  data:
    code: "1234"
{% endexample %}

This clears the bypass for all zones in the area.

### Options in YAML

{% options_yaml %}
code:
  description: >
    The alarm code to authorize the bypass clear of the alarm control panel.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This is the only way to clear a zone bypass. Elk-M1 clears all bypassed zones in the area at once, so individual zones cannot be cleared one by one.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
