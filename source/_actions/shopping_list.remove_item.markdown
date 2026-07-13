---
title: "Remove shopping list item"
action: shopping_list.remove_item
domain: shopping_list
description: "Removes the first item with matching name from the shopping list."
related_actions:
  - shopping_list.add_item
  - shopping_list.complete_item
  - shopping_list.clear_completed_items
---

Use this action to remove an item from your shopping list. It removes the first item whose name matches, so it is handy for taking something off the list once you no longer need it.

{% include actions/ui_header.md %}

To remove an item from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Remove shopping list item**.
6. Enter the **Name** of the item to remove.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Name:
  description: The name of the item to remove.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.remove_item`. A basic example looks like this:

{% example %}
action: |
  action: shopping_list.remove_item
  data:
    name: "Milk"
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: The name of the item to remove.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- If more than one item has the same name, only the first match is removed.
- To take an item off the list but keep a record of it, use [Complete shopping list item](/actions/shopping_list.complete_item/) instead.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
