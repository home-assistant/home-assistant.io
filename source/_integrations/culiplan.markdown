---
title: Culiplan
description: Use your Culiplan meal-planning account inside Home Assistant.
ha_category:
  - Binary sensor
  - Calendar
  - Sensor
  - To-do list
ha_release: 2026.7
ha_iot_class: Cloud Push
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@culiplan'
ha_domain: culiplan
ha_platforms:
  - binary_sensor
  - calendar
  - diagnostics
  - sensor
  - todo
ha_integration_type: service
---

[Culiplan](https://culiplan.com/) is a cloud meal-planning service that helps households plan recipes, keep a pantry, and generate shopping lists.

The Culiplan {% term integration %} surfaces your meal plan, shopping list and pantry inside Home Assistant, and registers a Large Language Model (LLM) API so Conversation Agents (such as the OpenAI or Google Generative AI conversation integrations) can answer meal-planning questions and take actions on your behalf.

## Prerequisites

A Culiplan account is required. You can create one for free at [culiplan.com](https://culiplan.com/).

The integration uses OAuth2 with PKCE for authentication. No client credentials, API keys or self-hosted setup are required.

{% include integrations/config_flow.md %}

## Data updates

Culiplan uses a hybrid model:

- A persistent Socket.IO connection pushes meal-plan and shopping-list changes in real time.
- A REST poll runs every 5 minutes as a safety net to recover from missed events.

## Entities

The integration creates the following entities per Culiplan account:

### Calendar

- `calendar.culiplan_meal_plan` - Upcoming planned meals. Each event corresponds to a meal slot (breakfast, lunch, dinner, etc.) with the recipe title as the event summary.

### To-do list

- `todo.culiplan_shopping_list` - Your active shopping list. Items can be added, completed and removed from Home Assistant and changes sync back to Culiplan.

### Sensors

- `sensor.culiplan_planned_meals_this_week` - Number of meals planned in the current week.
- `sensor.culiplan_shopping_list_open_items` - Number of unchecked items on the shopping list.
- `sensor.culiplan_pantry_items` - Number of items currently tracked in your pantry.

### Binary sensor

- `binary_sensor.culiplan_connected` - Indicates whether the Socket.IO push channel is currently connected.

## LLM API

When the integration is configured, it registers an LLM API named **Culiplan** via Home Assistant's LLM helper. Any Conversation Agent that supports LLM APIs (for example `openai_conversation`, `google_generative_ai_conversation`, `anthropic`) can be pointed at this API to give the assistant the following tools:

- Look up upcoming planned meals.
- Search the user's recipe library.
- Read and modify the active shopping list.
- Read the pantry.
- Schedule a recipe into the meal plan.

To use it, open the configuration of your Conversation Agent and select **Culiplan** as the LLM API.

## Reauthentication

If your Culiplan refresh token expires or is revoked, Home Assistant will start a reauthentication flow. Open **Settings** > **Devices & services**, locate Culiplan, and follow the instructions to sign in again.

{% include integrations/option_flow.md %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removal, Home Assistant will no longer hold any Culiplan tokens. You may also revoke the Home Assistant connection from your Culiplan account settings.

## Known limitations

- The pantry sensor and pantry LLM tool are capped at the first 100 items per account.
- When more than one Culiplan account is configured, the LLM API is routed to the first configured entry.
