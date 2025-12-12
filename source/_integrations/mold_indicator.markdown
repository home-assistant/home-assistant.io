---
title: Mold Indicator
description: How to use the mold growth indication integration in Home Assistant
ha_category:
  - Environment
  - Helper
ha_release: '0.20'
ha_iot_class: Calculated
ha_quality_scale: internal
ha_domain: mold_indicator
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The Mold Indicator sensor {% term integration %} uses data from two temperature sensors and a humidity sensor to predict the humidity near a cold surface. High humidity may lead to mold growth at more than ~70% and causes condensation at 100%.

The sensor data may be used, for example, to detect bad air quality (high humidity) or automate the operation of indoor air humidifiers to keep the indoor humidity at an optimum.

{% include integrations/config_flow.md %}

Further information about these configuration options can be found under the [YAML configuration](#yaml-configuration)

{% configuration_basic %}
Name:
  description: The name of the sensor.
Indoor temperature sensor:
  description: The entity ID of the indoor temperature sensor.
Indoor humidity sensor:
  description: The entity ID of the indoor humidity sensor.
Outdoor temperature sensor:
  description: The entity ID of the outdoor temperature sensor.
Calibration factor:
  description: Needs to be calibrated to the critical point in the room.
{% endconfiguration_basic %}

## YAML Configuration

To use the Mold Indicator sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mold_indicator
    indoor_temp_sensor: sensor.temp
    indoor_humidity_sensor: sensor.humidity
    outdoor_temp_sensor: sensor.weather_temperature
    calibration_factor: 2.0
    unique_id: very_unique_id_123
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
unique_id:
  description: Provide a unique id for the sensor.
  required: false
  type: string
{% endconfiguration %}

In this case, the weather forecast temperature sensor is used for the outside temperature.

## Background

First, this sensor predicts the temperature near the given surface by estimating it from the indoor and outdoor temperatures. The predicted temperature starts with the indoor temperature, then either brings it closer to the outdoor temperature (if the calibration factor is positive, indicating the surface is influenced by the outdoors) or away (if the calibration factor is negative, indicating the surface is inversely correlated with the outdoor temperature).

From there, the sensor calculates the relative humidity near the given surface based on the dew point.

## Calibration

The Mold Indicator sensor integration needs to be calibrated in order to estimate the temperature at the critical point from the outdoor and indoor temperature. First find the coldest surface in the room (critical point), which is typically near the window frames, but depends on the insulation of your home. For calibration you need to measure the temperature at this critical point and simultaneously write down the values for the indoor- and outdoor temperature sensors used for the Mold Indicator. Be sure that there is a significant indoor to outdoor temperature difference to get the best calibration results.

With the three measured temperatures (in Celsius or Fahrenheit), the calibration_factor for your configuration file is given by:

```text
calibration_factor = (temp_indoor - temp_outdoor) / (temp_criticalpoint - temp_outdoor)
```
