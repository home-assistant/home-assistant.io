---
title: Mealie
description: Instructions on how to set up Mealie devices in Home Assistant.
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

Mealie instances version 3.2 and later are supported.

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

The integration will create a {% term calendar %} for every type of meal plan, which are updated once an hour:

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

{% include integrations/actions.md %}

## Known limitations

- When editing a food item within the shopping list the item will be converted to a note style item.

## Troubleshooting

If you are using the Mealie app for Home Assistant (formerly known as Mealie add-on), use the direct URL with port number (default 9090) for the Mealie web page. Do not use the ingress URL that ends with /xxx_mealie.

Before reporting an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and restart the integration. As soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, _if still possible_, download the {% term diagnostics %} data. If you have collected the debug log and the diagnostics data, include them in the issue report.

## Removing the integration

This integration follows standard integration removal, once the integration is removed you can remove the API token (assuming it was only used by this integration) by going to your Account in the Mealie web interface, then to **Manage Your API Tokens** and deleting the token you created for Home Assistant.

{% include integrations/remove_device_service.md %}
