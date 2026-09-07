---
title: Foreca
description: Instructions on how to integrate Foreca weather forecasts and air quality within Home Assistant.
ha_category:
  - Sensor
  - Weather
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@foreca-dev/maintainers'
  - '@EetuPelkonen'
ha_domain: foreca
ha_platforms:
  - diagnostics
  - sensor
  - weather
ha_integration_type: service
ha_quality_scale: bronze
---

The **Foreca** {% term integration %} uses the [Foreca Weather API](https://developer.foreca.com) to provide weather forecasts and air quality data for any location worldwide. [Foreca](https://business.foreca.com) is an independent weather company that has produced forecasts for consumer and business services since 1996.

You can use this integration free of charge with a Foreca Weather API Freemium subscription, which is strictly for non-commercial use. It also works with [Foreca's premium packages](https://business.foreca.com/weather-api/pricing), which allow commercial use and provide higher request limits and further weather products.

## Prerequisites

You need a Foreca Weather API key, from either subscription.

1. Go to [developer.foreca.com](https://developer.foreca.com) and create an account.
2. Choose the subscription that suits you. **Freemium** covers everything this integration does.
3. Verify your email address.
4. Go to **My API** and copy your API key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
    description: "The API key from the **My API** page of your Foreca developer account."
Location:
    description: "The location to retrieve weather and air quality data for. Defaults to the home location set in your Home Assistant configuration."
{% endconfiguration_basic %}

## Supported functionality

### Weather

The integration creates one weather {% term entity %} providing the current conditions, a daily forecast for the next 10 days, and an hourly forecast for the next 48 hours.

The current conditions include temperature, apparent temperature, dew point, humidity, air pressure, wind speed, wind gust speed, wind bearing, visibility, cloud coverage, and UV index.

### Sensors

Your plan usage:

- **API requests today**
  - **Description**: Requests this account has made today, counted in UTC days. Compare it against your plan's daily limit.
- **API requests this month**
  - **Description**: Requests this account has made in the current calendar month.
  - **Remarks**: Disabled by default.

Precipitation nowcast, based on weather radar in Europe and continental USA:

- **Precipitation start**
  - **Description**: When precipitation is expected to begin within the next hour. Unavailable when no precipitation is expected.
- **Precipitation forecast average**
  - **Description**: Average precipitation rate expected over the next hour.
- **Precipitation forecast total**
  - **Description**: Total precipitation expected over the next hour.

Measurements from the nearest reporting weather station:

- **Observation station**
  - **Description**: Name of the station the observations come from.
- **Observed temperature**, **Observed humidity**
  - **Description**: Measured values from that station.
- **Observed pressure**, **Observed wind speed**, **Observed wind gust speed**, **Observed snow depth**
  - **Description**: Further measured values from that station.
  - **Remarks**: Disabled by default. Enable the ones you need.

Unlike the forecast, these are measured values. The station can be some distance from the location you configured.

Current conditions and today's outlook:

- **Thunderstorm probability**
  - **Description**: Probability of thunder near the location right now.
- **Precipitation intensity**
  - **Description**: How hard it is precipitating right now, in millimeters per hour.
- **Precipitation type**
  - **Description**: Whether precipitation in the current hour falls as rain, mixed, or snow.
- **Solar radiation**
  - **Description**: Solar radiation reaching a level surface in the current hour. Useful for estimating solar panel output.
- **Snow depth**
  - **Description**: Depth of snow lying on the ground.
- **Sunshine duration**
  - **Description**: Total hours of sunshine expected today.
- **Solar radiation today**
  - **Description**: Total solar radiation expected today on a level surface.
- **Snow accumulation today**
  - **Description**: Snow expected to fall today.
- **Forecast confidence**
  - **Description**: How confident Foreca is in today's forecast: good, normal, or low.

Air quality:

- **Air quality index**
  - **Description**: General air quality index for the current hour. A lower value is better.
- **Dominant pollutant**
  - **Description**: The most significant pollutant for the current hour, for example, ozone or particulate matter.
- **Air quality index day 1**, **day 2**, and **day 3**
  - **Description**: Forecast air quality index for the next three days.
- **Carbon monoxide AQI**, **Nitrogen dioxide AQI**, **Ozone AQI**, **Sulphur dioxide AQI**, **PM10 AQI**, and **PM2.5 AQI**
  - **Description**: Air quality index for an individual pollutant for the current hour.
  - **Remarks**: Disabled by default. Enable the ones you need.

Air quality follows the US EPA air quality index. The values come from atmospheric composition models, blended with measurements from air quality monitoring stations where one is close by: near a station the first hours lean on the measurements and then fade into the model. Further from any station, the values are model output alone.

## Data updates

The integration {% term polling polls %} the Foreca Weather API every 30 minutes. Each update uses eight requests for one location, around 384 requests per day, which stays well inside the Freemium plan's daily limit of 2,000 requests. Every location you add polls separately, so the Freemium limit allows about five locations. Because the integration polls continuously, a Freemium key used this way does not go idle.

The `weather.get_forecasts` action reads the forecast the integration has already retrieved, so using it in templates and automations costs no extra requests.

## Use cases

- Delay irrigation when the daily forecast predicts rain.
- Close windows and switch on an air purifier when the air quality index rises.
- Warn ahead of a frosty night using the daily minimum temperature.

## Examples

### Notify when tomorrow's air quality gets worse

Entities are named after the location you configured. Replace `helsinki` in the example with your own location.

```yaml
automation:
  - alias: Air quality warning
    triggers:
      - trigger: numeric_state
        entity_id: sensor.helsinki_air_quality_index_day_1
        above: 50
    actions:
      - action: persistent_notification.create
        data:
          title: Air quality
          message: >-
            Tomorrow's air quality index is
            {{ states('sensor.helsinki_air_quality_index_day_1') }}.
```

## Known limitations

- The daily forecast provides dates without a time of day, so daily forecast entries are not anchored to a specific hour.
- The minute-by-minute precipitation nowcast uses weather radar in Europe and continental USA. Elsewhere it falls back to a lower-resolution forecast.
- Observations come from the nearest reporting station, which can be some distance away. Remote locations, including open ocean, have no station nearby, and the observation sensors stay unavailable there.
- The Freemium plan is for non-commercial use only and is provided on a best-effort basis, without a service level agreement or support. Commercial use needs a paid plan.
- A Freemium key deactivates after 30 days without any requests.
- The set of available weather products depends on your Foreca plan. See the [pricing page](https://business.foreca.com/weather-api/pricing) for what each plan includes.

## Troubleshooting

### The integration reports invalid authentication

- Check that the API key was copied in full from the **My API** page.
- Confirm that your subscription is still active in your [Foreca developer account](https://developer.foreca.com).
- Free plans require a verified email address before an API key works.
- A Freemium key that has gone 30 days without any requests is deactivated. Create a new key on the **My API** page.

### Entities show as unavailable

The integration marks entities unavailable when the API cannot be reached or the daily request limit is exceeded. Check your remaining requests on the **My API** page.

## Diagnostics

If you need to report a problem, select the three-dot menu on the Foreca integration entry and choose **Download diagnostics**. The file contains the latest data received from the API. Your API key and coordinates are removed from it automatically.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Revoking the API key itself is done on the **My API** page of your Foreca developer account.
