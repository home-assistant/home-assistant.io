---
title: "Get to-do list items"
action: todo.get_items
domain: todo
description: "Gets the items on a to-do list."
related_actions:
  - todo.add_item
  - todo.update_item
  - todo.remove_item
---

Use this action to get the items on a to-do list, for example to read them out loud or send them in a notification.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get to-do list items from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the to-do list you want to read.
6. From the actions shown for that target, select **Get to-do list items**.
7. Set the **Status** if you only want items with a specific status.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Status:
  description: Only return to-do items with the selected statuses, either not completed or completed. Returns not completed items by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `todo.get_items`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: todo.get_items
  target:
    entity_id: todo.vacation_preparation
  data:
    status: needs_action
  response_variable: todo_items
{% endexample %}

This returns all items on `todo.vacation_preparation` that have not been completed.

### Options in YAML

{% options_yaml %}
status:
  description: Only return to-do items with the given status or statuses, either `needs_action` or `completed`. Returns `needs_action` items by default.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The action returns the matching items for each to-do list you targeted. The response is keyed by the to-do list, with an `items` list. Each item includes the following fields:

- `summary`: The name of the to-do item.
- `uid`: A unique identifier for the item, which you can use to reference it in other actions.
- `status`: Whether the item is `completed` or still `needs_action`.
- `due`: The due date or date and time, if the item has one.
- `description`: A longer description of the item, if it has one.

A shortened example of the response looks like this:

```yaml
todo.vacation_preparation:
  items:
    - summary: Water the plants
      uid: 01244b28-e604-11ee-a0a4-e45f0197c057
      status: needs_action
    - summary: Turn down the heating
      uid: ae993df4-e604-11ee-a0a4-e45f0197c057
      status: needs_action
```

## Good to know

- The `status` field accepts a single status or a list of statuses. The available statuses are `needs_action` and `completed`.

{% include actions/stuck.md %}

{% include actions/related.md %}
