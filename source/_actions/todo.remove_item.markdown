---
title: "Remove to-do list item"
action: todo.remove_item
domain: todo
description: "Removes an item from a to-do list."
related_actions:
  - todo.get_items
  - todo.remove_completed_items
  - todo.update_item
---

Use this action to remove an item from a to-do list by its name or UID.

{% include actions/ui_header.md %}

To remove a to-do list item from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the to-do list with the item you want to remove.
6. From the actions shown for that target, select **Remove to-do list item**.
7. Set the **Item name or UID** of the item you want to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Item name or UID:
  description: The name of the item to remove. If you have items with the same name, use the item's UID instead. You can find the UID with the [Get to-do list items](/actions/todo.get_items/) action.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `todo.remove_item`. A basic example looks like this:

{% example %}
action: |
  action: todo.remove_item
  target:
    entity_id: todo.personal_tasks
  data:
    item: "Submit income tax return"
{% endexample %}

This removes the item named Submit income tax return from `todo.personal_tasks`.

### Options in YAML

{% options_yaml %}
item:
  description: The name of the item to remove. If you have items with the same name, use the item's UID instead. You can find the UID with the `todo.get_items` action.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- To remove all completed items at once, use [Remove completed to-do list items](/actions/todo.remove_completed_items/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clean up a temporary task when guests leave

When your guests leave, remove a temporary task from the household list.

- **Trigger**: Guest mode turned off
- **Action**: Remove to-do list item
  - **Target**: Household list
  - **Item name or UID**: Prepare guest room

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Remove the guest room task when guests leave"
  triggers:
    - trigger: state
      entity_id: input_boolean.guest_mode
      to: "off"
  actions:
    - action: todo.remove_item
      target:
        entity_id: todo.household_list
      data:
        item: "Prepare guest room"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
