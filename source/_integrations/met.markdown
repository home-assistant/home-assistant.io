---
title: Meteorologisk institutt (Met.no)
description: Instructions on how to integrate Met.no with Home Assistant.
ha_category:
  - Weather
ha_release: 0.79
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
ha_domain: met
ha_platforms:
  - diagnostics
  - weather
ha_integration_type: service
related:
  - docs: /integrations/weather/
    title: Weather entity
  - url: https://api.met.no/doc/TermsOfService
    title: Met.no terms of service
---

The **Meteorologisk institutt (Met.no)** {% term integration %} uses the [Met.no](https://met.no/) web service to retrieve meteorological data for your location. The Norwegian Meteorological Institute and NRK provide the weather forecast. The service is free and does not require an API key.

{% include integrations/config_flow.md %}

By default, the integration uses your Home Assistant [home location](/docs/configuration/basic/). To retrieve weather data for additional locations, add the integration multiple times and specify different coordinates for each instance.

## Configuration options

{% configuration_basic %}
Name:
  description: "A name for this weather location. It is shown in the UI and used to form the entity ID."
Latitude:
  description: "The latitude of the location for which to retrieve weather data."
Longitude:
  description: "The longitude of the location for which to retrieve weather data."
Elevation:
  description: "The elevation (in meters) of the location. This affects the accuracy of the temperature forecast, especially in mountainous areas."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one `weather` entity per configured location. Each entity provides the current weather, a daily forecast, and an hourly forecast.

The entity exposes the following current-weather attributes:

- Temperature and dew point
- Humidity and pressure
- Visibility
- Wind speed, wind gust, and wind bearing
- Cloud coverage
- UV index

Forecasts additionally include precipitation and precipitation probability.

## Data updates

The integration {% term polling polls %} weather data every 55 to 65 minutes. The polling interval is randomized to spread load across the Met.no API.

When you update your Home Assistant home location, the integration automatically refreshes the weather data for instances tracking the home location.

## Known limitations

The integration uses the free Met.no public API. Usage is subject to the [Met.no terms of service](https://api.met.no/doc/TermsOfService), which include fair-use policies and attribution requirements.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
