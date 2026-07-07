---
title: "Complete shopping list item"
action: shopping_list.complete_item
domain: shopping_list
description: "Marks every incomplete item with matching name as completed in the shopping list."
related_actions:
  - shopping_list.incomplete_item
  - shopping_list.complete_all
  - shopping_list.clear_completed_items
---

Use this action to mark an item as completed without removing it from the list. It marks every item whose name matches, so you can tick something off as you put it in your basket while keeping it on the list for next time. Items that are already marked as complete are not updated.

{% include actions/ui_header.md %}

To complete an item from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Complete shopping list item**.
6. Enter the **Name** of the item to mark as completed.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Name:
  description: The name of the item to mark as completed.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.complete_item`. A basic example looks like this:

{% example %}
action: |
  action: shopping_list.complete_item
  data:
    name: "Milk"
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: The name of the item to mark as completed.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action keeps the item on the list. To remove it instead, use [Remove shopping list item](/actions/shopping_list.remove_item/).
- To clear out all completed items at once, use [Clear completed shopping list items](/actions/shopping_list.clear_completed_items/).
- This action triggers a [`shopping_list_updated` event](/integrations/shopping_list/#using-in-automations) with `action` value of `"complete"`.
  Every other action that modifies the status of specific items uses an `action` value of `"update"` instead.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
