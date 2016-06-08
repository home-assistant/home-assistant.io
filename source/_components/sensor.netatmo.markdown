---
layout: page
title: "Netatmo Sensor"
description: "Instructions how to integrate Netatmo sensors into Home Assistant."
date: 2016-06-02 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Weather
---


The `netatmo` sensor platform is consuming the information provided by a [Netatmo](https://www.netatmo.com) device.

To enable the Netatmo sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  platform: netatmo
  station: STATION_NAME
  modules:
    module_name1:
      - temperature
      - humidity
      - noise
      - pressure
      - co2
      - rain
      - sum_rain_1
      - sum_rain_24
    module_name2:
      - temperature
    rainmeter_name3:
      - rain
      - sum_rain_1
      - sum_rain_24
```

Configuration variables:

- **station** (*Optionnal*): The name of the weather station. Needed if several stations are associated with the account.
- **modules** (*Required*): Modules to use. Multiple entries allowed.
  - **module_name** array (*Required*): Name of the module.
    - **temperature**: Current temperature.
    - **co2**: CO2 concentration in ppm.
    - **pressure**: Pressure in mbar.
    - **noise**: Noise level in dB.
    - **humidity**: Humidity in %.
    - **rain**: Estimated rainfall for today in mm.
    - **sum_rain_1**: Rainfall in the last hour in mm.
    - **sum_rain_24**: Rainfall in mm from 00:00am - 23:59pm.

### {% linkable_title Find your modules name %}

You can find your modules name in your [online NetAtmo account](https://my.netatmo.com/app/station). These names can be found and changed in parameters (See screenshot)
You have to provide these name in your Home Assistant configuration file.

<p class='img'>
<img src='/images/screenshots/netatmo_module.png' />
</p>

<p class='note'>
The Home Assistant NetAtmo platform has only be tested with the classic indoor, outdoor module and rainmeter. There is no support for the windmeter module at this time because developers does not own these modules.
</p>
