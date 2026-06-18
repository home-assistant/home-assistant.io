---
title: Import recipe
action: mealie.import_recipe
domain: mealie
description: "Import a recipe into Mealie from a URL."
related_actions:
  - mealie.get_recipe
  - mealie.get_recipes
---

Use this action to import a recipe into Mealie from a URL.

This action can optionally return the imported recipe in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To import a recipe from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Import recipe**.
6. Select the **Mealie instance** you want to use, and set the recipe URL.
7. In the **Response variable** field, enter a name to store the data in, such as `imported_recipe`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Mealie instance instead.

### Options in the UI

{% options_ui %}
Mealie instance:
  description: The Mealie instance to import the recipe into.
URL to the recipe:
  description: The URL of the recipe to import.
Include tags:
  description: Include the tags from the website with the recipe.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.import_recipe`. A basic example looks like this:

{% example %}
action: |
  action: mealie.import_recipe
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    url: "https://example.com/recipes/roasted-tomato-soup"
{% endexample %}

This imports the recipe from the given URL into Mealie.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Mealie config entry to import the recipe into.
  required: true
  type: string
url:
  description: The URL of the recipe to import.
  required: true
  type: string
include_tags:
  description: Include the tags from the website with the recipe.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

## Response data

This action optionally returns the imported recipe. To capture it, set a `response_variable` when you call the action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
