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
ha_iot_class: "Cloud Polling"
---

### {% linkable_title Basic Configuration %}

The `netatmo` sensor platform is consuming the information provided by a [Netatmo Weather Station](https://www.netatmo.com/en-us/weather/weatherstation) or a 
[Netatmo Home Coach](https://www.netatmo.com/en-us/aircare/homecoach) [Netatmo](https://www.netatmo.com) devices.

To enable the Netatmo sensor, you have to set up [netatmo](/components/netatmo/), this will use discovery to add your sensor.

### {% linkable_title Advanced configuration %}

If you want to select a specific sensor, set discovery to False for [netatmo](/components/netatmo/) and add the following lines to your `configuration.yaml`:

The `netatmo` sensor platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) device.

To enable the Netatmo sensor, you first have to set up [netatmo](/components/netatmo/), and add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netatmo
    station: STATION_NAME
    modules:
      module_name1:
        - temperature
      module_name2:
        - temperature
        - battery_vp
```

{% configuration %}
station:
  required: false
  description: The name of the weather station. Needed if several stations are associated with the account.
  type: string
modules:
  required: true
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
{% endconfiguration %}

### {% linkable_title Find your modules name %}

You can find your modules name in your [online NetAtmo account](https://my.netatmo.com/app/station). These names can be found and changed in parameters. You have to provide these name in your Home Assistant `configuration.yaml` file.

<p class='img'>
<img src='/images/screenshots/netatmo_module.png' />
</p>
