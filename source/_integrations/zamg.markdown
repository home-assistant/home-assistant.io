---
title: GeoSphere Austria
description: Instructions on how to integrate GeoSphere Austria (formerly known as ZAMG) within Home Assistant.
ha_category:
  - Sensor
  - Weather
ha_release: 0.35
ha_iot_class: Cloud Polling
ha_domain: zamg
ha_config_flow: true
ha_platforms:
  - sensor
  - weather
ha_integration_type: integration
ha_codeowners:
  - '@killer0071234'
---

The `GeoSphere Austria` platform uses meteorological details published by the Austrian weather service [GeoSphere Austria](https://www.geosphere.at).

With this integration, it is possible to get weather station data from up to 228 different GeoSphere stations across Austria. The integration uses the [datahub-api](https://dataset.api.hub.geosphere.at/v1/docs/index.html).

{% include integrations/config_flow.md %}

There is currently support for the following device types within Home Assistant:

- **Weather** - It displays the current temperature, humidity, pressure and wind speed, but it doesn't have support for conditions which is a key feature of the `weather` platforms.
- **[Sensor](#sensor)**

## Sensor

This integration provides the following sensors:

|Name|Description|
|----|-----------|
|Temperature|Temperature in °C|
|Temperature Average|Average Temperature in °C|
|Humidity|Humidity in %|
|Dew Point|Dew point in °C|
|Dew Point Average|Average Dew point in °C|
|Pressure|Station pressure in hPa|
|Pressure at Sea Level|Sea level pressure in hPa|
|Wind Speed|Wind speed in km/h|
|Top Wind Speed|Max wind speed in km/h|
|Wind Bearing|Wind bearing in °|
|Top Wind Bearing|Wind bearing at max speed in °|
|Sun Last 10 Minutes|Sunshine in the last 10 minutes in sec|
|Precipitation|Precipitation in mm|
|Snow|Snow in cm|

{% note %}
Not every station supports every sensor.
{% endnote %}
