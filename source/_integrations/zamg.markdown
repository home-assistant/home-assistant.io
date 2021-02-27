---
title: Zentralanstalt für Meteorologie und Geodynamik (ZAMG)
description: Instructions on how to integrate ZAMG within Home Assistant.
ha_category:
  - Weather
  - Sensor
ha_release: 0.35
ha_iot_class: Cloud Polling
ha_domain: zamg
ha_platforms:
  - sensor
  - weather
---

The `zamg` platform uses meteorological details published by the Austrian weather service [Zentralanstalt für Meteorologie und Geodynamik (ZAMG)](https://www.zamg.ac.at).

Only observations for capital cities are publicly available. You can check the list of stations in [CSV format](https://www.zamg.ac.at/ogd).

There is currently support for the following device types within Home Assistant:

- **[Weather](#weather)** - Easier to configure but less customizable and doesn't have support for conditions which is a key feature of the `weather` platforms.
- **[Sensor](#sensor)**

## Weather

To add ZAMG weather platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: zamg
```

{% configuration %}
station_id:
  description: The ID number for a supported ZAMG station.
  required: false
  type: string
name:
  description: A name for the weather platform.
  required: false
  type: string
latitude:
  description: "Latitude coordinate to monitor weather of (required if **longitude** is specified)."
  required: false
  type: float
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
longitude:
  description: "Longitude coordinate to monitor weather of (required if **latitude** is specified)."
  required: false
  type: float
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
{% endconfiguration %}

## Sensor

To add ZAMG sensor platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zamg
```

{% configuration %}
station_id:
  required: false
  description: The ID number for a supported ZAMG station.
  type: string
name:
  required: false
  description: Additional name for the sensors. Defaults to platform name.
  default: zamg
  type: string
latitude:
  required: false
  description: "Latitude coordinate to monitor weather of (required if **longitude** is specified)."
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
  type: float
longitude:
  required: false
  description: "Longitude coordinate to monitor weather of (required if **latitude** is specified)."
  default: "Defaults to coordinates defined in your `configuration.yaml` file."
  type: float
monitored_conditions:
  required: false
  description: Conditions to display in the frontend.
  type: list
  default: temperature
  keys:
    pressure:
      description: Pressure at station level
    pressure_sealevel:
      description: Pressure at sea Level
    humidity:
      description: Humidity
    wind_speed:
      description: Wind speed
    wind_bearing:
      description: Wind bearing
    wind_max_speed:
      description: Top wind speed
    wind_max_bearing:
      description: Top wind bearing
    sun_last_hour:
      description: Sun last hour percentage
    temperature:
      description: Temperature
    precipitation:
      description: Precipitation
    dewpoint:
      description: Dew point
{% endconfiguration %}

A full configuration example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zamg
    station_id: 11035
    name: Wien
    monitored_conditions:
      - temperature
      - humidity
```
