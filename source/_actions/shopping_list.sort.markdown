---
title: "Sort shopping list items"
action: shopping_list.sort
domain: shopping_list
description: "Sorts all items by name in the shopping list."
related_actions:
  - shopping_list.add_item
  - shopping_list.complete_all
---

Use this action to sort every item on your shopping list by name. A common use is to keep a long list tidy and predictable, so related items end up next to each other and are easier to find while you shop.

{% include actions/ui_header.md %}

To sort the list from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Sort shopping list**.
6. To sort from Z to A instead of A to Z, turn on **Sort reverse**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Sort reverse:
  description: Sort the list in reverse (descending) order, from Z to A. By default, the list is sorted from A to Z.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.sort`. A basic example looks like this:

{% example %}
action: |
  action: shopping_list.sort
{% endexample %}

### Options in YAML

{% options_yaml %}
reverse:
  description: Sort the list in reverse (descending) order, from Z to A. By default, the list is sorted from A to Z.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Good to know

- Sorting orders items by name. It does not separate completed items from items you still need.

{% include actions/stuck.md %}

{% include actions/related.md %}
