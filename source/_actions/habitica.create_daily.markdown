---
title: "Create a daily"
action: habitica.create_daily
domain: habitica
description: "Creates a daily for your Habitica character."
---

Use this action to create a daily for the selected Habitica character.

{% include actions/ui_header.md %}

To create a daily from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Create a daily**.
6. Select the **Config entry** of the character and enter a **Task name**. Optionally, set the other values.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Habitica character to create the daily for.
  required: true
Task name:
  description: The title for the daily.
  required: true
Notes:
  description: The notes for the daily.
  required: false
Checklist:
  description: The items to add to the daily's checklist.
  required: false
Collapse/expand checklist:
  description: "Whether the checklist is displayed as collapsed or expanded."
  required: false
Difficulty:
  description: "The difficulty of the daily. One of trivial, easy, medium, or hard."
  required: false
Start date:
  description: The date when the daily becomes active and the day it repeats on.
  required: false
Repeat interval:
  description: "The repetition interval of the daily. One of daily, weekly, monthly, or yearly."
  required: false
Repeat every X:
  description: "The number of intervals after which the daily repeats, based on the chosen frequency. A value of 0 makes the daily inactive (a gray daily)."
  required: false
Weekly repeat days:
  description: The days of the week the daily repeats. Applies when the frequency is weekly.
  required: false
Monthly repeat day:
  description: "Whether a monthly daily repeats on the same calendar day (day_of_month) or the same weekday of the month (day_of_week), based on the start date. Applies when the frequency is monthly."
  required: false
Reminders:
  description: Add reminders to the daily.
  required: false
Tags:
  description: Add tags to the daily. If a tag does not exist yet, it is created.
  required: false
Task alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.create_daily`:

{% example %}
action: |
  action: habitica.create_daily
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    name: "Brush teeth"
    frequency: weekly
    repeat:
      - m
      - w
      - f
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character to create the daily for.
  required: true
  type: string
name:
  description: The title for the daily.
  required: true
  type: string
notes:
  description: The notes for the daily.
  required: false
  type: string
add_checklist_item:
  description: The items to add to the daily's checklist.
  required: false
  type: [string, list]
collapse_checklist:
  description: >
    Whether the checklist is displayed as collapsed or expanded.
  required: false
  type: string
priority:
  description: >
    The difficulty of the daily. One of trivial, easy, medium, or hard.
  required: false
  type: string
start_date:
  description: >
    The date when the daily becomes active and the day it repeats on.
  required: false
  type: string
frequency:
  description: >
    The repetition interval of the daily. One of daily, weekly, monthly, or
    yearly.
  required: false
  type: string
every_x:
  description: >
    The number of intervals after which the daily repeats, based on the chosen
    frequency. A value of 0 makes the daily inactive (a gray daily).
  required: false
  type: integer
repeat:
  description: >
    The days of the week the daily repeats. Applies when the frequency is
    weekly.
  required: false
  type: list
repeat_monthly:
  description: >
    Whether a monthly daily repeats on the same calendar day (day_of_month) or
    the same weekday of the month (day_of_week), based on the start date.
    Applies when the frequency is monthly.
  required: false
  type: string
reminder:
  description: Add reminders to the daily.
  required: false
  type: [string, list]
tag:
  description: >
    Add tags to the daily. If a tag does not exist yet, it is created.
  required: false
  type: [string, list]
alias:
  description: >
    An alias to use instead of the name or task ID. Only dashes, underscores,
    and alphanumeric characters are supported. The alias must be unique among
    all your tasks.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
