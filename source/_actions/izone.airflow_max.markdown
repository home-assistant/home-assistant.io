---
title: "Set maximum airflow"
action: izone.airflow_max
domain: izone
description: "Sets the maximum airflow percentage for an iZone zone."
related_actions:
  - izone.airflow_min
---

Use this action to set the maximum airflow for an iZone zone, so the zone never draws more than that much airflow. This is useful to balance your system, for example to stop one room taking all the air from the rest of the house.

{% include actions/ui_header.md %}

To set the maximum airflow from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zone you want to adjust.
6. From the actions shown for that target, select **Set maximum airflow**.
7. Set the **Percent** for the maximum airflow.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Percent:
  description: The maximum airflow percentage, set in steps of 5%.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `izone.airflow_max`. A basic example looks like this:

{% example %}
action: |
  action: izone.airflow_max
  target:
    entity_id: climate.bed_2
  data:
    airflow: 80
{% endexample %}

This limits the `climate.bed_2` zone to at most 80% airflow.

### Options in YAML

{% options_yaml %}
airflow:
  description: >
    The maximum airflow percentage, between 0 and 100, set in steps of 5%.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- The maximum can't be lower than the zone's minimum airflow. Use [Set minimum airflow](/actions/izone.airflow_min/) to lower the minimum first if you need a lower maximum.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: limit the living room during peak cooling

On hot afternoons, cap the living room airflow so the rest of the house keeps cooling evenly.

- **Trigger**: Outdoor temperature rises above 30 °C
- **Action**: iZone: Set maximum airflow on the living room

{% details "YAML example for limiting airflow on hot days" %}

{% example %}
automation: |
  alias: "Limit living room airflow on hot afternoons"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.outdoor_temperature
      above: 30
  actions:
    - action: izone.airflow_max
      target:
        entity_id: climate.living_room
      data:
        airflow: 70
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
