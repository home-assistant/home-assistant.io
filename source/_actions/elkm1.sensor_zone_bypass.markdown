---
title: "Sensor zone bypass"
action: elkm1.sensor_zone_bypass
domain: elkm1
description: "Bypasses a single Elk-M1 zone."
related_actions:
  - elkm1.alarm_clear_bypass
  - elkm1.sensor_zone_trigger
---

The **Sensor zone bypass** action bypasses a single Elk-M1 zone. A bypassed zone is ignored while the system is armed.

This is useful when you want an automation to temporarily exclude one zone, for example a specific door or window that you want to leave open.

{% include actions/targets.md domain="sensor" %}

{% include actions/ui_header.md %}

To bypass a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Sensor zone bypass**.
6. Choose the Elk-M1 zone to bypass, then enter the **Code**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The alarm code to authorize the bypass of the zone.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.sensor_zone_bypass`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.sensor_zone_bypass
  target:
    entity_id: sensor.elkm1_zone_1
  data:
    code: "1234"
{% endexample %}

This bypasses the selected zone.

### Options in YAML

{% options_yaml %}
code:
  description: >
    The alarm code to authorize the bypass of the zone.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Elk-M1 cannot clear the bypass of a single zone. To restore monitoring, use the [Alarm clear bypass](/actions/elkm1.alarm_clear_bypass/) action, which clears every bypassed zone in the area at once.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
