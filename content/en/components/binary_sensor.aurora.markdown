---
layout: page
title: "Aurora sensor"
description: "Know when auroras might be visible at your location"
date: 2017-02-14 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
ha_release: 0.39
logo: noaa.png
---

The `aurora` platform uses the [NOAA aurora forecast](http://www.swpc.noaa.gov/products/aurora-30-minute-forecast) service to let you know if an aurora might be visible at your home location in the next 30 minutes, based off of current solar flare activity.

This service gives a number 0-100 representing the current likelihood of visible auroras at your latitude/longitude. By default this sensor is set up to trigger when the reported likelihood for your location is > 75. It updates every 5 minutes.

You can check the attributes of the sensor to see your exact forecast.

To add the aurora binary sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: aurora
```

Configuration variables:

- **forecast_threshold** (*Optional*): Provide your own threshold number above which the sensor will trigger. Defaults to 75.
- **name** (*Optional*): The name of the sensor. Default is 'Aurora Visibility'. 

```yaml
  binary_sensor:
    - platform: aurora
      forecast_threshold: 50
```
