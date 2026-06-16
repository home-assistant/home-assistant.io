---
title: "Get schedule"
action: schedule.get_schedule
domain: schedule
description: "Retrieves the configured time ranges of one or more schedules."
related_actions:
  - schedule.reload
---

Use this action to read the configured time ranges of one or more schedules, for example to include today's schedule in a notification. You can read several schedules in one call.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the schedules you want to read.
6. From the actions shown for that target, select **Schedule: Get schedule**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `schedule.get_schedule`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: schedule.get_schedule
  target:
    entity_id:
      - schedule.vacuum_robot
      - schedule.air_purifier
  response_variable: schedules
{% endexample %}

This returns the configured time ranges for `schedule.vacuum_robot` and `schedule.air_purifier`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Response data

The response contains a field for every schedule entity you targeted. Each schedule has seven fields, one for each day of the week in lowercase, containing a list of the configured time ranges. Days without any ranges are returned as an empty list. Each time range has a `from` and a `to` time.

A shortened example of the response looks like this:

```yaml
schedule.vacuum_robot:
  monday:
    - from: "09:00:00"
      to: "15:00:00"
  tuesday: []
  wednesday: []
  thursday:
    - from: "09:00:00"
      to: "15:00:00"
  friday: []
  saturday: []
  sunday: []
schedule.air_purifier:
  monday:
    - from: "09:00:00"
      to: "18:00:00"
  tuesday: []
  wednesday: []
  thursday:
    - from: "09:00:00"
      to: "18:00:00"
  friday: []
  saturday:
    - from: "10:30:00"
      to: "12:00:00"
    - from: "14:00:00"
      to: "19:00:00"
  sunday: []
```

You can then use this response data in a later step, for example to send today's time ranges in a notification:

```yaml
action: notify.nina
data:
  title: "Today's schedules"
  message: |-
    Your vacuum robot will run today:
    {% raw %}
    {% set today = now().strftime('%A').lower() %}
    {% for event in schedules['schedule.vacuum_robot'][today] %}
    - from {{ event.from }} until {{ event.to }}
    {% endfor %}
    {% endraw %}
```

## Good to know

- Each day is keyed by its lowercase English name, such as `monday`, regardless of your interface language.
- A day with no configured time ranges is returned as an empty list.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
