---
title: "Update daily"
action: habitica.update_daily
domain: habitica
description: "Updates an existing daily for your Habitica character."
---

Use this action to update a specific daily for the selected Habitica character.

{% include actions/ui_header.md %}

To update a daily from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Update daily**.
6. Select the **Config entry** of the character and the **Task** of the daily to update. Then set the values you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Habitica character that owns the daily.
  required: true
Task:
  description: The daily to update by name, task ID, or alias.
  required: true
Rename:
  description: The new title for the daily.
  required: false
Notes:
  description: The new notes for the daily.
  required: false
Add checklist item:
  description: The items to add to the daily's checklist.
  required: false
Remove checklist item:
  description: Remove items from the daily's checklist.
  required: false
Score checklist item:
  description: Mark items on the daily's checklist as completed.
  required: false
Unscore checklist item:
  description: Undo completion of items on the daily's checklist.
  required: false
Collapse checklist:
  description: "Whether the checklist is displayed as collapsed or expanded."
  required: false
Priority:
  description: "Update the difficulty of the daily. One of trivial, easy, medium, or hard."
  required: false
Start date:
  description: The date when the daily becomes active and the day it repeats on.
  required: false
Frequency:
  description: "The repetition interval of the daily. One of daily, weekly, monthly, or yearly."
  required: false
Every x:
  description: "The number of intervals after which the daily repeats, based on the chosen frequency. A value of 0 makes the daily inactive (a gray daily)."
  required: false
Repeat:
  description: The days of the week the daily repeats. Applies when the frequency is weekly.
  required: false
Repeat monthly:
  description: "Whether a monthly daily repeats on the same calendar day (day_of_month) or the same weekday of the month (day_of_week), based on the start date. Applies when the frequency is monthly."
  required: false
Reminder:
  description: Add reminders to the daily.
  required: false
Remove reminder:
  description: Remove specific reminders from the daily.
  required: false
Clear reminder:
  description: Remove all reminders from the daily.
  required: false
Tag:
  description: Add tags to the daily. If a tag does not exist yet, it is created.
  required: false
Remove tag:
  description: Remove tags from the daily.
  required: false
Streak:
  description: Adjust or reset the streak counter of the daily.
  required: false
Alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.update_daily`:

{% example %}
action: |
  action: habitica.update_daily
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    task: "Brush teeth"
    priority: medium
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that owns the daily.
  required: true
  type: string
task:
  description: >
    The daily to update by name, task ID, or alias.
  required: true
  type: string
rename:
  description: The new title for the daily.
  required: false
  type: string
notes:
  description: The new notes for the daily.
  required: false
  type: string
add_checklist_item:
  description: The items to add to the daily's checklist.
  required: false
  type: [string, list]
remove_checklist_item:
  description: Remove items from the daily's checklist.
  required: false
  type: [string, list]
score_checklist_item:
  description: Mark items on the daily's checklist as completed.
  required: false
  type: [string, list]
unscore_checklist_item:
  description: Undo completion of items on the daily's checklist.
  required: false
  type: [string, list]
collapse_checklist:
  description: >
    Whether the checklist is displayed as collapsed or expanded.
  required: false
  type: string
priority:
  description: >
    Update the difficulty of the daily. One of trivial, easy, medium, or hard.
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
remove_reminder:
  description: Remove specific reminders from the daily.
  required: false
  type: [string, list]
clear_reminder:
  description: Remove all reminders from the daily.
  required: false
  type: boolean
  default: false
tag:
  description: >
    Add tags to the daily. If a tag does not exist yet, it is created.
  required: false
  type: [string, list]
remove_tag:
  description: Remove tags from the daily.
  required: false
  type: [string, list]
streak:
  description: Adjust or reset the streak counter of the daily.
  required: false
  type: integer
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
