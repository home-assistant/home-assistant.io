---
title: Airthings
description: Instructions on how to integrate Airthings into Home Assistant.
ha_category:
  - Sensor
  - Environment
ha_release: '2021.10'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: airthings
ha_config_flow: true
ha_platforms:
  - sensor
---

Integrates Airthings sensors into Home Assistant.

[Airthings](https://www.airthings.com/) provide different sensors for measuring the air quality. The focus specially on Radon sensors.

Login [here](https://dashboard.airthings.com/integrations/api-integration) to find your credentials.

{% include integrations/config_flow.md %}
