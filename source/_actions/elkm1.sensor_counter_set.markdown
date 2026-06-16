---
title: "Sensor counter set"
action: elkm1.sensor_counter_set
domain: elkm1
description: "Sets an Elk-M1 counter to a specific value."
related_actions:
  - elkm1.sensor_counter_refresh
---

The **Sensor counter set** action sets an Elk-M1 counter to a specific value.

This is useful when you want an automation to reset or preset a counter, for example to start a count from a known value.

{% include actions/targets.md domain="sensor" %}

{% include actions/ui_header.md %}

To set a counter value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Sensor counter set**.
6. Choose the Elk-M1 counter, then enter the **Value**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Value:
  description: The value to set the counter to, from 0 to 65535.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.sensor_counter_set`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.sensor_counter_set
  target:
    entity_id: sensor.elkm1_counter_1
  data:
    value: 0
{% endexample %}

This sets the selected counter to `0`.

### Options in YAML

{% options_yaml %}
value:
  description: >
    The value to set the counter to, from 0 to 65535.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
