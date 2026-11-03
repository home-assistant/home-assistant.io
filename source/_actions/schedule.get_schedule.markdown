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
6. From the actions shown for that target, under **Schedule**, select **Get schedule**.
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
- The [response data](/actions/schedule.get_schedule/#response-data) uses the same format as the YAML configuration of a schedule. You can use it to create a new schedule from an existing one. For the steps, see [Copying a schedule](/integrations/schedule/#copying-a-schedule).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: List the time blocks of a heating schedule

If you want to create a new schedule based on one you already have, list the time blocks of the existing schedule and use them as a reference when you create the new one. For example, you can create a new heating schedule with extra time blocks for the weekend.
This automation uses a [button helper](/integrations/input_button/) to start the copy and creates a persistent notification with the time blocks.

- **Trigger**: State changed
  - **Entity**: Copy heating schedule button
- **Action**: Schedule: Get schedule
  - **Target**: Heating schedule
  - **Response variable**: `schedules`
- **Action**: Persistent Notification: Create persistent notification
  - **Title**: Time blocks of your heating schedule
  - **Message**: (A template that lists the time blocks of each day)

{% details "YAML example for listing the time blocks of a schedule" %}

{% example %}
automation: |
  alias: "List the time blocks of the heating schedule"
  triggers:
    - trigger: state
      entity_id: input_button.copy_heating_schedule
  actions:
    - action: schedule.get_schedule
      target:
        entity_id: schedule.heating
      response_variable: schedules
    - action: persistent_notification.create
      data:
        title: "Time blocks of your heating schedule"
        message: |
          Use these time blocks to create your new schedule.
          {% for day, blocks in schedules['schedule.heating'].items() %}
          {%- set ns = namespace(times=[]) %}
          {%- for block in blocks %}
          {%- set start = block['from'] | string %}
          {%- set end = block['to'] | string %}
          {%- set end = '24:00:00' if end == '23:59:59.999999' else end %}
          {%- set time = start ~ ' to ' ~ end %}
          {%- if block.get('data') %}
          {%- set time = time ~ ' (`' ~ block['data'] | to_json ~ '`)' %}
          {%- endif %}
          {%- set ns.times = ns.times + [time] %}
          {%- endfor %}
          {%- set summary = ns.times | join(', ') or 'no time blocks' -%}
          - **{{ day | capitalize }}**: {{ summary }}
          {% endfor %}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
