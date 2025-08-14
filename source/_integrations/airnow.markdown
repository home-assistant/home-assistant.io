---
title: AirNow
description: Instructions on how to integrate AirNow within Home Assistant.
ha_category:
  - Health
ha_release: 2021.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@asymworks'
ha_domain: airnow
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The **AirNow** {% term integration %} uses the [AirNow](https://www.airnow.gov/) web service
as a source for air quality data for your location.

## Setup

To generate an AirNow API key, go to the [AirNow Developer Tools](https://docs.airnowapi.org/account/request/) page.

{% include integrations/config_flow.md %}

## Troubleshooting

The EPA AirNow API is often flaky and will occasionally not return any results for a particular location. This will prevent the integration from being added to Home Assistant, but the situation is usually temporary and will resolve itself later.

If the integration continues to report "No results found for that location" and cannot be added to Home Assistant, please do the following before submitting a bug report.

First, navigate to the [AirNow Current Observations By Lat/Lon](https://docs.airnowapi.org/CurrentObservationsByLatLon/query) page, enter the same latitude/longitude and station radius, select `application/json` as the output format, select "Build" and then "Run".

If the query returns a result other than `[]`, open a bug report and include the query result (you may sanitize the data to remove your latitude and longitude, but please do not remove any fields). This information will help a lot to figure out the source of the issue.

{% note %}
The AirNow API allows 500 data updates per hour, but since observations are only updated hourly, the default update rate is set to 2 per hour and should not trigger rate limiting. If you use this API key for other purposes, ensure the total request rate does not exceed 500 per hour.
{% endnote %}
