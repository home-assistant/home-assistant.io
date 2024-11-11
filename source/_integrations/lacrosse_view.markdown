---
title: LaCrosse View
description: Get data for LaCrosse View-connected sensors
ha_release: '2022.9'
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: lacrosse_view
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

[**LaCrosse View**](https://www.lacrossetechnology.com/pages/la-crosse-view) is the service provided by LaCrosse Technology that allows access to LaCrosse sensors.

It is also available in Europe as [**TFA View**](https://www.tfa-dostmann.de/en/produkte/weather-stations/wifi-weather-stations/).

{% tip %}
If you are looking for an integration for [**Jeelink LaCrosse sensors**](/integrations/lacrosse), you can find that integration [**here**](/integrations/lacrosse).
{% endtip %}

{% include integrations/config_flow.md %}

## Supported sensors

All of the sensors on [**this page**](https://www.lacrossetechnology.com/collections/lacrosse-view-connected) are supported by this integration.
