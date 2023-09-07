---
title: PowerPlanner
description: Instructions on how to integrate your PowerPlannes plans with Home Assistant.
ha_category:
  - Binary Sensor
  - Button
ha_release: 0.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gurgelx'
ha_domain: powerplanner
ha_platforms:
  - binary_sensor
  - button
ha_integration_type: integration
---


[PowerPlanner](https://www.powerplanner.se/) Is a service to create optimized power usage plans depending on power need and price.

The current features within Home Assistant:

- Binary Sensors for each plan
- Automatic synchronization with powerplanner.se
- Manual synchronization (If you want to see any plan changes instant)
- Offline cache, keeps your plans cached if the api or your internet goes down temporarily.

## Prerequisites

You will need an account on PowerPlanner and 1 or more power plans.

- [Create an account](https://www.powerplanner.se/signup)

## API key

To add the integration you need to get the API key.

1. Login on [PowerPlanner](https://www.powerplanner.se/).
2. Click on your name to open the menu-
3. Select API.
4. Copy the API key.
5. Paste the API key in the prompt when adding the Integration on Home Assistant.

{% include integrations/config_flow.md %}