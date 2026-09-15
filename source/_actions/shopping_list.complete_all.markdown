---
title: "Complete all shopping list items"
action: shopping_list.complete_all
domain: shopping_list
description: "Marks all items as completed in the shopping list."
related_actions:
  - shopping_list.incomplete_all
  - shopping_list.complete_item
  - shopping_list.clear_completed_items
---

Use this action to mark every item on your shopping list as completed at once, without removing them from the list. A common use is to tick off the whole list after you finish shopping, ready to clear it later.

{% include actions/ui_header.md %}

To complete all items from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Complete all shopping list items**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.complete_all`. It takes no options:

{% example %}
action: |
  action: shopping_list.complete_all
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- The items stay on the list. To remove the completed ones afterwards, use [Clear completed shopping list items](/actions/shopping_list.clear_completed_items/).

{% include actions/stuck.md %}

{% include actions/related.md %}
