---
layout: page
title: "Netatmo Sensor"
description: "Instructions on how to integrate Netatmo sensors into Home Assistant."
date: 2016-06-23 11:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Weather
ha_iot_class: Cloud Polling
ha_release: 0.11
redirect_from:
 - /components/sensor.netatmo_public/
---

The `netatmo` sensor platform is consuming the information provided by a [Netatmo Weather Station](https://www.netatmo.com/en-us/weather/weatherstation), a
[Netatmo Home Coach](https://www.netatmo.com/en-us/aircare/homecoach) [Netatmo](https://www.netatmo.com) device or the public sensors of others available via the [Netatmo API](https://weathermap.netatmo.com/) even if you don't own a Netatmo device.

Currently the following conditions are supported:

* temperature
* pressure
* humidity
* rain
* windstrength
* guststrength

To enable Netatmo sensors, you have to set up [netatmo](/components/netatmo/). By default this will use discovery to add your own sensors.

Public sensors have to be set up manually.

## {% linkable_title Advanced configuration %}

If you want to select a specific sensor, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

The `netatmo` sensor platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) device.

To enable the Netatmo sensor, you first have to set up [netatmo](/components/netatmo/), and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  # Personal sensors
  - platform: netatmo
    station: STATION_NAME
    modules:
      module_name1:
        - temperature
      module_name2:
        - temperature
        - battery_vp

  # Public sensor
  - platform: netatmo
    areas:
      - lat_ne: 40.719
        lon_ne: -73.735
        lat_sw: 40.552
        lon_sw: -74.105
        monitored_conditions:
          - temperature
          - pressure
          - humidity
          - rain
          - windstrength
          - guststrength
```

{% configuration %}
station:
  required: false
  description: The name of the weather station. Needed if several stations are associated with the account.
  type: string
modules:
  required: false
  description: Modules to use. Multiple entries allowed. Please check the next section about how to retrieve the module names.
  type: list
  keys:
    module_name:
      type: list
      required: true
      description: Name of the module.
      keys:
        temperature:
          description: Current temperature.
        co2:
          description: CO2 concentration in ppm.
        pressure:
          description: Pressure in mbar.
        noise:
          description: Noise level in dB.
        humidity:
          description: "Humidity in %."
        health_idx:
          description: "Air health as one of the values Healthy, Fine, Fair, Poor, Unhealthy."
        rain:
          description: Estimated rainfall for today in mm.
        sum_rain_1:
          description: Rainfall in the last hour in mm.
        sum_rain_24:
          description: "Rainfall in mm from 00:00am - 23:59pm."
        windangle:
          description: Wind angle
        windstrength:
          description: Wind strength
        gustangle:
          description: Wind gust angle
        guststrength:
          description: Wind gust strength
        min_temp:
          description: Min temperature for today
        max_temp:
          description: Max temperature for today
        rf_status:
          description: "Current radio status per module. (90=low, 60=highest)"
        wifi_status:
          description: Wifi status per Base station
        battery_vp:
          description: Current battery status per module.
        battery_percent:
          description: Percentage of battery remaining per module.
areas:
  description: The list contains one or more areas to add as sensors.
  required: false
  type: map
  keys:
    lat_ne:
      description: Latitude of north-eastern corner of area.
      required: true
      type: string
    lon_ne:
      description: Longitude of north-eastern corner of area.
      required: true
      type: string
    lat_sw:
      description: Latitude of south-western corner of area.
      required: true
      type: string
    lon_sw:
      description: Longitude of south-western corner of area.
      required: true
      type: string
    monitored_conditions:
      description: List of environment conditions to monitor.
      required: true
      type: list
    name:
      description: Name of the sensor.
      required: false
      type: string
      default: Netatmo Public Data
    mode:
      description: "How to calculate the value of the sensor if there are multiple stations reporting data. Accepts `max` or `avg`."
      required: false
      type: string
      default: avg
{% endconfiguration %}

## {% linkable_title Find your modules name %}

You can find your modules name in your [online NetAtmo account](https://my.netatmo.com/app/station). These names can be found and changed in parameters. You have to provide these name in your Home Assistant `configuration.yaml` file.

<p class='img'>
<img src='/images/screenshots/netatmo_module.png' />
</p>
