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
ha_quality_scale: platinum
ha_platforms:
  - diagnostics
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

{% include integrations/actions.md %}

## Google Weather automation examples

The forecast data becomes most useful when something acts on it. Here are a couple of ideas to get you started. For the full walkthrough of the action these use, see [Get minute forecast](/actions/google_weather.get_minute_forecast/).

{% include docs/paste_yaml_tip.md %}

### Automation: get a heads-up before rain starts

Check the precipitation nowcast every 15 minutes, and send a notification when precipitation is expected to begin within the next half hour. It only looks at segments that haven't started yet, so it stays quiet once the rain has arrived. At this cadence the automation adds about 2,900 calls per month, which fits alongside one configured location but not two.

- **Trigger**: Time pattern, every 15 minutes
- **Action**: Google Weather: Get minute forecast
  - **Target**: Home (`weather.home`)
  - **Response variable**: `nowcast`
- **Condition**: Template, the next precipitation starts within 30 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

### Automation: skip the sprinklers when rain is on the way

Before the evening watering run, check the nowcast and only turn the sprinklers on when less than 1 mm of rain is expected over the next 6 hours.

- **Trigger**: Time, 19:00:00
- **Action**: Google Weather: Get minute forecast
  - **Target**: Home (`weather.home`)
  - **Response variable**: `nowcast`
- **Condition**: Template, less than 1 mm of rain expected in total
- **Action**: Turn on switch
  - **Target**: Sprinklers

## Data updates

The integration fetches:

- current weather conditions every 15 minutes
- daily weather forecast for the next 10 days every 1 hour
- hourly weather forecast for the next 24 hours every 1 hour

This results in 4,464 requests per month, meaning you could have up to 2 locations and still stay under the 10,000 free usage cap.

The `weather.get_forecasts` action uses the cached forecast data and will not issue any additional API calls to Google. You can use this action safely in templates or automations without affecting your quota usage.

The `google_weather.get_minute_forecast` action works differently: it is not cached, and every call sends a new request to Google that counts toward your quota. With one location configured, about 5,500 of the 10,000 free monthly requests are left for it, which is roughly one call every 8 minutes. Call it on a schedule you control, such as a time pattern, rather than from a template that re-renders on its own.


## Known limitations

- Weather forecast information isn't currently available in South Korea and Japan. Refer to the [Google Help Center](https://support.google.com/websearch/answer/13687874).
- Google offers the precipitation nowcast used by the `google_weather.get_minute_forecast` action as an experimental, pre-general-availability feature. Its segments are 2 or 15 minutes long depending on the location, and its availability in your area can change.


## Troubleshooting

- [Enable debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and attach logs before opening an issue.


## Removing the integration

{% include integrations/remove_device_service.md %}
