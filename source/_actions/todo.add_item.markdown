---
title: "Add to-do list item"
action: todo.add_item
domain: todo
description: "Adds a new item to a to-do list."
related_actions:
  - todo.get_items
  - todo.update_item
  - todo.remove_item
---

Use this action to add a new item to a to-do list, for example to add something to your shopping list from an automation.

{% include actions/ui_header.md %}

To add a to-do list item from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the to-do list you want to add to.
6. From the actions shown for that target, select **Add to-do list item**.
7. Set the **Item name** and any other options you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Item name:
  description: The name of the to-do item.
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

In YAML, refer to this action as `todo.add_item`. A basic example looks like this:

{% example %}
action: |
  action: todo.add_item
  target:
    entity_id: todo.personal_tasks
  data:
    item: Submit income tax return
    due_date: "2024-04-10"
    description: Collect all the documents and submit the final return.
{% endexample %}

This adds an item with a due date and a description to `todo.personal_tasks`.

### Options in YAML

{% options_yaml %}
item:
  description: The name of the to-do item.
  required: true
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

- You can set either a due date or a due date and time, but not both.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add a reminder to your list when you leave work

When you leave work, add a reminder to pick up groceries to your shopping list.

- **Trigger**: You leave the work zone
- **Action**: Add to-do list item
  - **Target**: Shopping list
  - **Item name**: Pick up groceries

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Add a groceries reminder when leaving work"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.work
      event: leave
  actions:
    - action: todo.add_item
      target:
        entity_id: todo.shopping_list
      data:
        item: Pick up groceries
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
