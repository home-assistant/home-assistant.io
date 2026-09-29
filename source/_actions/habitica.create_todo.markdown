---
title: "Create to-do"
action: habitica.create_todo
domain: habitica
description: "Creates a to-do for your Habitica character."
---

Use this action to create a to-do for the selected Habitica character.

{% include actions/ui_header.md %}

To create a to-do from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Create to-do**.
6. Select the **Config entry** of the character and enter a **Task name**. Optionally, set the other values.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character to create the to-do for.
  required: true
Task name:
  description: The title for the to-do.
  required: true
Notes:
  description: The notes for the to-do.
  required: false
Checklist:
  description: The items to add to the to-do's checklist.
  required: false
Collapse/expand checklist:
  description: "Whether the checklist is displayed as collapsed or expanded."
  required: false
Difficulty:
  description: "The difficulty of the to-do. One of trivial, easy, medium, or hard."
  required: false
Due date:
  description: The to-do's due date.
  required: false
Reminders:
  description: Add reminders to the to-do.
  required: false
Tags:
  description: Add tags to the to-do. If a tag does not exist yet, it is created.
  required: false
Task alias:
  description: "An alias to use instead of the name or task ID. Only dashes, underscores, and alphanumeric characters are supported. The alias must be unique among all your tasks."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.create_todo`:

{% example %}
action: |
  action: habitica.create_todo
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    name: "Empty the dishwasher"
    priority: easy
    date: "2026-01-31"
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character to create the to-do for.
  required: true
  type: string
name:
  description: The title for the to-do.
  required: true
  type: string
notes:
  description: The notes for the to-do.
  required: false
  type: string
add_checklist_item:
  description: The items to add to the to-do's checklist.
  required: false
  type: [string, list]
collapse_checklist:
  description: >
    Whether the checklist is displayed as collapsed or expanded.
  required: false
  type: string
priority:
  description: >
    The difficulty of the to-do. One of trivial, easy, medium, or hard.
  required: false
  type: string
date:
  description: The to-do's due date.
  required: false
  type: string
reminder:
  description: Add reminders to the to-do.
  required: false
  type: [string, list]
tag:
  description: >
    Add tags to the to-do. If a tag does not exist yet, it is created.
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
