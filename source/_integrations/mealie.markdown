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
---

[Mealie](https://mealie.io/) is an open source, self-hosted recipe manager, meal planner, and shopping list. The Mealie {% term integration %} will fetch and allow you to create and update data held in your Mealie instance.

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
- `mealie.import_recipe`
- `mealie.set_mealplan`
- `mealie.set_random_mealplan`

### Action `mealie.get_mealplan`

Get the meal plan for a specified range.

| Data attribute | Optional | Description                                              |
|------------------------|----------|----------------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from.      |
| `start_date`           | Yes      | The start date of the meal plan. (today if not supplied) |
| `end_date`             | Yes      | The end date of the meal plan. (today if not supplied)   |

### Action `mealie.get_recipe`

Get the recipe for a specified recipe ID or slug.

| Data attribute | Optional | Description                                         |
|------------------------|----------|-----------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from. |
| `recipe_id`            | No       | The ID or the slug of the recipe to get.            |

### Action `mealie.import_recipe`

Import the recipe into Mealie from a URL.

| Data attribute | Optional | Description                                                     |
|------------------------|----------|-----------------------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from.             |
| `url`                  | No       | The URL of the recipe.                                          |
| `include_tags`         | Yes      | Include tags from the website to the recipe. (false by default) |

### Action `mealie.set_mealplan`

Set a mealplan on a specific date.

| Data attribute    | Optional | Description                                         |
|-------------------|----------|-----------------------------------------------------|
| `config_entry_id` | No       | The ID of the Mealie config entry to get data from. |
| `date`            | No       | The date that should be filled.                     |
| `entry_type`      | No       | One of "breakfast", "lunch", "dinner", or "side".    |
| `recipe_id`       | Yes      | The recipe to plan.                                 |
| `note_title`      | Yes      | The title of the meal note.                         |
| `note_text`       | Yes      | The description of the meal note.                   |

### Action `mealie.set_random_mealplan`

Set a random mealplan on a specific date.

| Data attribute    | Optional | Description                                         |
|-------------------|----------|-----------------------------------------------------|
| `config_entry_id` | No       | The ID of the Mealie config entry to get data from. |
| `date`            | No       | The date that should be filled.                     |
| `entry_type`      | No       | One of "breakfast", "lunch", "dinner" or "side".    |

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

## Removing the integration

This integration follows standard integration removal, once the integration is removed you can remove the API token (assuming it was only used by this integration) by going to your Account in the Mealie web interface, then to **Manage Your API Tokens** and deleting the token you created for Home Assistant.

{% include integrations/remove_device_service.md %}
