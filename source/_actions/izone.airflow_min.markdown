---
title: "Set minimum airflow"
action: izone.airflow_min
domain: izone
description: "Sets the minimum airflow percentage for an iZone zone."
related_actions:
  - izone.airflow_max
---

Use this action to set the minimum airflow for an iZone zone, so the zone always keeps at least that much airflow when it's open. This is useful to make sure a room never gets starved of air, for example a bedroom you want to stay gently ventilated.

{% include actions/ui_header.md %}

To set the minimum airflow from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the zone you want to adjust.
6. From the actions shown for that target, select **Set minimum airflow**.
7. Set the **Percent** for the minimum airflow.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Percent:
  description: The minimum airflow percentage, set in steps of 5%.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `izone.airflow_min`. A basic example looks like this:

{% example %}
action: |
  action: izone.airflow_min
  target:
    entity_id: climate.bed_2
  data:
    airflow: 20
{% endexample %}

This keeps at least 20% airflow to the `climate.bed_2` zone.

### Options in YAML

{% options_yaml %}
airflow:
  description: >
    The minimum airflow percentage, between 0 and 100, set in steps of 5%.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- The minimum can't be higher than the zone's maximum airflow. Use [Set maximum airflow](/actions/izone.airflow_max/) to raise the maximum first if you need a higher minimum.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: ventilate the nursery overnight

At night, keep a minimum airflow to the nursery so the room stays gently ventilated while everyone sleeps.

- **Trigger**: Time, 21:00
- **Action**: iZone: Set minimum airflow on the nursery

{% details "YAML example for overnight ventilation" %}

{% example %}
automation: |
  alias: "Ventilate the nursery overnight"
  triggers:
    - trigger: time
      at: "21:00:00"
  actions:
    - action: izone.airflow_min
      target:
        entity_id: climate.nursery
      data:
        airflow: 25
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
