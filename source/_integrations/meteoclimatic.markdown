---
title: Meteoclimatic
description: Instructions on how to integrate Meteoclimatic within Home Assistant.
ha_release: '?'
ha_iot_class: Cloud Polling
ha_category:
  - Sensor
  - Weather
ha_codeowners:
  - '@adrianmo'
ha_config_flow: true
ha_domain: meteoclimatic
---

The `meteoclimatic` integration uses the [Meteoclimatic](https://www.meteoclimatic.net/) web service as a source for meteorological data for your location. The location is based on the `station_code` configured in your `configuration.yaml` file.

There is currently support for the following platforms within Home Assistant:

- [Sensor](#sensor)
- Weather

It displays the current weather reported by specific Meteoclimatic stations.

## Setup the integration

There are two ways to integrate Meteoclimatic in Home Assistant.

### Via the frontend

Menu: *Configuration* -> *Integrations*

Search for "Meteoclimatic", add your station code, click submit, you are done!

### Via the configuration file

To add Meteoclimatic to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
meteoclimatic:
  - station_code: ESCAT4300000043206B
```

{% configuration %}
  station_code:
    description: Station code belonging to a Meteoclimatic station.
    required: true
    type: string
{% endconfiguration %}


## Sensor

The following sensors will be created. Note that not all stations have the same physical sensors and capabilities (e.g. pluviometer, barometer, ...), therefore, some of these values may be populated for some stations. Check the Meteoclimatic station page for more information on your preferred station capabilities.

- `temp_current`: The current temperature in Celsius.
- `temp_max`: The maximum temperature in Celsius for the current day.
- `temp_min`: The minimum temperature in Celsius for the current day.
- `humidity_current`: The current humidity in percentage points.
- `humidity_max`: The maximum humidity in percentage points for the current day.
- `humidity_min`: The minimum humidity in percentage points for the current day.
- `pressure_current`: The current atmospheric pressure in hPa.
- `pressure_max`: The maximum atmospheric pressure in hPa for the current day.
- `pressure_min`: The minimum atmospheric pressure in hPa for the current day.
- `wind_current`: The current wind speed in km/h.
- `wind_max`: The maximum wind speed in km/h for the current day.
- `wind_bearing`: The current wind bearing in degrees.
- `rain`: Accumulated precipitation in mm for the current day.


### Complete example

You can configure and obtain weather data from more than one station This is an example configuration for 3 stations:

```yaml
# Complete example configuration.yaml entry
meteoclimatic:
  - station_code: ESCAT4300000043206B
  - station_code: ESMAD2800000028028B
  - station_code: ESCYL3400000034192A
```
