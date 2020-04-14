---
title: FMI
description: Instructions on how to integrate FMI within Home Assistant.
ha_category:
  - Weather
  - Sensor
ha_release: 0.108.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@anand-p-r'
ha_domain: fmi
---

The `fmi` weather and sensor platform uses [FMI's Open-Data](https://en.ilmatieteenlaitos.fi/open-data) as a source for current meteorological data for a location.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Weather](#weather)

## Sensor

The sensor checks for new data every 15 minutes. In addition to weather attributes, sensor also provides reverse geo-coded location for the given latitute/longitude as well as the best time of the day based on user preferences.

To add FMI sensor to a HASS installation add the following to configuration.yaml file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fmi  
    name: FMI
    latitude: 1234567
    longitude: 1234567
    offset: 1
    min_temperature: 15
    max_temperature: 25
    min_relative_humidity: 35
    max_relative_humidity: 70
    min_wind_speed: 0.0
    max_wind_speed: 30.0
    min_precipitation: 0.0
    max_precipitation: 1.0
```

If latitude are longitude are not provided, it will be detected from the home latitude and longitude settings. The user preferred weather attributes (min_temperature, max_humidity etc) are used to compare the day's weather forecast and provide a relative best time for outdoor activity. If the conditions are not met, state of sensor (`_best_time_of_day`) will be "not_available". Other sensors (monitored weather conditions) include "condition", "temperature", "wind speed", "humidity", "clouds" and "rain".

{% configuration %}
name:
  description: "Name of sensor."
  required: false
  type: string
  default: "FMI"
latitude:
  description: "Manually specify latitude. By default the value will be taken from the Home Assistant configuration."
  required: false
  type: float
  default: Provided by Home Assistant configuration
longitude:
  description: "Manually specify longitude. By default the value will be taken from the Home Assistant configuration."
  required: false
  type: float
  default: Provided by Home Assistant configuration
offset:
  description: "Hour offset for forecast. Accepted values are one of [0, 1, 2, 3, 4, 6, 8, 12, 24]."
  required: false
  type: int
  default: "Defaults to 0 (Current weather)"
min_temperature:
  description: "Preferred minimum temperature in °C."
  required: false
  type: float
  default: "Defaults to 10°C"
max_temperature:
  description: "Preferred maximum temperature in °C."
  required: false
  type: float
  default: "Defaults to 30°C"
min_relative_humidity:
  description: "Preferred minimum relative humidity in %."
  required: false
  type: float
  default: "Defaults to 30%"
max_relative_humidity:
  description: "Preferred maximum relative humidity in %."
  required: false
  type: float
  default: "Defaults to 70%"
min_wind_speed:
  description: "Preferred minimum wind speed in m/s."
  required: false
  type: float
  default: "Defaults to 0m/s"
max_wind_speed:
  description: "Preferred maximum wind speed in m/s."
  required: false
  type: float
  default: "Defaults to 25m/s"
min_precipitation:
  description: "Preferred minimum precipitation in mm/hr."
  required: false
  type: float
  default: "Defaults to 0mm/hr"
max_precipitation:
  description: "Preferred maximum precipitation in mm/hr."
  required: false
  type: float
  default: "Defaults to 0.2mm/hr"
{% endconfiguration %}

<div class='note'>
This platform is an alternative to [`fmi weather`](/integrations/fmi#weather) platform.
</div>

## Weather
To add FMI weather platform to a HASS installation, add the following to configuration.yaml file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: fmi
    name: FMI
    latitude: 1234567
    longitude: 1234567
    offset: 1
```

If latitude are longitude are not provided, it will be detected from the home latitude and longitude settings.

{% configuration %}
name:
  description: "Name of weather entity."
  required: false
  type: string
  default: "FMI"
latitude:
  description: "Manually specify latitude. By default the value will be taken from the Home Assistant configuration."
  required: false
  type: float
  default: "Provided by Home Assistant configuration"
longitude:
  description: "Manually specify longitude. By default the value will be taken from the Home Assistant configuration."
  required: false
  type: float
  default: "Provided by Home Assistant configuration"
offset:
  description: "Hour offset for forecast. Accepted values are one of [1, 2, 3, 4, 6, 8, 12, 24]."
  required: false
  type: int
  default: "Defaults to 1 (weather forecast every hour)"
{% endconfiguration %}

<div class='note'>
This platform is an alternative to [`fmi sensor`](/integrations/fmi#sensor) platform.
</div>
