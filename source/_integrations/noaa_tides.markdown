---
title: NOAA Tides
description: Instructions to add NOAA Tide information to Home Assistant.
ha_category:
  - Environment
ha_release: 0.75
ha_iot_class: Cloud Polling
ha_domain: noaa_tides
ha_config_flow: true
ha_codeowners:
  - '@jdelaney72'
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: legacy
---

The **NOAA Tides** {% term integration %} uses details from [NOAA Tides and Currents](https://tidesandcurrents.noaa.gov/api/) to provide information about tide predictions for any [station](https://tidesandcurrents.noaa.gov/tide_predictions.html) in the United States.

{% include integrations/config_flow.md %}

## Setup

This {% term integration %} requires the use of a NOAA station ID. Search [NOAA Tide Predictions](https://tidesandcurrents.noaa.gov/tide_predictions.html) to find a location. Use the ID from the search results in your configuration. Alternatively, you can determine a station ID from a URL. For example, `8721164` in the following URL: `https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8721164`

{% configuration_basic  %}
Station ID:
  description: ID of the station you'd like to track from <https://tidesandcurrents.noaa.gov/tide_predictions.html>.
Time Zone:
  description: User-selected timezone.
  default: Local Standard Time/Local Daylight Time.
  keys:
    GMT:
      description: Greenwich Mean Time.
    Local Standard Time:
      description: Local Standard Time, not corrected for Daylight Saving Time, local to the requested station.
    Local Standard Time / Local Daylight Time:
      description: Local Standard Time, corrected for Daylight Saving Time when appropriate, local to the requested station.
Unit System:
  description: User-selected unit system.
  default: Defaults to `metric` or `imperial` based on the Home Assistant configuration.
  keys:
    Metric:
      description: Metric units (Celsius, meters, cm/s appropriate for the data)
    English:
      description: English units (fahrenheit, feet, knots appropriate for the data)
{% endconfiguration_basic  %}
