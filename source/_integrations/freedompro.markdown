---
title: Freedompro
description: Instructions for how to integrate Freedompro accessories within Home Assistant.
ha_category:
  - Binary Sensor
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

## Preliminary Steps

You will need to obtain an API key from [Freedompro Cloud](https://home.freedompro.eu/) to use this integration.

1. Login to [Freedompro Cloud](https://home.freedompro.eu/).
2. Make sure you have at least one accessory paired with the Freedompro Cloud before starting integration.
3. Click on your photo profile.
4. Generate the API key.

{% include integrations/config_flow.md %}
