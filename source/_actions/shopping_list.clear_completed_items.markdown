---
title: "Clear completed shopping list items"
action: shopping_list.clear_completed_items
domain: shopping_list
description: "Removes completed items from the shopping list."
related_actions:
  - shopping_list.complete_item
  - shopping_list.complete_all
---

Use this action to remove all completed items from your shopping list, leaving only the items you still need. A common use is to tidy up the list automatically after a shopping trip.

{% include actions/ui_header.md %}

To clear completed items from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Clear completed shopping list items**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.clear_completed_items`. It takes no options:

{% example %}
action: |
  action: shopping_list.clear_completed_items
{% endexample %}

### Options in YAML

This action has no options.

{% include actions/more_examples.md %}

### Automation: clean up the list when you leave the store

Clear the items you ticked off as soon as you leave the supermarket, so your list is ready for next time.

- **Trigger**: You leave the supermarket zone
- **Action**: Clear completed shopping list items

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Tidy shopping list after shopping"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.supermarket
      event: leave
  actions:
    - action: shopping_list.clear_completed_items
{% endexample %}

{% enddetails %}

## Good to know

- Only completed items are removed. Items you have not ticked off stay on the list.

{% include actions/stuck.md %}

{% include actions/related.md %}
