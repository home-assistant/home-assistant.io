---
title: National Weather Service (NWS)
description: Instructions on how to integrate National Weather Service data within Home Assistant.
ha_category: Weather
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MatthewFlamm'
ha_domain: nws
ha_quality_scale: silver
ha_config_flow: true
---

The `nws` platform uses the [National Weather Service](https://www.weather.gov) web API as a source for meteorological data for your location.

## Configuration

To add `nws` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **National Weather Service (NWS)**. Multiple entries can be configured, but a unique set of latitude and longitude must be supplied for each.

According to the [API documentation](https://www.weather.gov/documentation/services-web-api/), a string is required for the API key, and an email address is suggested to be included within the string.

Providing a METAR station code is optional, and if not supplied, the closest station to the latitude and longitude will be chosen. A list of nearby stations is printed to the log with level `DEBUG` if no station is supplied. Stations can also be found on the [NOAA website](https://www.cnrfc.noaa.gov/metar.php). Codes with only three characters, for example, `ADW` should be prefixed with the letter K, `KADW`.

Two weather entities are created for each entry in the configuration: one for hourly forecasts and one for day and night forecasts. The time supplied for each forecast is the start time for the forecast.

Details about the API are available in the [NWS API documentation](https://www.weather.gov/documentation/services-web-api). The [pynws](https://github.com/MatthewFlamm/pynws) library is used to retrieve data.
