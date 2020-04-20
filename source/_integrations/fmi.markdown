---
title: FMI
description: Instructions on how to integrate FMI within Home Assistant.
ha_category:
  - Weather
  - Sensor
ha_release: 0.109
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@anand-p-r'
ha_domain: fmi
---

The `fmi` weather and sensor platform uses [FMI's Open-Data](https://en.ilmatieteenlaitos.fi/open-data) as a source for current meteorological data for a location.

There is currently support for the sensor and weather device types within Home Assistant. Configuration is provided under a single domain `fmi`.

## Configuration

Configuration for both weather and sensor platforms are under a single domain configuration - `fmi`. This should be included in configuration YAML file. All configuration parameters except `name` are optional. The first instnce in the list is common to the `weather` and `sensor` platforms. However not all parameters are applicable for the `weather` platform. For details please check the [Weather](#weather) section below. Subsequent instances in domain integration are for `sensor` platform. So there can be multiple sensors tracking different locations. Here is an example that can be added to configuration YAML file:

```YAML
# Example configuration YAML entry
fmi:
  - name: FMI
    latitude: 60.251515
    longitude: 24.777256
    offset: 1
    min_temperature: 5
    max_temperature: 25
    min_relative_humidity: 35
    max_relative_humidity: 70
    min_wind_speed: 0.0
    max_wind_speed: 30.0
    min_precipitation: 0.0
    max_precipitation: 1.0
  - name: Cottage
    latitude: 60.200000
    longitude: 24.600000
    offset: 3
    min_temperature: 5
    max_temperature: 25
    min_relative_humidity: 35
    max_relative_humidity: 70
    min_wind_speed: 0.0
    max_wind_speed: 30.0
    min_precipitation: 0.0
    max_precipitation: 1.0
  - name: Parents' Place
    latitude: 60.211111
    longitude: 24.611111
    offset: 2
    min_temperature: 5
    max_temperature: 25
    min_relative_humidity: 35
    max_relative_humidity: 70
    min_wind_speed: 0.0
    max_wind_speed: 30.0
    min_precipitation: 0.0
    max_precipitation: 1.0
```

If latitude are longitude are not provided, it will be detected from the home latitude and longitude settings. The user preferred weather attributes (min_temperature, max_humidity etc) are used to compare the day's weather forecast and provide a relative best time for outdoor activity only for the sensor integration. If the conditions are not met, state of sensor (`_best_time_of_day`) will be "not_available". Other sensors (monitored weather conditions) include "condition", "temperature", "wind speed", "humidity", "clouds" and "rain".


{% configuration %}
name:
  description: "Name of sensor/weather entity."
  required: true
  type: string
  default: "FMI"
latitude:
  description: "Manually specify latitude. By default the value will be taken from the Home Assistant configuration. Valid for both sensor and weather platforms."
  required: false
  type: float
  default: Provided by Home Assistant configuration
longitude:
  description: "Manually specify longitude. By default the value will be taken from the Home Assistant configuration. Valid for both sensor and weather platforms."
  required: false
  type: float
  default: Provided by Home Assistant configuration
offset:
  description: "Hour offset for forecast. Accepted values are one of [0, 1, 2, 3, 4, 6, 8, 12, 24]. Valid for both sensor and weather platforms."
  required: false
  type: integer
  default: "Defaults to 0 (Current weather)"
min_temperature:
  description: "Preferred minimum temperature in °C. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 10°C"
max_temperature:
  description: "Preferred maximum temperature in °C. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 30°C"
min_relative_humidity:
  description: "Preferred minimum relative humidity in %. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 30%"
max_relative_humidity:
  description: "Preferred maximum relative humidity in %. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 70%"
min_wind_speed:
  description: "Preferred minimum wind speed in m/s. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 0m/s"
max_wind_speed:
  description: "Preferred maximum wind speed in m/s. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 25m/s"
min_precipitation:
  description: "Preferred minimum precipitation in mm/hr. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 0mm/hr"
max_precipitation:
  description: "Preferred maximum precipitation in mm/hr. Valid for only sensor platform."
  required: false
  type: float
  default: "Defaults to 0.2mm/hr"
{% endconfiguration %}

Data fetch and update frequency is 15mins.

## Sensor

In addition to weather attributes, sensor also provides reverse geo-coded location for the given latitude/longitude as well as the best time of the day based on user preferences.

To add FMI sensor to a Home Assistant installation add the following to configuration YAML file:

```YAML
# Example configuration YAML entry
sensor:
  - platform: fmi  
```

Multiple sensors to track different locations can be added as a list under the main domain integration `fmi` as shown in example configuration YAML.


## Weather
To add FMI weather platform to a Home Assistant installation, add the following to configuration YAML file:

```YAML
# Example configuration YAML entry
weather:
  - platform: fmi
```

Weather configuration can be specified as the first list entry under `fmi` domain configuration. Optional parameters - `min_temperature`, `max_temperature`, `min_relative_humidity`, `max_relative_humidity`, `min_wind_speed`, `max_wind_speed`, `min_precipitation` and `max_precipitation` are not valid for weather platform. They are applicable for the sensor platform.