---
title: "Get schedule"
action: eurotronic_cometblue.get_schedule
domain: eurotronic_cometblue
description: Retrieves the configured heating time ranges of one or multiple devices.
since: "2026.7"
related_actions:
  - eurotronic_cometblue.set_schedule
---

The **Get schedule** action retrieves the current schedule from a Eurotronic Comet Blue thermostat.

During the times when the schedule is active, the device will automatically try to reach the **Comfort** preset. When inactive, the **Eco** preset is used.

You can use this action in automations and scripts, or use it in {% my developer_services title="**Settings** > **Tools** > **Actions**" %} to inspect the current schedule.

{% include actions/ui_header.md %}

To retrieve the device schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Eurotronic Comet Blue: Get schedule**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick one or more thermostats.
7. Enter the name of a response variable to use the schedule in following steps.
8. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `eurotronic_cometblue.get_schedule`. A basic example looks like this:

{% example %}
action: |
  action: eurotronic_cometblue.get_schedule
  target:
    entity_id: climate.kitchen
  response_variable: my_schedule
{% endexample %}

This loads the current schedule from `climate.kitchen` and stores it in the response variable `my_schedule`.

{% include actions/targets.md %}

## Good to know

The response data contains one top-level field for each targeted climate entity.

Each entity contains seven fields, one for each day of the week in lowercase. Each day contains a list of time ranges. Days without any configured heating schedules return an empty list.

```yaml
climate.kitchen:
  monday:
    - from: "07:00:00"
      to: "09:00:00"
    - from: "17:00:00"
      to: "22:00:00"
  tuesday: []
  wednesday: []
  thursday:
    - from: "07:00:00"
      to: "09:00:00"
  friday:
    - from: "07:00:00"
      to: "09:00:00"
  saturday:
    - from: "09:00:00"
      to: "12:00:00"
  sunday: []
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
