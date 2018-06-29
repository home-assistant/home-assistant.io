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

The `netatmo` sensor platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) device.

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

Configuration variables:

- **station** (*Optional*): The name of the weather station. Needed if several stations are associated with the account.
- **modules** (*Required*): Modules to use. Multiple entries allowed. Please check the next section about how to retrieve the module names.
  - **module_name** array (*Required*): Name of the module.
    - **temperature**: Current temperature.
    - **co2**: CO2 concentration in ppm.
    - **pressure**: Pressure in mbar.
    - **noise**: Noise level in dB.
    - **humidity**: Humidity in %.
    - **rain**: Estimated rainfall for today in mm.
    - **sum_rain_1**: Rainfall in the last hour in mm.
    - **sum_rain_24**: Rainfall in mm from 00:00am - 23:59pm.
    - **windangle**: Wind angle
    - **windstrength**: Wind strength
    - **gustangle**: Wind gust angle
    - **guststrength**: Wind gust strength
    - **min_temp**: Min temperature for today
    - **max_temp**: Max temperature for today
    - **rf_status**: Current radio status per module. (90=low, 60=highest)
    - **wifi_status**: Wifi status per Base station
    - **battery_vp**: Current battery status per module.

### {% linkable_title Find your modules name %}

You can find your modules name in your [online NetAtmo account](https://my.netatmo.com/app/station). These names can be found and changed in parameters. You have to provide these name in your Home Assistant `configuration.yaml` file.

<p class='img'>
<img src='/images/screenshots/netatmo_module.png' />
</p>
