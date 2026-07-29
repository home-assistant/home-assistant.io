---
title: "Update a habit"
action: habitica.update_habit
domain: habitica
description: "Updates an existing habit for your Habitica character."
---

Use this action to update a specific habit for the selected Habitica character.

{% include actions/ui_header.md %}

To update a habit from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Update a habit**.
6. Select the **Config entry** of the character and the **Task name** of the habit to update. Then set the values you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

## Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character that owns the habit.
  required: true
Task name:
  description: The habit to update by name, task ID, or alias.
  required: true
Rename:
  description: The new title for the habit.
  required: false
Notes:
  description: The new notes for the habit.
  required: false
Rewards or losses:
  description: "Whether the habit is good and rewarding (positive), bad and penalizing (negative), or both."
  required: false
Difficulty:
  description: "Update the difficulty of the habit. One of trivial, easy, medium, or hard."
  required: false
Counter reset:
  description: "Update when the habit's counter resets. One of daily, weekly, or monthly."
  required: false
Add tags:
  description: Add tags to the habit. If a tag does not exist yet, it is created.
  required: false
Remove tags:
  description: Remove tags from the habit.
  required: false
Adjust positive counter:
  description: Update the up counter of a positive habit.
  required: false
Adjust negative counter:
  description: Update the down counter of a negative habit.
  required: false
Task alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.update_habit`:

{% example %}
action: |
  action: habitica.update_habit
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    task: "Drink water"
    priority: medium
{% endexample %}

## Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that owns the habit.
  required: true
  type: string
task:
  description: >
    The habit to update by name, task ID, or alias.
  required: true
  type: string
rename:
  description: The new title for the habit.
  required: false
  type: string
notes:
  description: The new notes for the habit.
  required: false
  type: string
up_down:
  description: >
    Update if the habit is positive, negative, or both. One or more of up
    and down.
  required: false
  type: [string, list]
priority:
  description: >
    Update the difficulty of the habit. One of trivial, easy, medium, or hard.
  required: false
  type: string
frequency:
  description: >
    Update when the habit's counter resets. One of daily, weekly, or monthly.
  required: false
  type: string
tag:
  description: >
    Add tags to the habit. If a tag does not exist yet, it is created.
  required: false
  type: [string, list]
remove_tag:
  description: Remove tags from the habit.
  required: false
  type: [string, list]
counter_up:
  description: Update the up counter of a positive habit.
  required: false
  type: integer
counter_down:
  description: Update the down counter of a negative habit.
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
