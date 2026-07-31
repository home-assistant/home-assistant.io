---
title: "Sensor counter refresh"
action: elkm1.sensor_counter_refresh
domain: elkm1
description: "Refreshes the value of an Elk-M1 counter."
related_actions:
  - elkm1.sensor_counter_set
---

The **Sensor counter refresh** action retrieves the current value of an Elk-M1 counter from the panel.

This is useful because the panel does not always send counter value updates on its own. Refreshing makes sure Home Assistant shows the current counter value.

{% include actions/targets.md domain="sensor" %}

{% include actions/ui_header.md %}

To refresh a counter from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Sensor counter refresh**.
6. Choose the Elk-M1 counter to refresh.
7. Select **Save**.

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.sensor_counter_refresh`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.sensor_counter_refresh
  target:
    entity_id: sensor.elkm1_counter_1
{% endexample %}

This refreshes the value of the selected counter.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
