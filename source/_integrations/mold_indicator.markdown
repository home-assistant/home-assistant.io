---
title: Mold Indicator
description: How to use the mold growth indication integration in Home Assistant
ha_category:
  - Environment
ha_release: '0.20'
ha_iot_class: Local Polling
ha_quality_scale: internal
ha_domain: mold_indicator
ha_platforms:
  - sensor
---

The Mold Indicator sensor integration consumes information of two temperature sensors and a humidity sensor to give an indication for possible mold growth in your home. In case of bad ventilation and insulation, the indoor humidity may lead to condensation on cold surfaces as the windows or even walls. Condensation or a high relative humidity near those cold surfaces leads to a higher risk for mold growth. This sensor integration estimates the temperature at a pre-calibrated critical point in the room (the coldest surface) and calculates the relative humidity of the air at that point. If the sensor value rises above approximately 70 percent, mold growth might occur and the room should be ventilated. At 100%, the air humidity condensates at the critical point.

The sensor data may be used e.g., to signal bad air quality (too high air humidity) or to automate operation of indoor air humidifiers to keep the indoor humidity at an optimum.

## Configuration

To use the Mold Indicator sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mold_indicator
    indoor_temp_sensor: sensor.temp
    indoor_humidity_sensor: sensor.humidity
    outdoor_temp_sensor: sensor.weather_temperature
    calibration_factor: 2.0
```

{% configuration %}
name:
  description: The name of the sensor.
  required: false
  type: string
indoor_temp_sensor:
  description: The entity ID of the indoor temperature sensor.
  required: true
  type: string
indoor_humidity_sensor:
  description: The entity ID of the indoor humidity sensor.
  required: true
  type: string
outdoor_temp_sensor:
  description: The entity ID of the outdoor temperature sensor.
  required: true
  type: string
calibration_factor:
  description: Needs to be calibrated to the critical point in the room.
  required: true
  type: float
{% endconfiguration %}

In this case, the weather forecast temperature sensor is used for the outside temperature.

## Calibration

The Mold Indicator sensor integration needs to be calibrated in order to estimate the temperature at the critical point from the outdoor and indoor temperature. First find the coldest surface in the room (critical point), which is typically near the window frames, but depends on the insulation of your home. For calibration you need to measure the temperature at this critical point and simultaneously write down the values for the indoor- and outdoor temperature sensors used for the Mold Indicator. Be sure that there is a significant indoor to outdoor temperature difference to get the best calibration results.
With the three measured temperatures (in Celsius or Fahrenheit), the calibration_factor for your configuration file is given by:

```text
calibration_factor = (temp_indoor - temp_outdoor) / (temp_criticalpoint - temp_outdoor)
```
