---
title: Mealie
description: Instructions on how to setup Mealie devices in Home Assistant.
ha_category:
  - Calendar
ha_config_flow: true
ha_release: 2024.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@joostlek'
ha_domain: mealie
ha_platforms:
  - calendar
ha_integration_type: integration
---


The Mealie integration will fetch data from your [Mealie instance](https://mealie.io/).

## Getting an API token

You create your API token on your Mealie installation:

1. Sign in to Mealie
2. Go to your user (profile)
3. Go to Manage Your API Tokens (`/user/profile/api-tokens`)
4. Enter a meaningful token name, such as 'Home Assistant'
5. Click _Generate_
6. Copy the token that now appears
7. Paste the token into Home Assistant

{% include integrations/config_flow.md %}

## Available calendars

The integration will create a calendar for every type of meal plan:

- Breakfast
- Lunch
- Dinner
- Side
