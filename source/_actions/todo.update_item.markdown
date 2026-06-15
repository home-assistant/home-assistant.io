---
title: "Update to-do list item"
action: todo.update_item
domain: todo
description: "Updates an existing item on a to-do list."
related_actions:
  - todo.get_items
  - todo.add_item
  - todo.remove_item
---

Use this action to update an existing item on a to-do list, for example to rename it, mark it as completed, or change its due date.

{% include actions/ui_header.md %}

To update a to-do list item from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the to-do list with the item you want to update.
6. From the actions shown for that target, select **Update to-do list item**.
7. Set the **Item name or UID** of the item, and the values you want to change.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Item name or UID:
  description: The name of the item to update. If you have items with the same name, use the item's UID instead. You can find the UID with the Get to-do list items action.
Rename item:
  description: A new name for the item.
  required: false
Set status:
  description: A new status for the item, either not completed or completed.
  required: false
Due date:
  description: The date the item is expected to be completed. Only available on to-do lists that support due dates.
  required: false
Due date and time:
  description: The date and time the item is expected to be completed. Only available on to-do lists that support due dates and times.
  required: false
Description:
  description: A longer description of the item than the name provides. Only available on to-do lists that support descriptions.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `todo.update_item`. A basic example looks like this:

{% example %}
action: |
  action: todo.update_item
  target:
    entity_id: todo.personal_tasks
  data:
    item: Submit income tax return
    status: completed
{% endexample %}

This marks the item named Submit income tax return as completed on `todo.personal_tasks`.

### Options in YAML

{% options_yaml %}
item:
  description: The name of the item to update. If you have items with the same name, use the item's UID instead. You can find the UID with the get_items action.
  required: true
  type: string
rename:
  description: A new name for the item.
  required: false
  type: string
status:
  description: A new status for the item, either needs_action or completed.
  required: false
  type: string
due_date:
  description: The date the item is expected to be completed, such as 2024-04-10. Only on to-do lists that support due dates.
  required: false
  type: string
due_datetime:
  description: The date and time the item is expected to be completed, such as 2024-04-10 23:00:00. Only on to-do lists that support due dates and times.
  required: false
  type: string
description:
  description: A longer description of the item than the name provides. Only on to-do lists that support descriptions.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Set at least one of the fields you want to change, such as a new name or a new status.
- You can set either a due date or a due date and time, but not both.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: mark a daily task as done at the end of the day

At the end of the day, mark a recurring task on your checklist as completed.

- **Trigger**: Time: 23:00
- **Action**: Update to-do list item
  - **Target**: Daily checklist
  - **Item name or UID**: Check the mailbox
  - **Set status**: completed

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Mark the mailbox task as done at the end of the day"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: todo.update_item
      target:
        entity_id: todo.daily_checklist
      data:
        item: Check the mailbox
        status: completed
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
