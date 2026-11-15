---
title: "Get tasks"
action: habitica.get_tasks
domain: habitica
description: "Retrieves tasks from your Habitica account, with optional filters."
---

Use this action to fetch tasks from your Habitica account. Optional filters let you narrow the results down for more precise retrieval.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get tasks from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Habitica: Get tasks**.
6. Select the **Config entry** of the character. Optionally, set one or more filters to narrow down the results.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Select character:
  description: The Habitica character to retrieve tasks from.
  required: true
Task type:
  description: "Filter tasks by type. One or more of habit, daily, todo, or reward."
  required: false
Difficulty:
  description: "Filter tasks by difficulty. One or more of trivial, easy, medium, or hard."
  required: false
Task name:
  description: Select specific tasks by name, task ID, or alias.
  required: false
Tag:
  description: Filter tasks that have one or more of the selected tags.
  required: false
Keyword:
  description: Filter tasks by keyword, searching across titles, notes, and checklists.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `habitica.get_tasks`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: habitica.get_tasks
  data:
    config_entry: 6b4be47a1fa7c3764f14cf756dc9899d
    type: todo
    priority: hard
  response_variable: tasks
{% endexample %}

This fetches all to-dos with a difficulty of hard.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Habitica character to retrieve tasks from.
  required: true
  type: string
type:
  description: >
    Filter tasks by type. One or more of habit, daily, todo, or reward.
  required: false
  type: [string, list]
priority:
  description: >
    Filter tasks by difficulty. One or more of trivial, easy, medium, or hard.
  required: false
  type: [string, list]
task:
  description: >
    Select specific tasks by name, task ID, or alias.
  required: false
  type: [string, list]
tag:
  description: >
    Filter tasks that have one or more of the selected tags.
  required: false
  type: [string, list]
keyword:
  description: >
    Filter tasks by keyword, searching across titles, notes, and checklists.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The response variable contains a `tasks` list. Each entry describes a single Habitica task, including its title, notes, type, priority, checklist, and other task details.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
