---
title: Get shopping list items
action: mealie.get_shopping_list_items
domain: mealie
description: "Get the items on a Mealie shopping list."
related_actions:
  - mealie.get_recipes
  - mealie.get_mealplan
---

Use this action to get the items on a Mealie shopping list, including structured data for labels, units, and food. This is handy when you want to read the list out loud or send it in a notification.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get shopping list items from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Mealie shopping lists you want to read.
6. From the actions shown for that target, select **Get shopping list items**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.get_shopping_list_items`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: mealie.get_shopping_list_items
  target:
    entity_id: todo.mealie_shopping_list
  response_variable: shopping_list
{% endexample %}

This gets the items on the targeted shopping list and stores them in the `shopping_list` response variable.

### Options in YAML

This action has no additional options in YAML.

## Response data

The action returns the items on each shopping list you targeted, including structured data for labels, units, and food.

{% include actions/targets.md domain="todo" %}

## Good to know

- The Mealie shopping lists are exposed as to-do list entities, so you target them like any other to-do list.

{% include actions/stuck.md %}

{% include actions/related.md %}
