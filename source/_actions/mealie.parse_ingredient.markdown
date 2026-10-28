---
title: Parse ingredient
action: mealie.parse_ingredient
domain: mealie
description: "Parses an ingredient from Mealie attempting to match food items, quantity, and units."
related_actions:
  - mealie.add_ingredient
  - mealie.get_recipe
  - mealie.get_shopping_list_items
  - todo.add_item
---

Use this action to parse an ingredient from Mealie using the recognition method set within options, attempting to find matches in your food items and identify quantities and units.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To parse an ingredient from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Parse ingredient**.
6. Select the **Mealie instance** you want to use, and enter the ingredient you want to parse, such as `1 kg bananas`.
7. In the **Response variable** field, enter a name to store the data in, such as `ingredient`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to parse the ingredient from.
Ingredient:
  description: The ingredient to find matches for in your food items and identify quantities and units.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.parse_ingredient`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: mealie.parse_ingredient
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    ingredient: "1 kg bananas"
  response_variable: ingredient
{% endexample %}

This parses the food, unit, and quantity that matches `1 kg bananas` with the confidence rating of matching accuracy and stores it in the `ingredient` response variable.

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

## Response data

The action returns the parsed ingredient, how confident Mealie is about the match, and the text you sent. The most useful keys are:
- `input`: The text you sent, such as `1 kg bananas`.
- `ingredient.quantity`: The quantity, such as `1.0`.
- `ingredient.unit.name`: The unit, such as `kg`.
- `ingredient.food.name`: The matched food, such as `bananas`.
- `ingredient.display`: The full ingredient as Mealie displays it.
- `confidence.average`: How confident Mealie is about the match, from `0` to `1`.
- `confidence.acceptable_confidence`: `true` if the confidence is high enough for Mealie to-do lists to add the item as a food instead of a note.

## Good to know

- The action uses the **Recognition method** set in the Mealie integration options.
- `acceptable_confidence` uses the same check as Mealie to-do lists. When **Recognize food in new items** is turned on, an item would be added as a food with a separate quantity and unit only if `acceptable_confidence` is `true`. Otherwise, it would be added as a note.
- If Mealie can't parse the text at all, the action fails with the message "Mealie could not parse the ingredient."

{% include actions/stuck.md %}

{% include actions/related.md %}
