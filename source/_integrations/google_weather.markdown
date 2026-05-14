---
title: Google Weather
description: Instructions on how to integrate Google Weather within Home Assistant.
ha_category:
  - Weather
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: google_weather
ha_codeowners:
  - '@tronikos'
ha_integration_type: service
ha_quality_scale: bronze
ha_platforms:
  - sensor
  - weather
---

This {% term integration %} uses [Google Weather](https://developers.google.com/maps/documentation/weather) as a source for weather data for your location.

## Prerequisites

You need an API key. Follow instructions [in the Google developer documentation](https://developers.google.com/maps/documentation/weather/get-api-key) for creating an API key.

{% note %}
For pricing refer to the [billing section in the Google developer documentation](https://developers.google.com/maps/documentation/weather/usage-and-billing).

It is free as long as you stay under 10,000 requests per month.
{% endnote %}

{% include integrations/config_flow.md %}

## Data updates

The integration fetches:

- current weather conditions every 15 minutes
- daily weather forecast for the next 10 days every 1 hour
- hourly weather forecast for the next 24 hours every 1 hour

This results in 4,464 requests per month, meaning you could have up to 2 locations and still stay under the 10,000 free usage cap.

The `weather.get_forecasts` action uses the cached forecast data and will not issue any additional API calls to Google. You can use this action safely in templates or automations without affecting your quota usage.

## Known limitations

- Weather forecast information isn't currently available in South Korea and Japan. Refer to the [Google Help Center](https://support.google.com/websearch/answer/13687874).


## Troubleshooting

- [Enable debug logging](https://www.home-assistant.io/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and attach logs before opening an issue.


## Removing the integration

{% include integrations/remove_device_service.md %}
