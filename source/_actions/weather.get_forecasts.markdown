---
title: "Get weather forecasts"
action: weather.get_forecasts
domain: weather
description: "Retrieves the forecasts from one or more weather entities."
---

Use this action to retrieve the forecast from one or more weather entities, for example to read out tomorrow's weather or to drive an automation based on the chance of rain.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get weather forecasts from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the weather entity you want to read. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Get weather forecasts**.
7. Select the **Forecast type** to retrieve.
8. In the **Response variable** field, enter a name to store the forecast data in. Choose a short, descriptive name that reflects what it holds, such as `berlin_forecast`. You'll use this name to read the forecast in later steps.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Forecast type:
  description: The scope of the forecast to retrieve. One of daily, hourly, or twice daily. When not set, defaults to daily.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `weather.get_forecasts`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: weather.get_forecasts
  target:
    entity_id:
      - weather.home
      - weather.toronto_forecast
  data:
    type: hourly
  response_variable: weather_forecast
{% endexample %}

This returns the hourly forecast for both weather entities.

### Options in YAML

{% options_yaml %}
type:
  description: The scope of the forecast to retrieve. One of `daily`, `hourly`, or `twice_daily`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The response is keyed by each weather entity you targeted, with a `forecast` list. Each entry in the list describes the forecasted conditions at a given point in time and includes the following fields:

- `datetime`: The time of the forecasted conditions.
- `is_daytime`: Whether the forecast period is during the day. Only set for `twice_daily` forecasts.
- `condition`: The weather condition.
- `apparent_temperature`: The apparent (feels-like) temperature, in the unit indicated by the `temperature_unit` state attribute.
- `temperature`: The temperature, in the unit indicated by the `temperature_unit` state attribute. When `templow` is also provided, this is the higher temperature.
- `templow`: The lower temperature, in the unit indicated by the `temperature_unit` state attribute.
- `dew_point`: The dew point temperature, in the unit indicated by the `temperature_unit` state attribute.
- `humidity`: The relative humidity, in percent.
- `cloud_coverage`: The cloud coverage, in percent.
- `precipitation`: The precipitation amount, in the unit indicated by the `precipitation_unit` state attribute.
- `precipitation_probability`: The probability of precipitation, in percent.
- `pressure`: The air pressure, in the unit indicated by the `pressure_unit` state attribute.
- `uv_index`: The UV index.
- `wind_bearing`: The wind bearing, as an azimuth angle in degrees or a cardinal direction.
- `wind_gust_speed`: The wind gust speed, in the unit indicated by the `wind_speed_unit` state attribute.
- `wind_speed`: The wind speed, in the unit indicated by the `wind_speed_unit` state attribute.

A shortened example of the response looks like this:

```yaml
weather.home:
  forecast:
    - datetime: "2023-12-07T13:00:00+00:00"
      condition: cloudy
      temperature: 0.1
      dew_point: -1.9
      humidity: 86
      precipitation: 0
      precipitation_probability: 0
      wind_bearing: 241.19
      wind_speed: 16.88
    - datetime: "2023-12-07T14:00:00+00:00"
      condition: cloudy
      temperature: 0.8
      dew_point: -2.8
      humidity: 77
      precipitation: 0
      precipitation_probability: 0
      wind_bearing: 232.41
      wind_speed: 17.82
weather.toronto_forecast:
  forecast:
    - datetime: "2023-12-07T14:00:00+00:00"
      condition: snowy
      temperature: 0
      precipitation_probability: 40
```

## Good to know

- A weather entity may not provide every field. Fields that aren't available are omitted from the forecast.
- A weather entity only supports the forecast types it provides, such as daily, hourly, or twice daily. Make sure the entity supports the type you request.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
