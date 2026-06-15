---
title: Get recipe
action: mealie.get_recipe
domain: mealie
description: "Get a Mealie recipe by its ID or slug."
related_actions:
  - mealie.get_recipes
  - mealie.import_recipe
  - mealie.get_mealplan
---

Use this action to get a recipe from Mealie by its ID or slug. The response includes the full details and steps for the recipe.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a recipe from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Get recipe**.
6. Select the **Mealie instance** you want to use, and set the recipe ID or slug.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Mealie instance instead.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to get the recipe from.
Recipe ID or slug:
  description: The ID or the slug of the recipe to get.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.get_recipe`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: mealie.get_recipe
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    recipe_id: roasted-tomato-soup
  response_variable: recipe
{% endexample %}

This gets the recipe with the slug `roasted-tomato-soup` and stores it in the `recipe` response variable.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to get the recipe from.
  required: true
  type: string
recipe_id:
  description: The ID or the slug of the recipe to get.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns the full details and steps of the requested recipe.

## Good to know

- To find the ID or slug of a recipe, use the [`mealie.get_recipes`](/actions/mealie.get_recipes/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
