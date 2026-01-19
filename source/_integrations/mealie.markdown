---
title: Mealie
description: Instructions on how to setup Mealie devices in Home Assistant.
ha_category:
  - Calendar
  - To-do list
ha_config_flow: true
ha_release: 2024.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@joostlek'
  - '@andrew-codechimp'
ha_domain: mealie
ha_platforms:
  - calendar
  - diagnostics
  - sensor
  - todo
ha_integration_type: service
ha_quality_scale: platinum
---

[Mealie](https://mealie.io/) is an open source, self-hosted recipe manager, meal planner, and shopping list. The Mealie {% term integration %} will fetch and allow you to create and update data held in your Mealie instance.

## Use cases

- View your upcoming meal plans in the calendars.
- Use automations or your voice assistant to add items to a shopping list.
- Use [zone presence-detection](/getting-started/presence-detection/) to remind you when you approach a store that you have items on your shopping list to pick up.
- Search for a recipe by ingredient.

## Supported versions

Mealie instances version 2 and later are supported.

## Prerequisites

You create your API token on your Mealie installation:

1. Sign in to Mealie.
2. Go to your user (profile).
3. Go to **Manage Your API Tokens** under (`/user/profile/api-tokens`).
4. Enter a meaningful token name, such as 'Home Assistant'.
5. Select **Generate**.
6. Copy the token that now appears so that you can later paste it into Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of your Mealie installation.
API token:
  description: The API token for your Mealie installation you generated in the prerequisites.
Verify SSL certificate:
  description: Enable this unless you are using a self-signed certificate on your Mealie installation.
{% endconfiguration_basic %}

## Available calendars

The integration will create a calendar for every type of meal plan, which are updated once an hour:

- Breakfast
- Lunch
- Dinner
- Side
- Dessert
- Drink
- Snack

## Shopping Lists

The integration will create a to-do list for every Mealie shopping list, which are updated every 5 minutes.

## Sensors

The integration provides the following sensors for the statistics, which are updated every 15 minutes:

- number of recipes
- categories (such as beverage, dessert, Italian, seafood)
- tags (such as alcohol)
- tools (such as instant pot, air fryer, or BBQ)
- users

## Actions

The Mealie integration has the following actions:

- `mealie.get_mealplan`
- `mealie.get_recipe`
- `mealie.get_recipes`
- `mealie.import_recipe`
- `mealie.set_mealplan`
- `mealie.set_random_mealplan`

### Action: Get meal plan

The `mealie.get_mealplan` action gets the meal plan for a specified range.

| Data attribute | Optional | Description                                              |
|------------------------|----------|----------------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from.      |
| `start_date`           | Yes      | The start date of the meal plan. (today if not supplied) |
| `end_date`             | Yes      | The end date of the meal plan. (today if not supplied)   |

### Action: Get recipe

The `mealie.get_recipe` action gets the recipe for a specified recipe ID or slug.

| Data attribute | Optional | Description                                         |
|------------------------|----------|-----------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from. |
| `recipe_id`            | No       | The ID or the slug of the recipe to get.            |

### Action: Get recipes

The `mealie.get_recipes` action gets a list of recipes that match your search terms. You can use this action to find the recipe ID or slug. The response includes a brief description of each recipe. To view full details and steps for a specific recipe, use the `mealie.get_recipe` action afterwards.

Please note the behavior of the search function depends on the backend used for Mealie (see [documentation](https://docs.mealie.io/documentation/getting-started/faq/#what-is-fuzzy-search-and-how-do-i-use-it)). In the case of postgresql backend, the search will be fuzzy, otherwise it will be literal.

| Data attribute    | Optional | Description                                                                 |
|-------------------|----------|-----------------------------------------------------------------------------|
| `config_entry_id` | No       | The ID of the Mealie config entry to get data from.                         |
| `search_terms`    | Yes      | Search terms on which all the properties of recipes are searched.           |
| `result_limit`    | Yes      | The maximum number of recipes to return.                                    |

### Action: Import recipe

The `mealie.import_recipe` action imports a recipe into Mealie from a URL.

| Data attribute | Optional | Description                                                     |
|------------------------|----------|-----------------------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from.             |
| `url`                  | No       | The URL of the recipe.                                          |
| `include_tags`         | Yes      | Include tags from the website to the recipe. (false by default) |

### Action: Set meal plan

The `mealie.set_mealplan` action sets a meal plan on a specific date.

| Data attribute    | Optional | Description                                                                    |
|-------------------|----------|--------------------------------------------------------------------------------|
| `config_entry_id` | No       | The ID of the Mealie config entry to get data from.                            |
| `date`            | No       | The date that should be filled.                                                |
| `entry_type`      | No       | One of "breakfast", "lunch", "dinner", "side", "drink", "dessert", or "snack".  |
| `recipe_id`       | Yes      | The recipe to plan.                                                            |
| `note_title`      | Yes      | The title of the meal note.                                                    |
| `note_text`       | Yes      | The description of the meal note.                                              |

### Action: Set random meal plan

The `mealie.set_random_mealplan` action sets a random meal plan on a specific date.

| Data attribute    | Optional | Description                                                                    |
|-------------------|----------|--------------------------------------------------------------------------------|
| `config_entry_id` | No       | The ID of the Mealie config entry to get data from.                            |
| `date`            | No       | The date that should be filled.                                                |
| `entry_type`      | No       | One of "breakfast", "lunch", "dinner", "side", "drink", "dessert", or "snack".  |

{% tip %}
You can get your `config_entry_id` by using actions within [Developer Tools](/docs/tools/dev-tools/), using one of the above actions and viewing the YAML.
{% endtip %}

## Examples

{% details "Example template sensor using get_mealplan" %}

Example template sensor that contains today's dinner meal plan entries:

{% raw %}

```yaml
template:
  - triggers:
      - trigger: time_pattern
        hours: /1
    actions:
      - action: mealie.get_mealplan
        data:
          config_entry_id: YOUR_MEALIE_CONFIG_ENTITY_ID
        response_variable: result
    sensor:
      - name: "Dinner today"
        unique_id: mealie_dinner_today
        state: >
          {% for meal in result.mealplan if meal.entry_type == "dinner" -%}
          {{ meal.recipe['name'] if meal.recipe is not none else meal.title -}}
          {{ ", " if not loop.last }}
          {%- endfor %}
```

{% endraw %}

{% enddetails %}

## Known limitations

- When editing a food item within the shopping list the item will be converted to a note style item.

## Troubleshooting

If you are using the Mealie add-on, use the direct URL with port number (default 9090) for the Mealie web page. Do not use the ingress URL that ends with /xxx_mealie.

Before reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration. As soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, _if still possible_, download the {% term diagnostics %} data. If you have collected the debug log and the diagnostics data, include them in the issue report.

## Removing the integration

This integration follows standard integration removal, once the integration is removed you can remove the API token (assuming it was only used by this integration) by going to your Account in the Mealie web interface, then to **Manage Your API Tokens** and deleting the token you created for Home Assistant.

{% include integrations/remove_device_service.md %}
