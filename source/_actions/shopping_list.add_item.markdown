---
title: "Add shopping list item"
action: shopping_list.add_item
domain: shopping_list
description: "Adds an item to the shopping list."
related_actions:
  - shopping_list.remove_item
  - shopping_list.complete_item
  - shopping_list.clear_completed_items
---

Use this action to add an item to your shopping list. A common use is to add something automatically when Home Assistant notices you are running low, for example adding batteries to the list when a device reports a low battery.

{% include actions/ui_header.md %}

To add an item from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Add shopping list item**.
6. Enter the **Name** of the item to add.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Name:
  description: The name of the item to add.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `shopping_list.add_item`. A basic example looks like this:

{% example %}
action: |
  action: shopping_list.add_item
  data:
    name: "Milk"
{% endexample %}

### Options in YAML

{% options_yaml %}
name:
  description: The name of the item to add.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The item is added to the single shopping list that this integration provides.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: add batteries when a device runs low

Add batteries to your shopping list automatically when a device reports a low battery level.

- **Trigger**: A battery level drops below 10%
- **Action**: Add shopping list item

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Buy batteries when the remote is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.remote_battery
      below: 10
  actions:
    - action: shopping_list.add_item
      data:
        name: "Batteries"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
