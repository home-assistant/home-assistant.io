---
title: GeoSphere Austria Forecast
description: Instructions on how to integrate GeoSphere Austria weather forecasts within Home Assistant.
ha_categories:
  - weather_alerts.forecasts
ha_release: '2026.12'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Ziykuna'
ha_domain: geosphere_austria_forecast
ha_platforms:
  - weather
ha_integration_type: service
ha_quality_scale: bronze
---

The **GeoSphere Austria Forecast** {% term integration %} provides hourly weather forecasts from the weather model of [GeoSphere Austria](https://www.geosphere.at), the Austrian national weather service (formerly known as ZAMG). You can add any location in Austria and the surrounding area.

The forecast comes from a numerical weather prediction model with a resolution of about 1 km. The model calculates a new forecast every three hours, each reaching up to about two and a half days ahead.

Forecast data is provided by GeoSphere Austria under the [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) license.

To get current measurements from a GeoSphere Austria weather station instead, use the [GeoSphere Austria](/integrations/zamg/) integration. For official weather warnings, use the [GeoSphere Austria Warnings](/integrations/geosphere_austria_warnings/) integration.

## Use cases

- Show the hourly forecast for your home on a dashboard.
- Close the awnings when the forecast shows strong wind gusts.
- Skip watering the garden when rain is expected in the next few hours.

## Prerequisites

The location must be within the area covered by the forecast model: Austria and the surrounding area, from about 43.0° to 51.5° north and from 5.0° to 22.6° east. No account or API key is required.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Location:
    description: "The location to get the forecast for. Defaults to the home location set in your Home Assistant configuration. If you keep the home location, the location gets the name of your home, as set under **Settings** > **System** > **General**. Otherwise, it is named after its coordinates. You can rename it afterward."
{% endconfiguration_basic %}

## Adding more locations

Each location is a separate entry with its own weather entity. To get the forecast for more than one location, add the integration again and select a different location.

Locations that are close together can fall into the same 1 km cell of the forecast model. Such a location is not added again, because it would get the same forecast, and the form shows **Location is already configured**.

## Supported functionality

Each location adds one service {% term device %} with a weather {% term entity %}.

### Weather

The weather entity shows the forecast for the current hour. Its state is the expected weather condition, and it provides the following values:

- Temperature
- Humidity
- Cloud coverage
- Air pressure at sea level
- Wind speed and wind bearing
- Wind gust speed

The hourly forecast starts with the current hour and includes:

- Condition
- Temperature
- Humidity
- Cloud coverage
- Precipitation, including snow
- Air pressure at sea level
- Wind speed, wind gust speed, and wind bearing

All values are forecasts from the weather model, not measurements. Precipitation and wind gusts in a forecast entry cover the hour that ends at its time. For example, the entry for 14:00 shows the precipitation and the strongest wind gust expected between 13:00 and 14:00. The other values are expected for the time of the entry.

To use the hourly forecast in automations and templates, use the [`weather.get_forecasts`](/integrations/weather/#examples) action. The weather integration documentation shows an example.

## Data updates

The integration {% term polling polls %} the forecast once per hour for each location. At the start of every hour, the weather entity moves on to the forecast for the new hour without a new request.

GeoSphere Austria allows 240 forecast requests per hour and 5 per second. Adding a location requests its forecast once to check the location and once more to set it up. When it updates the forecasts, the integration sends no more than 5 requests per second for all locations together. Using the `weather.get_forecasts` action does not cause any requests.

## Known limitations

- Only an hourly forecast is available. The integration does not provide a daily forecast.
- The weather condition is shown as GeoSphere Austria provides it. Clear skies at night are shown as sunny.
- Values that the hourly forecast of Home Assistant has no field for, such as sunshine duration, global radiation, and snow line, are not provided.
- The GeoSphere Austria service can be slow to respond. Adding a location can take up to a minute.

## Troubleshooting

### The location is outside the area covered by the GeoSphere Austria forecast model

The selected location is outside the area of the forecast model. Select a location in Austria or the surrounding area.

### Failed to connect

The GeoSphere Austria service could not be reached or did not respond in time. Try again later. If the problem persists, check your internet connection.

### Entities are unavailable

The forecast could not be updated. Home Assistant tries again automatically, and the entities recover once the GeoSphere Austria service is available again. Each location is retried on its own, so a problem with one location does not affect the others.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
