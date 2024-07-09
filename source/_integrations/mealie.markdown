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
  - todo
ha_integration_type: service
---


The Mealie integration will fetch data from your [Mealie instance](https://mealie.io/).

## Prerequisites

You create your API token on your Mealie installation:

1. Sign in to Mealie.
2. Go to your user (profile).
3. Go to **Manage Your API Tokens** under (`/user/profile/api-tokens`).
4. Enter a meaningful token name, such as 'Home Assistant'.
5. Select **Generate**.
6. Copy the token that now appears so that you can later paste it into Home Assistant.

{% include integrations/config_flow.md %}

## Available calendars

The integration will create a calendar for every type of meal plan:

- Breakfast
- Lunch
- Dinner
- Side

## Shopping Lists

The integration will create a to-do list for every Mealie shopping list.

## Services

The Mealie integration has the following services:

- `mealie.get_mealplan`
- `mealie.get_recipe`

### Service `mealie.get_mealplan`

Get the meal plan for a specified range.

| Service data attribute | Optional | Description                                              |
|------------------------|----------|----------------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from.      |
| `start_date`           | Yes      | The start date of the meal plan. (today if not supplied) |
| `end_date`             | Yes      | The end date of the meal plan. (today if not supplied)   |

### Service `mealie.get_recipe`

Get the recipe for a specified recipe ID or slug.

| Service data attribute | Optional | Description                                         |
|------------------------|----------|-----------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Mealie config entry to get data from. |
| `recipe_id`            | No       | The ID or the slug of the recipe to get.            |