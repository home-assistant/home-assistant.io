---
description: Instructions on how to integrate Météo-France within Home Assistant.
ha_release: 0.89
ha_domain: meteo_france
---

The **Météo-France** {% term integration %} uses the meteorological data from [Météo-France](https://meteofrance.com/) to provide weather forecasts for any location in the world, with a focus on France. You can add one or more locations.

For each location, it provides a weather entity with the current conditions and the forecasts, and sensors for the current weather, the rain expected within the next hour and the weather alerts of the department.

## Use cases

- Get notified when Météo-France raises an orange or red weather alert for your department.
- Close the shutters or bring in the garden furniture before strong wind.
- Skip watering the garden when rain is expected within the hour.
- Show the forecast for your home or your holiday location on a dashboard.

{% include integrations/config_flow.md %}

{% configuration_basic %}
City:
  description: "Postal code or city name of the location you want weather forecasts for. Postal codes are only supported in France. If several cities match your search, choose the right one from the list."
{% endconfiguration_basic %}

## Supported functionality

### Weather

The weather entity shows the current conditions and provides daily and hourly forecasts. Use it with the [weather forecast card](/dashboards/weather-forecast/) or the [`weather.get_forecasts`](/actions/weather.get_forecasts/) action.

### Sensors

The following sensors are created for each location:

|Entity|Description|Enabled by default|
|------|-----------|------------------|
|`cloud`|The current cloud cover in %|Yes|
|`daily_original_condition`|The weather condition of the day, as described by Météo-France|No|
|`freeze_chance`|Probability of temperature below 0°C in the following hours|Yes|
|`humidity`|The current humidity in %|Yes|
|`next_rain`|Date and time of the next rain if expected within the next hour|Yes|
|`original_condition`|The current weather condition, as described by Météo-France|No|
|`precipitation`|Precipitation expected for the day in mm|Yes|
|`pressure`|The current pressure in hPa|No|
|`rain_chance`|Probability of rain in the following hours|Yes|
|`snow_chance`|Probability of snow in the following hours|Yes|
|`temperature`|The current temperature in °C|No|
|`uv`|The UV index of the day|Yes|
|`weather_alert`|Weather alert level of the department ([see below](#about-the-weather_alert-sensor))|Yes|
|`wind_gust`|The current wind gust speed in km/h|No|
|`wind_speed`|The current wind speed in km/h|No|

The sensors disabled by default show values that the weather entity already provides. To use them, [enable them](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

#### About the `next_rain` sensor

The attributes give the type of rain expected for the next hour, by intervals of 5 to 10 minutes:

- `forecast_time_ref`: the start of the forecast, as a UTC timestamp in ISO format.
- `1_hour_forecast`: the type of rain for each interval.

The types of rain come from Météo-France and are in French. Values seen so far are `Temps sec`, `Pluie faible`, `Pluie modérée` and `Pluie forte`.

Example:

```yaml
forecast_time_ref: '2020-08-20T19:25:00+00:00'
1_hour_forecast:
  0 min: Temps sec
  5 min: Temps sec
  10 min: Temps sec
  15 min: Temps sec
  20 min: Temps sec
  25 min: Pluie faible
  35 min: Pluie faible
  45 min: Pluie modérée
  55 min: Pluie modérée
```

#### About the `weather_alert` sensor

The state is the highest alert level for the department of the city: `Vert`, `Jaune`, `Orange` or `Rouge`. The attributes give the alert level for each type of weather event, such as wind, rain or thunderstorms.

## Data updates

The integration {% term polling polls %} Météo-France for new data:

- Forecasts and current conditions: every 15 minutes.
- Rain within the next hour: every 5 minutes.
- Weather alerts: every 15 minutes.

## Examples

{% include docs/paste_yaml_tip.md %}

The examples below use the entities of a location named Paris. Replace them with your own.

### Notify on orange or red weather alerts

{% details "YAML example for weather alert notifications" %}

{% example %}
automation: |
  alias: "Notify on Météo-France weather alert"
  triggers:
    - trigger: state
      entity_id: sensor.paris_weather_alert
      to:
        - "Orange"
        - "Rouge"
  actions:
    - action: notify.notify
      data:
        message: "Météo-France weather alert: {{ trigger.to_state.state }}"
{% endexample %}

{% enddetails %}

### Notify when rain is expected within the hour

{% details "YAML example for rain notifications" %}

{% example %}
automation: |
  alias: "Notify when rain is coming"
  triggers:
    - trigger: state
      entity_id: sensor.paris_next_rain
      from: "unknown"
      not_to: "unavailable"
  actions:
    - action: notify.notify
      data:
        message: "Rain expected at {{ as_timestamp(trigger.to_state.state) | timestamp_custom('%H:%M') }}"
{% endexample %}

{% enddetails %}

## Known limitations

- Weather alerts are only available for metropolitan France and Andorra.
- Only one city per department provides the weather alert sensor. If you add several cities in the same department, only the first one gets it.
- The rain forecast for the next hour is only available in the areas covered by Météo-France.
- The probability sensors are only created when Météo-France provides this data for the location.
- The weather descriptions, the types of rain and the alert levels come from Météo-France and are always in French.

## Troubleshooting

### The city search returns no result

Try the postal code instead of the city name, or the name of a nearby city. Postal codes are only supported in France.

### The weather alert sensor is missing

The city is outside metropolitan France and Andorra, or another city in the same department already provides the weather alert sensor.

### The rain sensor is missing

The location is outside the area covered by the rain forecast, or the rain forecast was not available when the integration started. Reload the integration to try again.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
