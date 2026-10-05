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

## Use cases

- Show the weather for home on a dashboard with the weather card, and add a second zone to see the weather at a holiday home or your parents' place next to it.
- Get a reminder to bring in the laundry, or to skip watering the garden, when rain is expected.
- Get a warning the evening before a frosty night, to cover your plants or put a cover on the car's windshield.
- Close the awning or sunscreens ahead of a windy day.

## Examples

The examples below use the daily forecast of the Home zone, `weather.home`, read with the [`weather.get_forecasts`](/integrations/weather/#action-weatherget_forecasts) action. The first day in the forecast is today, the second one is tomorrow.

### Notify when rain is expected tomorrow

Every evening at 20:00, this automation checks the forecast for tomorrow, and sends a notification when rain is expected.

{% raw %}

```yaml
automation:
  - alias: "Rain expected tomorrow"
    triggers:
      - trigger: time
        at: "20:00:00"
    actions:
      - action: weather.get_forecasts
        target:
          entity_id: weather.home
        data:
          type: daily
        response_variable: forecast
      - variables:
          tomorrow: "{{ forecast['weather.home'].forecast[1] }}"
      - condition: template
        value_template: "{{ tomorrow.precipitation | float(0) > 0 }}"
      - action: notify.notify
        data:
          message: >
            Rain is expected tomorrow: {{ tomorrow.precipitation }}
            {{ state_attr('weather.home', 'precipitation_unit') }}.
```

{% endraw %}

### Warn about frost tomorrow

Every evening at 18:00, this automation sends a notification when the low for tomorrow is below freezing, so you have time to cover your plants. It compares the low with 0, for temperatures in °C; use 32 instead when your Home Assistant uses °F.

{% raw %}

```yaml
automation:
  - alias: "Frost expected tomorrow"
    triggers:
      - trigger: time
        at: "18:00:00"
    actions:
      - action: weather.get_forecasts
        target:
          entity_id: weather.home
        data:
          type: daily
        response_variable: forecast
      - variables:
          tomorrow: "{{ forecast['weather.home'].forecast[1] }}"
      - condition: template
        value_template: "{{ tomorrow.templow | float(99) < 0 }}"
      - action: notify.notify
        data:
          message: >
            Frost is expected tomorrow, down to {{ tomorrow.templow }}
            {{ state_attr('weather.home', 'temperature_unit') }}. Cover your plants!
```

{% endraw %}

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
