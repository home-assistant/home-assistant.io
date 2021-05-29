---
title: Honeywell Total Connect Comfort (US)
description: Instructions on how to integrate Honeywell thermostats within Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@rdfurman'
ha_domain: honeywell
ha_platforms:
  - climate
  - sensor
---

The Honeywell integration integrates Home Assistant with _US-based_ [Honeywell Total Connect Comfort (TCC)](https://mytotalconnectcomfort.com/portal/) climate systems.

It uses the [somecomfort](https://github.com/kk7ds/somecomfort) client library. It does not support the home security functionality of TCC.

If your system is compatible with this integration, then you will be able access it via [https://mytotalconnectcomfort.com/portal/](https://mytotalconnectcomfort.com/portal/) (note the `/portal/`).

This integration will add Home Assistant sensors for the following:
|Sensor|Value|
--- | ---
|Indoor temperature|Average temperature of all Honeywell Wireless Indoor Sensors|
|Indoor humidity | Average humidity of all Honeywell Wireless Indoor Sensors|
|Outdoor temperature | Average temperature of all Honeywell Wireless Outdoor Sensors|
|Outdoor humidity | Average humidity of all Honeywell Wireless Outdoor Sensors|

{% include integrations/config_flow.md %}