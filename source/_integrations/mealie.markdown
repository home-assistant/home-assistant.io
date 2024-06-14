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

{% include integrations/config_flow.md %}

## Available calendars

The integration will create a calendar for every type of mealplan:
- Breakfast
- Lunch
- Dinner
- Side