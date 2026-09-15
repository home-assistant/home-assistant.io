---
title: "Incomplete all shopping list items"
action: shopping_list.incomplete_all
domain: shopping_list
description: "Marks all items as incomplete in the shopping list."
related_actions:
  - shopping_list.complete_all
  - shopping_list.incomplete_item
---

Use this action to mark every item on your shopping list as incomplete at once. A common use is to reset a recurring list, for example a weekly groceries list, so all the items are active again.

{% include actions/ui_header.md %}

To mark all items as incomplete from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Incomplete all shopping list items**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.incomplete_all`. It takes no options:

{% example %}
action: |
  action: shopping_list.incomplete_all
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- This is the counterpart of [Complete all shopping list items](/actions/shopping_list.complete_all/).

{% include actions/stuck.md %}

{% include actions/related.md %}
