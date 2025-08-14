---
title: Freedompro
description: Instructions for how to integrate Freedompro accessories within Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Fan
  - Light
  - Lock
  - Sensor
  - Switch
ha_release: 2021.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@stefano055415'
ha_domain: freedompro
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
ha_integration_type: integration
---

[Freedompro](https://freedompro.eu/), a company specialized in home automation, designs and manufactures products to make domotics affordable for everyone, installers and enthusiasts. [Freedompro Products](https://freedompro.eu/collections/easykon) are designed to be easy to use and practical and fast to install.

Freedompro with its products installed on the electrical system, allows you to control all the KNX and MyHome SCS devices already present in your home.

This integration lets you control all [Freedompro](https://freedompro.eu/) accessories.

## Preliminary steps

You will need to obtain an API key from Freedompro's app to use this integration.

1. Download the app on your phone: ([Android](https://play.google.com/store/apps/details?id=eu.freedompro.app&hl=en&gl=US) / [iOS](https://apps.apple.com/en/app/freedompro/id1598082027)).
2. Register and create your first home.
3. Make sure you have at least one accessory paired with the Freedompro Cloud before starting integration.
4. Switch to the **Profile** tab (bottom right corner).
5. Scroll down to the **Developper tools** and tap **Api Key**.
6. Generate an API key.

{% include integrations/config_flow.md %}
