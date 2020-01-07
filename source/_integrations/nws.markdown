---
title: "NWS"
description: "Instructions on how to integrate National Weather Service data within Home Assistant."
logo: nws.png
ha_category: Weather
ha_release: 0.99
ha_iot_class: Cloud Polling
---

The `nws` platform uses the [National Weather Service](https://www.weather.gov) web API as a source for meteorological data for your location.

## Configuration

To add NWS to your installation, go to Configuration >> Integrations in the UI and select National Weather Service (NWS) integration.

According to the [API documentation](https://www.weather.gov/documentation/services-web-api/), a string is required for the API key, and an email address is suggested to be included within the string.

A list of nearby stations is provided during integration setup via UI. Stations can also be found on the [NOAA website](https://www.cnrfc.noaa.gov/metar.php).

This integration creates two weather entities, one with 2 forecasts daily (day and night) and one with hourly forecasts. The daynight entity uses the time at which the forecast starts as the provided time.

{% configuration %}
api_key:
  description: "Your API key. Any string, but an email address is suggested to be included."
  required: true
  type: string
latitude:
  description: "The provided value will be taken from the Home Assistant configuration."
  required: true
  type: float
longitude:
  description: "The provided value will be taken from the Home Assistant configuration."
  required: true
  type: float
station:
  description: "METAR station code. A list of nearby stations will be provided. The list is sorted by distance in ascending order."
  required: true
  type: string
{% endconfiguration %}

Details about the API are available in the [NWS API documentation](https://www.weather.gov/documentation/services-web-api). The [pynws](https://github.com/MatthewFlamm/pynws) library is used to retrieve data.
