---
description: Instructions on how to integrate AEMET OpenData within Home Assistant.
ha_release: 2021.3
ha_domain: aemet
---

The **AEMET** {% term integration %} uses [AEMET OpenData](https://opendata.aemet.es/) as a source for current meteorological data for your location. AEMET stands for "Agencia Estatal de Meteorología", which is the Spanish Meteorological Agency.

There is currently support for the following entity types within Home Assistant:

- Image
- Sensor
- Weather

You need an API key, which is free but requires a [registration](https://opendata.aemet.es/centrodedescargas/altaUsuario).
The AEMET OpenData service is completely free but is limited to the Spanish territory.

## Configuration

To add AEMET OpenData integration go to {% my integrations title="**Settings** > **Devices & services**" %} and find the integration in the list.

{% configuration_basic %}
API Key:
  description: "API Key from the website"
Remind me before the API key expires:
  description: "Show a persistent notification three days before the API key expires."
API key generation date:
  description: "Date the API key was generated. Used to calculate the expiry date."
Name:
  description: "Name of the integration"
Location:
  description: "Latitude and longitude for weather forecast and sensor"
{% endconfiguration_basic %}

### API key expiry

AEMET API keys expire every three months. Enter the date the key was generated when adding or updating the integration. If you leave it empty, the current date is used. The generation date is only used by Home Assistant to calculate the expiry date.

When the API key expiry reminder is enabled, Home Assistant creates a persistent notification three days before the key expires, at 09:00 local time. When the key expires or AEMET rejects it, Home Assistant starts a reauthentication flow where you can enter a new API key and its generation date.

You can also update the API key and generation date from the integration options at any time.

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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
