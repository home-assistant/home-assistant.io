---
title: Set random meal plan
action: mealie.set_random_mealplan
domain: mealie
description: "Plan a random recipe on a specific date in Mealie."
related_actions:
  - mealie.set_mealplan
  - mealie.get_mealplan
---

Use this action to plan a random recipe on a specific date in Mealie.

This action can optionally return the created meal plan in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To set a random meal plan from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mealie: Set random meal plan**.
6. Select the **Mealie instance** you want to use, and set the date and meal type.
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
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mealie.set_random_mealplan`. A basic example looks like this:

{% example %}
action: |
  action: mealie.set_random_mealplan
  data:
    config_entry_id: YOUR_MEALIE_CONFIG_ENTRY_ID
    date: "2025-06-01"
    entry_type: dinner
{% endexample %}

This plans a random recipe for dinner on the given date.

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
{% endoptions_yaml %}

## Good to know

- To plan a specific recipe or a meal note instead, use the [`mealie.set_mealplan`](/actions/mealie.set_mealplan/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
