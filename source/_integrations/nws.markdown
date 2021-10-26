---
title: National Weather Service (NWS)
description: Instructions on how to integrate National Weather Service data within Home Assistant.
ha_category: Weather
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MatthewFlamm'
ha_domain: nws
ha_quality_scale: platinum
ha_config_flow: true
ha_platforms:
  - sensor
  - weather
---

The `nws` platform uses the [National Weather Service](https://www.weather.gov) web API as a source for meteorological data for your location.

{% include integrations/config_flow.md %}

According to the [API documentation](https://www.weather.gov/documentation/services-web-api/), a string is required for the API key, and an email address is suggested to be included within the string.

Providing a METAR station code is optional, and if not supplied, the closest station to the latitude and longitude will be chosen. A list of nearby stations is printed to the log with level `DEBUG` if no station is supplied. Stations can also be found on the [NOAA website](https://www.cnrfc.noaa.gov/metar.php). Codes with only three characters, for example, `ADW` should be prefixed with the letter K, `KADW`.

Two weather entities are created for each entry in the configuration: one for day and night forecasts and one for hourly forecasts. The hourly forecast entity is disabled after configuration but can be enabled by the user. The time supplied for each forecast is the start time for the forecast. Sensors are also created as disabled entities after configuration and can be enabled by the user.

Details about the API are available in the [NWS API documentation](https://www.weather.gov/documentation/services-web-api). The [pynws](https://github.com/MatthewFlamm/pynws) library is used to retrieve data.
