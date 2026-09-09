---
title: Foreca
description: Instructions on how to integrate Foreca weather forecasts within Home Assistant.
ha_category:
  - Weather
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@foreca-dev/maintainers'
  - '@EetuPelkonen'
ha_domain: foreca
ha_platforms:
  - weather
ha_integration_type: service
ha_quality_scale: bronze
---

The **Foreca** {% term integration %} uses the [Foreca Weather API](https://developer.foreca.com) to provide weather forecasts for any location worldwide. [Foreca](https://business.foreca.com) is an independent weather company that has produced forecasts for consumer and business services since 1996.

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
{% endconfiguration_basic %}

Setup asks only for the API key. You then add one or more locations to it, each of which becomes a device with its own weather entity.

{% configuration_basic %}
Location:
    description: "The location to retrieve weather data for. Defaults to the home location set in your Home Assistant configuration."
{% endconfiguration_basic %}

To add another location later, select **Add location** on the Foreca entry under **Settings** > **Devices & services**. One API key covers as many locations as its request limit allows.

## Supported functionality

### Weather

The integration creates one weather {% term entity %} per location, providing the current conditions, a daily forecast for the next 10 days, and an hourly forecast for the next 48 hours.

The current conditions include temperature, apparent temperature, dew point, humidity, air pressure, wind speed, wind gust speed, wind bearing, visibility, cloud coverage, and UV index.

## Data updates

The integration {% term polling polls %} the Foreca Weather API every 30 minutes. Each update uses three requests per location, around 144 requests per day for one location, which stays well inside the Freemium plan's daily limit of 2,000 requests. Every location you add polls separately, so that limit allows around 13 of them. Because the integration polls continuously, a Freemium key used this way does not go idle.

The `weather.get_forecasts` action reads the forecast the integration has already retrieved, so using it in templates and automations costs no extra requests.

## Use cases

- Delay irrigation when the daily forecast predicts rain.
- Switch on a fan when the hourly forecast shows the temperature climbing.
- Warn ahead of a frosty night using the daily minimum temperature.

## Known limitations

- The API dates a daily forecast rather than timing it, so each daily entry is reported at midnight UTC.
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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Revoking the API key itself is done on the **My API** page of your Foreca developer account.
