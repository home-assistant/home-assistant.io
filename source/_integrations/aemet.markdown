---
title: AEMET OpenData
description: Instructions on how to integrate AEMET OpenData within Home Assistant.
ha_release: 2021.3
ha_category:
  - Sensor
  - Weather
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: aemet
ha_platforms:
  - diagnostics
  - image
  - sensor
  - weather
ha_integration_type: integration
ha_codeowners:
  - '@Noltari'
---

The AEMET weather platform uses [AEMET OpenData](https://opendata.aemet.es/) as a source for current meteorological data for your location. AEMET stands for "Agencia Estatal de Meteorología", which is the Spanish Meteorological Agency.

There is currently support for the following entity types within Home Assistant:

- Image
- Sensor
- Weather

You need an API key, which is free but requires a [registration](https://opendata.aemet.es/centrodedescargas/altaUsuario).
The AEMET OpenData service is completely free but is limited to the Spanish territory.

## Configuration

To add AEMET OpenData integration go to **Settings** -> **Devices & Services** and find the integration in the list.

{% configuration_basic %}
API Key:
  description: "API Key from the website"
Name:
  description: "Name of the integration"
Latitude:
  description: "Latitude for weather forecast and sensor"
Longitude:
  description: "Longitude for weather forecast and sensor"
{% endconfiguration_basic %}

The integration creates one weather entity per forecast mode and also sensors for all available conditions. There are two forecast modes, `daily` for daily forecast up to 6 days or `hourly` for an hourly forecast up to 3 days.

For each condition, the following sensors are created:

| Condition           | Description                          |
| :------------------ | :----------------------------------- |
| condition           | Current weather condition code.      |
| humidity            | Relative humidity.                   |
| pressure            | Sea-level air pressure in millibars. |
| rain                | Rain volume.                         |
| rain_probability    | Probability of rain.                 |
| snow                | Snow volume.                         |
| snow_probability    | Probability of snow.                 |
| station_id          | Closest AEMET station ID.            |
| station_name        | Closest AEMET station name.          |
| station_timestamp   | Timestamp of AEMET station data.     |
| storm_probability   | Probability of storm.                |
| temperature         | Current temperature.                 |
| temperature_feeling | Relative temperature.                |
| town_id             | Closest AEMET town ID.               |
| town_name           | Closest AEMET town name.             |
| town_timestamp      | Timestamp of AEMET town data.        |
| wind_bearing        | Wind bearing.                        |
| wind_max_speed      | Max Wind speed.                      |
| wind_speed          | Wind speed.                          |

The integration creates an image entity for the weather radar if the radar option is enabled.

Details about the API are available in the [AEMET OpenData documentation](https://opendata.aemet.es/dist).
