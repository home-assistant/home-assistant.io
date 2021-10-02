---
title: Environment Canada Weather
description: Weather data from Environment Canada.
ha_category:
  - Weather
ha_platforms:
  - weather
ha_release: 0.95
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@michaeldavie'
  - '@gwww'
ha_domain: environment_canada
ha_config_flow: true
ha_quality_scale: gold
---

The `environment_canada` integration provides meteorological data for Canadian locations from [Environment and Climate Change Canada](https://weather.gc.ca/index_e.html).

{% include integrations/config_flow.md %}

## Location Selection

The integration automatically determines the closest weather station based on the latitude and longitude specified. If integration-specific coordinates are not provided, the coordinates configured for Home Assistant are used.

You can also specify a weather station to use by providing a identification code of the form `AB/s0000123`, based on those listed in [this CSV file](https://dd.weather.gc.ca/citypage_weather/docs/site_list_towns_en.csv).

## Entities

The integration will create the entities listed below. Note that many of the entities are disabled by default and can be enabled via the Configuration / Entities screen.

### Weather

- Current conditions and daily forecast
- Current conditions and hourly forecast
