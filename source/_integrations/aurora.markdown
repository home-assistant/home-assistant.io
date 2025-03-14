---
title: Aurora
description: Know when auroras might be visible at your location
ha_category:
  - Environment
ha_iot_class: Cloud Polling
ha_release: 0.39
ha_domain: aurora
ha_codeowners:
  - '@djtimca'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The `aurora` platform uses the [NOAA Aurora Forecast](https://www.swpc.noaa.gov/products/aurora-30-minute-forecast) action to let you know if an aurora might be visible at your home location in the next 30 minutes, based off of current solar flare activity.

This service gives a number 0-100 representing the current likelihood of visible auroras at your latitude/longitude. By default this sensor is set up to trigger when the reported likelihood for your location is > 75. It updates every 5 minutes.

{% include integrations/config_flow.md %}

You can configure multiple locations by adding the integration multiple times.

## Options

Once installed you can adjust the threshold for this location by clicking on the Options link on the integration.

## Sensors

The integration will add two sensors for each location you configure:

|Sensor Type|Values|Description|
|-|-|-|
|binary_sensor|on/off|on = high chance of Aurora visibility, off = low chance of visibility|
|sensor|% value|Percentage chance of visibility|
