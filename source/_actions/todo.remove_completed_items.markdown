---
title: "Remove completed to-do list items"
action: todo.remove_completed_items
domain: todo
description: "Removes all completed items from a to-do list."
related_actions:
  - todo.remove_item
  - todo.get_items
---

Use this action to remove all completed items from a to-do list at once, for example to clean up your shopping list after a trip.

{% include actions/ui_header.md %}

To remove completed to-do list items from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the to-do list you want to clean up.
6. From the actions shown for that target, select **Remove completed to-do list items**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `todo.remove_completed_items`. A basic example looks like this:

{% example %}
action: |
  action: todo.remove_completed_items
  target:
    entity_id: todo.personal_tasks
{% endexample %}

This removes all completed items from `todo.personal_tasks`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- To remove a single item by its name or UID, use [Remove to-do list item](/actions/todo.remove_item/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clear your shopping list after you get home

When you arrive home from the store, clear off everything you have already picked up.

- **Trigger**: You arrive home
- **Action**: Remove completed to-do list items
  - **Target**: Shopping list

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Clear completed shopping items when arriving home"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.home
      event: enter
  actions:
    - action: todo.remove_completed_items
      target:
        entity_id: todo.shopping_list
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
