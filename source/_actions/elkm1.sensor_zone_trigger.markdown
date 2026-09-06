---
title: "Sensor zone trigger"
action: elkm1.sensor_zone_trigger
domain: elkm1
description: "Virtually triggers an Elk-M1 zone."
related_actions:
  - elkm1.sensor_zone_bypass
---

The **Sensor zone trigger** action virtually triggers an Elk-M1 zone. It creates a momentary open condition on the zone, as if the end-of-line hardwired loop had been physically opened.

This is useful when you want an automation to simulate a zone activation, for example for testing or to drive panel logic that reacts to a zone opening.

{% include actions/targets.md domain="sensor" %}

{% include actions/ui_header.md %}

To trigger a zone from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Sensor zone trigger**.
6. Choose the Elk-M1 zone to trigger.
7. Select **Save**.

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.sensor_zone_trigger`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.sensor_zone_trigger
  target:
    entity_id: sensor.elkm1_zone_1
{% endexample %}

This creates a virtual momentary open condition on the selected zone.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
