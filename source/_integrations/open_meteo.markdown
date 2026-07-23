---
title: Open-Meteo
description: Instructions on how to integrate Open-Meteo within Home Assistant.
ha_category:
  - Weather
ha_release: 2022.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: open_meteo
ha_platforms:
  - diagnostics
  - weather
ha_integration_type: service
---

The **Open-Meteo** {% term integration %} adds free weather forecasts to Home Assistant for any location you choose, with no account or API key to set up.

[Open-Meteo](https://open-meteo.com) is a weather service that is free for open-source and non-commercial use. It works together with national weather services and picks the best available forecast model for your location, at a resolution of 1 to 11 km. Point it at your home, a holiday address, or any other place you have set up as a zone, and Home Assistant gets the current conditions and a forecast you can show on a dashboard or use to drive automations, such as a reminder to bring in the laundry before the rain arrives.

## Prerequisites

You need a {% term zone %} to forecast for. Home Assistant already has a Home zone set to your installation's location, so in most cases there is nothing to prepare. To forecast for another place, add a zone first under {% my zones title="**Settings** > **Areas, labels & zones**" %}.

No account or API key is required.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Zone:
  description: "The zone whose location is used for the weather forecast. Choose the Home zone, or any other zone you have created."
{% endconfiguration_basic %}

Each zone you add gives you one weather entity, named after that zone. To forecast for more than one location, add the integration again and choose a different zone.

## Supported functionality

### Weather

The integration provides a single weather entity for the selected zone. It reports the current conditions along with a daily and an hourly forecast.

The current conditions include:

- The weather condition, such as sunny, cloudy, or rainy
- Temperature
- Wind speed and direction

The daily forecast adds a high and low temperature, expected precipitation, and wind for each day. The hourly forecast covers the condition, temperature, and precipitation for the hours ahead.

You can show the forecast on a dashboard with the weather card, or read it in an automation or script with the [`weather.get_forecasts`](/integrations/weather/) action. Temperature, wind speed, and precipitation are shown in the units from your Home Assistant settings.

## Data updates

Home Assistant {% term polling polls %} Open-Meteo for new data every 30 minutes.

## Known limitations

- Open-Meteo is free for open-source and non-commercial use. For commercial use, see the [Open-Meteo website](https://open-meteo.com).
- A forecast is only as precise as the weather model available for the chosen location, so accuracy varies from place to place.
- New data arrives every 30 minutes, so the current conditions are not real-time.

## Troubleshooting

### The weather entity shows as unavailable

Open-Meteo is an online service. If the weather entity becomes unavailable, check that your Home Assistant instance can reach the internet. The entity recovers on its own once Open-Meteo is reachable again and the next update succeeds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
