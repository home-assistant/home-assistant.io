---
title: Get recipes
action: mealie.get_recipes
domain: mealie
description: "Search Mealie for recipes that match your search terms."
related_actions:
  - mealie.get_recipe
  - mealie.import_recipe
  - mealie.get_mealplan
---

Use this action to get a list of recipes that match your search terms. You can use it to find a recipe ID or slug. The response includes a brief description of each recipe. To view the full details and steps for a specific recipe, use the [`mealie.get_recipe`](/actions/mealie.get_recipe/) action afterwards.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To search for recipes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Get recipes**.
6. Select the **Mealie instance** you want to use, and fill in the options you want.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Mealie instance instead.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to search.
Search terms:
  description: Search terms on which all the properties of recipes are searched.
  required: false
Result limit:
  description: The maximum number of recipes to return. Defaults to 10.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.get_recipes`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: mealie.get_recipes
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    search_terms: tomato soup
    result_limit: 5
  response_variable: recipes
{% endexample %}

This returns up to five recipes that match "tomato soup" and stores them in the `recipes` response variable.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to search.
  required: true
  type: string
search_terms:
  description: Search terms on which all the properties of recipes are searched.
  required: false
  type: string
result_limit:
  description: The maximum number of recipes to return.
  required: false
  type: integer
  default: 10
{% endoptions_yaml %}

## Response data

The action returns a list of recipes that match the search, each with a brief description. Use the recipe ID or slug from the response with the [`mealie.get_recipe`](/actions/mealie.get_recipe/) action to get the full details.

## Good to know

- The behavior of the search depends on the backend used for Mealie. With a PostgreSQL backend, the search is fuzzy. Otherwise, it is a literal search. For more information, see the [Mealie documentation](https://docs.mealie.io/documentation/getting-started/faq/#what-is-fuzzy-search-and-how-do-i-use-it).

{% include actions/stuck.md %}

{% include actions/related.md %}
