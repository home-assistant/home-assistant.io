---
title: "Update a to-do"
action: habitica.update_todo
domain: habitica
description: "Updates an existing to-do for your Habitica character."
---

Use this action to update a specific to-do for the selected Habitica character.

{% include actions/ui_header.md %}

To update a to-do from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Update to-do**.
5. From the search box, search for and select **Habitica: Update a to-do**.
6. Select the **Config entry** of the character and the **Task name** of the to-do to update. Then set the values you want to change.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character that owns the to-do.
  required: true
Task name:
  description: The to-do to update by name, task ID, or alias.
  required: true
Rename:
  description: The new title for the to-do.
  required: false
Notes:
  description: The new notes for the to-do.
  required: false
Add checklist items:
  description: The items to add to the to-do's checklist.
  required: false
Delete items:
  description: Remove items from the to-do's checklist.
  required: false
Complete items:
  description: Mark items on the to-do's checklist as completed.
  required: false
Uncomplete items:
  description: Undo completion of items on the to-do's checklist.
  required: false
Collapse/expand checklist:
  description: "Whether the checklist is displayed as collapsed or expanded."
  required: false
Difficulty:
  description: "Update the difficulty of the to-do. One of trivial, easy, medium, or hard."
  required: false
Due date:
  description: The to-do's due date.
  required: false
Clear due date:
  description: Remove the due date from the to-do.
  required: false
Add reminders:
  description: Add reminders to the to-do.
  required: false
Remove reminders:
  description: Remove specific reminders from the to-do.
  required: false
Clear all reminders:
  description: Remove all reminders from the to-do.
  required: false
Add tags:
  description: Add tags to the to-do. If a tag does not exist yet, it is created.
  required: false
Remove tags:
  description: Remove tags from the to-do.
  required: false
Task alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.update_todo`:

{% example %}
action: |
  action: habitica.update_todo
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    task: "Empty the dishwasher"
    priority: medium
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character that owns the to-do.
  required: true
  type: string
task:
  description: >
    The to-do to update by name, task ID, or alias.
  required: true
  type: string
rename:
  description: The new title for the to-do.
  required: false
  type: string
notes:
  description: The new notes for the to-do.
  required: false
  type: string
add_checklist_item:
  description: The items to add to the to-do's checklist.
  required: false
  type: [string, list]
remove_checklist_item:
  description: Remove items from the to-do's checklist.
  required: false
  type: [string, list]
score_checklist_item:
  description: Mark items on the to-do's checklist as completed.
  required: false
  type: [string, list]
unscore_checklist_item:
  description: Undo completion of items on the to-do's checklist.
  required: false
  type: [string, list]
collapse_checklist:
  description: >
    Whether the checklist is displayed as collapsed or expanded.
  required: false
  type: string
priority:
  description: >
    Update the difficulty of the to-do. One of trivial, easy, medium, or hard.
  required: false
  type: string
date:
  description: The to-do's due date.
  required: false
  type: string
clear_date:
  description: Remove the due date from the to-do.
  required: false
  type: boolean
  default: false
reminder:
  description: Add reminders to the to-do.
  required: false
  type: [string, list]
remove_reminder:
  description: Remove specific reminders from the to-do.
  required: false
  type: [string, list]
clear_reminder:
  description: Remove all reminders from the to-do.
  required: false
  type: boolean
  default: false
tag:
  description: >
    Add tags to the to-do. If a tag does not exist yet, it is created.
  required: false
  type: [string, list]
remove_tag:
  description: Remove tags from the to-do.
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
