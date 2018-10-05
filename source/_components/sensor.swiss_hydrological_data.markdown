---
layout: page
title: "Swiss Hydrological Data"
description: "Instructions on how to integrate hydrological data of Swiss waters within Home Assistant."
date: 2018-10-05 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: swiss-hydrological-data.png
ha_category: Environment
ha_iot_class: "Cloud Polling"
ha_release: 0.22
---

<p class='note info'>
  The sensors don't show the latest measurement, but those one hour older due to the source of data.
</p>

The `swiss_hydrological_data` sensor will show you details (temperature, level, and discharge) of rivers and lakes in Switzerland.

## {% linkable_title Setup %}

The [station overview](https://www.hydrodaten.admin.ch/en/stations-and-data.html) contains a list of all available measuring points and will help to determine the ID of station which is needed for the configuration.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: swiss_hydrological_data
    station: STATION_ID
    measurements:
      - temperature
```

{% configuration %}
station:
  description: The ID of the measurement point.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: 
measurements:
  description: list of measurements you want to use.
  required: true
  type: list
  deafult:
{% endconfiguration %}

Valid measurement values are:

- temperature
  - The last temperature measurement
- level
  - The last water level measurement
- discharge
  - The last discharge measurement
- min_temperature
  - The minimum temperature measurement of the last 24 hours
- min_level
  - The minimum water level measurement of the last 24 hours
- min_discharge
  - The minimum discharge measurement of the last 24 hours
- max_temperature
  - The maximum temperature measurement of the last 24 hours
- max_level
  - The maximum water level measurement of the last 24 hours
- max_discharge
  - The maximum discharge measurement of the last 24 hours
- mean_temperature
  - The mean temperature measurement of the last 24 hours
- mean_level
  - The mean water level measurement of the last 24 hours
- mean_discharge
  - The mean discharge measurement of the last 24 hours

<p class='note info'>
    Some stations don't provide data for certain measurements.
</p>


The hydrological measurings are coming from the [Swiss Federal Office for the Environment (Bundesamt für Umwelt - Abt. Hydrologie)](http://www.hydrodaten.admin.ch) and are updated every 10 minutes.



