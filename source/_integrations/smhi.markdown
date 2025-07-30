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

The integration creates entities showing the current state of some additional weather metrics.

| Sensor                    | Type              | Description                                                                                                                 |
| ------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Thunder probability       | %                 | Probability of thunder.                                                                                                    |
| Total cloud coverage      | %                 | Mean value of total cloud cover.                                                                                            |
| Low cloud coverage        | %                 | Mean value of low level cloud cover.                                                                                        |
| Medium cloud coverage     | %                 | Mean value of medium level cloud cover.                                                                                     |
| High cloud coverage       | %                 | Mean value of high level cloud cover.                                                                                       |
| Precipitation category    | None              | Precipitation category can be any of: No precipitation, Snow, Snow and rain, Rain, Drizzle, Freezing rain, Freezing drizzle. |
| Frozen precipitation      | %                 | Percent of precipitation in frozen form.                                                                                    |

The cloud sensors are not enabled by default.

The SMHI weather service is free under the Creative Commons Attribution 4.0, international license. Weather data will be pulled once every 30 minutes.

Details about the API are available in the [SMHI API documentation](https://opendata.smhi.se/metfcst/pmp/introduction).

## Remove the integration

{% include integrations/remove_device_service.md %}
