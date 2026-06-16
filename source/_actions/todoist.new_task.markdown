---
title: "New task"
action: todoist.new_task
domain: todoist
description: "Creates a new Todoist task and adds it to a project."
---

Use this action to create a new Todoist task. Beyond the basic to-do actions, this action gives you more control over the task, letting you set a project, section, labels, an assignee, a priority, a due date, and a reminder.

This is handy in automations, for example to add a "Take out the bins" task with a due date the evening before collection day, so it shows up in Todoist automatically.

When you leave the project and labels empty, the task goes to your **Inbox** project.

{% include actions/ui_header.md %}

To create a new task from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Todoist: New task**.
6. Enter the **Content** for the task, and optionally set any of the other fields.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Content:
  description: The name of the task.
  required: true
Description:
  description: A description for the task.
  required: false
Project:
  description: The name of the project this task should belong to.
  required: false
Section:
  description: The name of a section within the project to add the task to.
  required: false
Labels:
  description: Any labels that you want to apply to this task, separated by a comma.
  required: false
Assignee:
  description: The username of a member of a shared project to assign this task to.
  required: false
Priority:
  description: The priority of this task, from 1 (normal) to 4 (urgent).
  required: false
Due date string:
  description: The time this task is due, in natural language.
  required: false
Due date language:
  description: The language of the due date string.
  required: false
Due date:
  description: The time this task is due, in the format YYYY-MM-DD or YYYY-MM-DD HH:MM, in the UTC time zone.
  required: false
Reminder date string:
  description: When you should be reminded of this task, in natural language.
  required: false
Reminder date language:
  description: The language of the reminder date string.
  required: false
Reminder date:
  description: When you should be reminded of this task, in the format YYYY-MM-DD HH:MM, in the UTC time zone.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `todoist.new_task`. A basic example looks like this:

{% example %}
action: |
  action: todoist.new_task
  data:
    content: "Pick up the mail"
    project: "Errands"
    labels: "Homework,School"
    priority: 3
    due_date: "2017-09-12 14:00"
{% endexample %}

This creates the task "Pick up the mail" in the Errands project.

### Options in YAML

{% options_yaml %}
content:
  description: >
    The name of the task.
  required: true
  type: string
description:
  description: >
    A description for the task.
  required: false
  type: string
project:
  description: >
    The name of the project this task should belong to. Defaults to your
    Inbox project.
  required: false
  type: string
section:
  description: >
    The name of a section within the project to add the task to.
  required: false
  type: string
labels:
  description: >
    Any labels that you want to apply to this task, separated by a comma.
  required: false
  type: string
assignee:
  description: >
    The username of a member of a shared project to assign this task to.
  required: false
  type: string
priority:
  description: >
    The priority of this task, from 1 (normal) to 4 (urgent).
  required: false
  type: integer
due_date_string:
  description: >
    The time this task is due, in natural language. Mutually exclusive
    with the due date.
  required: false
  type: string
due_date_lang:
  description: >
    The language of the due date string.
  required: false
  type: string
due_date:
  description: >
    The time this task is due, in the format YYYY-MM-DD or
    YYYY-MM-DD HH:MM, in the UTC time zone. Mutually exclusive with the
    due date string.
  required: false
  type: string
reminder_date_string:
  description: >
    When you should be reminded of this task, in natural language.
    Mutually exclusive with the reminder date.
  required: false
  type: string
reminder_date_lang:
  description: >
    The language of the reminder date string.
  required: false
  type: string
reminder_date:
  description: >
    When you should be reminded of this task, in the format
    YYYY-MM-DD HH:MM, in the UTC time zone. Mutually exclusive with the
    reminder date string.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- For everyday tasks, you can also use the actions from the [to-do](/integrations/todo/) integration to create, update, and delete to-do items.
- The due date string and the due date are mutually exclusive. Use one or the other.
- The reminder date string and the reminder date are mutually exclusive. Use one or the other.
- When you leave the project empty, the task goes to your **Inbox** project.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add a bin collection reminder

The evening before bin collection, add a Todoist task with a due date so it shows up in your list.

- **Trigger**: Every Tuesday at 18:00
- **Action**: Todoist: New task

{% details "YAML example for a bin collection reminder" %}

{% example %}
automation: |
  alias: "Add bin collection task"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: time
      weekday:
        - tue
  actions:
    - action: todoist.new_task
      data:
        content: "Take out the bins"
        due_date_string: "tomorrow at 7am"
        due_date_lang: "en"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
