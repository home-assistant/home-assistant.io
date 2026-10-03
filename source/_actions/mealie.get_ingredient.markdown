---
title: Get ingredient
action: mealie.get_ingredient
domain: mealie
description: "Get an ingredient from Mealie attempting to match food items, quantity, and units."
related_actions:
  - mealie.get_recipe
  - mealie.get_shopping_list_items
  - todo.add_item
---

Use this action to get an ingredient from Mealie using the recognition method set within options, attempting to find matches in your food items and identify quantities and units.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get an ingredient from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Get meal plan**.
6. Select the **Mealie instance** you want to use, and enter the ingredient you want to get, such as `1 kg bananas`.
7. In the **Response variable** field, enter a name to store the data in, such as `ingredient`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to delete the meal plan on.
Ingredient:
  description: The ingredient to find matches for in your food items and identify quantities and units.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.get_ingredient`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: mealie.get_ingredient
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    ingredient: `1 kg bananas`
    response_variable: ingredient
{% endexample %}

This gets the food, unit, and quantity that matches `1 kg bananas` with the confidence rating of matching accuracy and stores it in the `ingredient` response variable.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to search.
  required: true
  type: string
ingredient:
  description: The ingredient to find matches for in your food items and identify quantities and units.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns the items on each shopping list you targeted, including structured data for labels, units, and food.

{% include actions/targets.md domain="todo" %}

## Good to know

- The confidence includes an `acceptable_confidence` boolean indicating if the ingredient confidence is high enough to be added as an ingredient with the add item action on a Mealie to-do list, rather than a note.

{% include actions/stuck.md %}

{% include actions/related.md %}
