---
layout: page
title: "Mold Indicator"
description: "How to use the mold growth indication component in Home Assistant"
date: 2016-02-11 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Sensor
ha_release: '0.20'
ha_iot_class: "Local Polling"
---

The Mold Indicator sensor component consumes information of two temperature sensors and a humidity sensor to give an indication for possible mold growth in your home. In case of bad ventilation and insulation, the indoor humidity may lead to condensation on cold surfaces as the windows or even walls. Condensation or a high relative humidity near those cold surfaces leads to a higher risk for mold growth. This sensor component estimates the temperature at a pre-calibrated critical point in the room (the coldest surface) and calculates the relative humidity of the air at that point. If the sensor value rises above approximately 70 percent, mold growth might occur and the room should be ventilated. At 100%, the air humidity condensates at the critical point.

The sensor data may be used e.g., to signal bad air quality (too high air humidity) or to automate operation of indoor air humidifiers to keep the indoor humidity at an optimum. To use the Mold Indicator sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mold_indicator
    indoor_temp_sensor: sensor.temp
    indoor_humidity_sensor: sensor.humidity
    outdoor_temp_sensor: sensor.weather_temperature
    calibration_factor: 2.0
```

Configuration variables:

- **indoor_temp_sensor** (*Required*): The entity ID of the indoor temperature sensor.
- **indoor_humidity_sensor** (*Required*): The entity ID of the indoor humidity sensor.
- **outdoor_temp_sensor** (*Required*): The entity ID of the outdoor temperature sensor.
- **calibration_factor** (*Required*): Needs to be calibrated to the critical point in the room.

In this case, the weather forecast temperature sensor is used for the outside temperature.

## {% linkable_title Calibration %}

The Mold Indicator sensor component needs to be calibrated in order to estimate the temperature at the critical point from the outdoor and indoor temperature. First find the coldest surface in the room (critical point), which is typically near the window frames, but depends on the insulation of your home. For calibration you need to measure the temperature at this critical point and simultaneously write down the values for the indoor- and outdoor temperature sensors used for the Mold Indicator. Be sure that there is a significant indoor to outdoor temperature difference to get the best calibration results.
With the three measured temperatures (in Celsius or Fahrenheit), the calibration_factor for your configuration file is given by:

```text
calibration_factor = (temp_indoor - temp_outdoor) / (temp_criticalpoint - temp_outdoor)
```
