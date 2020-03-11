---
title: Plaato Airlock
description: Instructions on how to integrate Plaato Airlock sensors within Home Assistant.
ha_release: 0.95
ha_category:
  - Sensor
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@JohNan'
ha_domain: plaato
---

This integration sets up integration with [Plaato Airlock](https://www.plaato.io/).
Plaato Airlock is a tool for beer brewers that wants a unique insight into the fermentation process.
With this integration, you get all your fermentation data available in Home Assistant!

## Configuration

To configure Plaato Airlock, you must set it up via the integrations panel in the Home Assistant frontend.

This will give you the webhook URL to use in the PLAATO mobile app configuration on the tab "Webhook". 
More information can be found [here](https://plaato.io/apps/help-center#!hc-general).

This sensor platform was not made by Plaato. It is not official, not developed, and not supported by Plaato.
