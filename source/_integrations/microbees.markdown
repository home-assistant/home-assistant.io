---
title: microBees
description: Instructions on how to integrate microBees devices into Home Assistant.
ha_category:
  - Switch
  - Climate
  - Cover
  - Button
  - Cover
  - Light
  - Sensor
  - Switch
ha_release: 2024.3
ha_codeowners:
  - '@microBeesTech'
ha_config_flow: true
ha_domain: microbees
ha_iot_class: Cloud Polling
ha_platforms:
  - switch
  - climate
  - cover
  - binary_sensor
  - button
  - cover
  - light
  - sensor
  - switch
ha_integration_type: integration
---

The microbees integration allows you to control your [microBees devices](https://www.microbees.com/) such as plugs and wall switches.
To use this integration you need OAuth2 Client ID and Client Secret and your user credentials.

To retrieve the OAuth2 Client ID and Client Secret go to [microBees Developer Dashboard](https://developers.microbees.com/dashboard), login with your microBees account and [create a new app](https://developers.microbees.com/dashboard/?p=wizard), choose a Label for your App, select WebApplication and input https://my.home-assistant.io as Website URL.

There is currently support for the following device types within Home Assistant:
- **Switch**
- **Climate**
- **Cover**
- **Binary sensors**
- **Button**
- **Light**
- **Sensor**

Note: The cover status will be unknown 

{% include integrations/config_flow.md %}
