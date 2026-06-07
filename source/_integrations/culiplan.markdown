---
title: Culiplan
description: Use your Culiplan meal-planning account inside Home Assistant.
ha_category:
  - Calendar
ha_release: 2026.7
ha_iot_class: Cloud Push
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@culiplan'
ha_domain: culiplan
ha_platforms:
  - calendar
  - diagnostics
ha_integration_type: service
---

[Culiplan](https://culiplan.com/) is a cloud meal-planning service that helps households plan recipes, keep a pantry, and generate shopping lists.

The Culiplan {% term integration %} surfaces your meal plan inside Home Assistant, and registers a Large Language Model (LLM) API so Conversation Agents (such as the OpenAI or Google Generative AI conversation integrations) can answer meal-planning questions and take actions on your behalf.

## Prerequisites

A Culiplan account is required. You can create one for free at [culiplan.com](https://culiplan.com/).

The integration uses OAuth2 with PKCE for authentication. No client credentials, API keys or self-hosted setup are required.

{% include integrations/config_flow.md %}

## Data updates

Culiplan uses a hybrid model:

- A persistent Socket.IO connection pushes meal-plan updates in real time.
- A REST poll runs every 5 minutes as a safety net to recover from missed events.

## Entities

The integration creates the following entity per Culiplan account:

### Calendar

- `calendar.culiplan_meal_plan` - Upcoming planned meals. Each event corresponds to a meal slot (breakfast, lunch, dinner, etc.) with the recipe title as the event summary.

Additional entities (shopping list todo, pantry/meals sensors, and an expiring-pantry binary sensor) will be added as the matching platform follow-up PRs land in Home Assistant Core.

## LLM API

When the integration is configured, it registers an LLM API named **Culiplan** via Home Assistant's LLM helper. Any Conversation Agent that supports LLM APIs (for example `openai_conversation`, `google_generative_ai_conversation`, `anthropic`) can be pointed at this API to give the assistant the following tools:

- Look up the current meal plan (optionally filtered by date).
- Add an item to the active shopping list.
- Read the pantry (optionally filtered to items expiring soon).
- Search recipes by a list of ingredients.
- Fetch a single recipe by id.

To use it, open the configuration of your Conversation Agent and select **Culiplan** as the LLM API.

## Reauthentication

If your Culiplan refresh token expires or is revoked, Home Assistant will start a reauthentication flow. Open **Settings** > **Devices & services**, locate Culiplan, and follow the instructions to sign in again.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removal, Home Assistant will no longer hold any Culiplan tokens. You may also revoke the Home Assistant connection from your Culiplan account settings.
