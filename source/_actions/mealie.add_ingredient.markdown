---
title: Add ingredient
action: mealie.add_ingredient
domain: mealie
description: "Adds an ingredient to Mealie."
related_actions:
  - mealie.get_recipe
  - mealie.get_shopping_list_items
  - mealie.parse_ingredient
  - todo.add_item
---

Use this action to add an ingredient to Mealie.

{% include actions/ui_header.md %}

To add an ingredient from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Add ingredient**.
6. Select the **Mealie To-Do list** you want to use, and enter the ingredient you want to add, you can provide a food_id and unit_id available from the responses of the **get_recipe** or **parse_ingredient** actions, or supply a note only.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Target:
  description: The Mealie shopping list to add the ingredient to.
Food ID:
  description: The food ID to add, if omitted a note must be added.
  required: false
Note:
  description: The note to add, if omitted a food ID must be added.
  required: false
Unit ID:
  description: The unit ID add, if omitted no unit will be added.
  required: false
Quantity:
  description: The quantity to add, if omitted no quantity will be added.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.add_ingredient`.

{% example %}
action: |
  action: mealie.add_ingredient
  target:
    entity_id: todo.YOUR_MEALIE_SHOPPING_LIST
  data:
    food_id: "A_VALID_FOOD_ID"
    unit_id: "A_VALUD_UNIT_ID"
    quantity: 2
    note: "Good brand"
{% endexample %}

This adds the food, note, unit, and quantity to the shopping list, if food ID or unit ID are not valid an error will be raised.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to parse the ingredient from.
  required: true
  type: string
ingredient:
  description: The ingredient to find matches for in your food items and identify quantities and units.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- If the food ID or unit ID are not valid within Mealie the action fails with the message "An error occurred adding an item to YOUR_GROCERY_LIST."

{% include actions/stuck.md %}

{% include actions/related.md %}
