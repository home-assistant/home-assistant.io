---
title: Plaato
description: Instructions on how to integrate Plaato Airlock and Keg sensors within Home Assistant.
ha_release: 0.95
ha_category:
  - Sensor
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@JohNan'
ha_domain: plaato
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

This integration sets up integration with [Plaato](https://www.plaato.io/) Airlock and Keg.

### Plaato Airlock

A tool for beer brewers that wants a unique insight into the fermentation process.
With this integration, you get all your fermentation data available in Home Assistant!

### Plaato Keg

The first all-in-one system that keeps a track of important aspects of your keg’s, including:

- The Level of beer inside the keg
- Pouring Status
- Temperature 

## Configuration

To configure a Plaato device, you must set it up via the integrations panel in the Home Assistant frontend.

You have two options to choose from: webhook and `auth_token.` The webhook is only available for the Airlock at the moment.

### Auth token

To be able to query the API an `auth_token` is required which can be obtained by following [these](https://intercom.help/plaato/en/articles/5004720-auth_token) instructions.

### Webhook (Airlock only)

The configuration step will give you the webhook URL to use in the PLAATO mobile app. It should be pasted in configuration on the tab "Webhook". 
More information can be found [here](https://intercom.help/plaato/en/articles/5004719-webhook-plaato-airlock).

This sensor platform was not made by Plaato. It is not official, not developed, and not supported by Plaato.
