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
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Mealie shopping lists you want to add the ingredient to.
6. From the actions shown for that target, under **Mealie**, select **Add ingredient**.
7. Enter the ingredient you want to add. You can provide a **Food ID** and **Unit ID** available from the responses of the [`Get recipe`](/actions/mealie.get_recipe/) or [`Parse ingredient`](/actions/mealie.parse_ingredient/) actions, or supply a note only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Food ID:
  description: The food ID to add. If omitted, a note must be added.
  required: false
Note:
  description: The note to add. If omitted, a food ID must be added.
  required: false
Unit ID:
  description: The unit ID to add. If omitted, no unit will be added.
  required: false
Quantity:
  description: The quantity to add. If omitted, the quantity will be set to 0.
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
    unit_id: "A_VALID_UNIT_ID"
    quantity: 2
    note: "Good brand"
{% endexample %}

This adds the food, note, unit, and quantity to the shopping list. If the food ID or unit ID is invalid, an error will be raised.

### Options in YAML

{% options_yaml %}
food_id:
  description: The Mealie food ID to add. Required if no note is provided.
  required: false
  type: string
unit_id:
  description: The Mealie unit ID to use for the quantity.
  required: false
  type: string
quantity:
  description: The quantity of the ingredient. Defaults to 0 if omitted.
  required: false
  type: float
note:
  description: A note for the ingredient. Required if no food ID is provided.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="todo" %}

## Good to know

- If the food ID or unit ID is invalid in Mealie, the action fails with the message "An error occurred adding an item to YOUR_GROCERY_LIST."
- If neither a food ID nor a note is specified, the action fails with the message "Provide a food ID or a note to add an ingredient."

{% include actions/stuck.md %}

{% include actions/related.md %}
