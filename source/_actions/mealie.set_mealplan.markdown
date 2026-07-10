---
title: Set a meal plan
action: mealie.set_mealplan
domain: mealie
description: "Plan a recipe or a meal note on a specific date in Mealie."
related_actions:
  - mealie.set_random_mealplan
  - mealie.get_mealplan
  - mealie.get_recipes
---

Use this action to plan a meal on a specific date in Mealie. You can plan either a recipe or a meal note.

This action can optionally return the created meal plan in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To set a meal plan from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Set a meal plan**.
6. Select the **Mealie instance** you want to use, and fill in the options you want.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Mealie instance instead.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to plan the meal on.
Date:
  description: The date to plan the meal on.
Entry type:
  description: The meal type. One of breakfast, lunch, dinner, side, dessert, snack, or drink.
Recipe ID:
  description: The ID or slug of the recipe to plan. Provide either a recipe or a meal note.
  required: false
Meal note title:
  description: The title of the meal note. Provide either a recipe or a meal note.
  required: false
Note text:
  description: The description of the meal note.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.set_mealplan`. A basic example looks like this:

{% example %}
action: |
  action: mealie.set_mealplan
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    date: "2025-06-01"
    entry_type: dinner
    recipe_id: roasted-tomato-soup
{% endexample %}

This plans the `roasted-tomato-soup` recipe for dinner on the given date.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to plan the meal on.
  required: true
  type: string
date:
  description: The date to plan the meal on.
  required: true
  type: string
entry_type:
  description: "The meal type. One of: `breakfast`, `lunch`, `dinner`, `side`, `dessert`, `snack`, or `drink`."
  required: true
  type: string
recipe_id:
  description: The ID or slug of the recipe to plan.
  required: false
  type: string
note_title:
  description: The title of the meal note.
  required: false
  type: string
note_text:
  description: The description of the meal note.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Provide either a recipe to plan (`recipe_id`) or a meal note (`note_title`, optionally with `note_text`).
- To plan a random recipe instead, use the [`mealie.set_random_mealplan`](/actions/mealie.set_random_mealplan/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
