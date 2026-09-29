---
title: "Incomplete shopping list item"
action: shopping_list.incomplete_item
domain: shopping_list
description: "Marks the first item with matching name as incomplete in the shopping list."
related_actions:
  - shopping_list.complete_item
  - shopping_list.incomplete_all
---

Use this action to mark a completed item as incomplete again. It marks the first item whose name matches, so it is useful when you need to buy something again that you had already ticked off.

{% include actions/ui_header.md %}

To mark an item as incomplete from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Incomplete shopping list item**.
6. Enter the **Name** of the item to mark as incomplete.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Name:
  description: The name of the item to mark as incomplete.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.incomplete_item`. A basic example looks like this:

{% example %}
action: |
  action: shopping_list.incomplete_item
  data:
    name: "Milk"
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: The name of the item to mark as incomplete.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This is the counterpart of [Complete shopping list item](/actions/shopping_list.complete_item/).
- To mark every item as incomplete at once, use [Incomplete all shopping list items](/actions/shopping_list.incomplete_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
