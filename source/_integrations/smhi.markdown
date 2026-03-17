---
title: SMHI
description: Instructions on how to integrate SMHI forecasts within Home Assistant.
ha_category:
  - Hub
  - Sensor
  - Weather
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: smhi
ha_platforms:
  - sensor
  - weather
ha_codeowners:
  - '@gjohansson-ST'
ha_integration_type: integration
---

The **SMHI** {% term integration %} adds support for the [SMHI.se](https://www.smhi.se/) web service as a source for meteorological data for your location.

{% important %}

Only locations close to Sweden can be added. See [SMHI.se area](https://opendata.smhi.se/metfcst/pmp/geographic_area) for more details which locations are supported.

{% endimportant %}

{% include integrations/config_flow.md %}

## Weather

The weather entity provides the current state of the weather as well as detailed forecasts for daily, hourly, and twice-daily weather.

## Sensors

The integration creates entities showing the current state of some additional weather and fire metrics.

The following weather sensors are provided (cloud sensors are disabled by default):

- **Thunder probability** (%): Probability of thunder
- **Total cloud coverage** (%): Mean value of total cloud cover
- **Low cloud coverage** (%): Mean value of low-level cloud cover
- **Medium cloud coverage** (%): Mean value of medium-level cloud cover
- **High cloud coverage** (%): Mean value of high-level cloud cover
- **Precipitation category**: Precipitation category can be any of the following: No precipitation, Snow, Snow and rain, Rain, Drizzle, Freezing rain, or Freezing drizzle
- **Frozen precipitation** (%): Percent of precipitation in frozen form

The following fire sensors are provided (fire sensors are disabled by default):

- **FWI-index**: Fire weather index classified from low risk to very high risk
- **FWI-value**: Fire weather index as its native value
- **Initial spread index (ISI)**: Describes the expected rate of fire spread
- **Build up index (BUI)**: Indicates the total amount of fuel available for the fire
- **Fine fuel moisture code (FFMC)**: Describes the moisture content in the dead fine fuels
- **Duff moisture code (DMC)**: Describes moisture content of loosely compacted organic layers of moderate depth
- **Drought code (DC)**: Describes moisture content of deep compact organic layers
- **Highest grass fire risk**: Highest grass fire risk (danger) according to the grass fire model ranging from snow cover to very high
- **Potential rate of spread**: Potential rate of spread (m/min) of uncut and ungrazed natural grass
- **Fuel drying**: Measure of the available water amount in the forest fuel ranging from extremely dry to very wet

The SMHI weather service is free under the Creative Commons Attribution 4.0, international license. Weather data will be pulled once every 30 minutes.

Details about the API are available in the [SMHI API documentation](https://opendata.smhi.se/metfcst/pmp/introduction).

## Remove the integration

{% include integrations/remove_device_service.md %}
