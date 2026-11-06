---
title: "Get extra forecast values"
action: foreca.get_forecasts_extra
domain: foreca
description: "Retrieves Foreca forecast values that the standard forecast has no place for, such as precipitation type, snow, solar radiation, sunshine, and sunrise."
---

The **Foreca: Get extra forecast values** action returns forecast values that the standard [`weather.get_forecasts`](/integrations/weather#action-weatherget_forecasts) action has no field for, such as the precipitation type, snow accumulation and depth, solar radiation, sunshine duration, and sunrise and sunset times.

Use it, for example, to plan solar charging around the expected solar radiation, or to warn about snow on the roads before a morning commute.

{% include actions/targets.md domain="weather" %}

{% include actions/ui_header.md %}

To get the extra forecast values from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Foreca: Get extra forecast values**.
6. Select the Foreca weather entity as the target, then choose the **Forecast type**.
7. In the **Response variable** field, enter a name to store the data in, such as `extra_forecast`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Forecast type:
  description: The forecast to return the values for. Either daily or hourly.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `foreca.get_forecasts_extra`. Because this action returns data, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: foreca.get_forecasts_extra
  target:
    entity_id: weather.home
  data:
    type: daily
  response_variable: extra_forecast
{% endexample %}

### Options in YAML

{% options_yaml %}
type:
  description: >
    The forecast to return the values for. Either `daily` or `hourly`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response is a mapping of the targeted weather entities, each containing a `forecast` field. The `forecast` field is a list with one entry per hour or day, matching the entries of `weather.get_forecasts`. Values are in the weather entity's units.

Each hourly entry includes:

- `datetime`: the time the values are for.
- `precipitation_type`: `rain`, `mixed`, or `snow`.
- `snow_accumulation`: the thickness of snow falling during the hour that ends at `datetime`, in the precipitation unit.
- `snow_depth`: the snow depth on the ground, in the precipitation unit.
- `solar_radiation`: the ground-level solar radiation, in W/m².
- `thunderstorm_probability`: the probability of thunder, in percent.
- `visibility`: the visibility, in the visibility unit.

Each daily entry includes:

- `datetime`: the start of the day in your Home Assistant time zone.
- `apparent_templow`: the minimum apparent temperature.
- `max_humidity` and `min_humidity`: the highest and lowest relative humidity, in percent.
- `min_dew_point`: the lowest dew point.
- `min_visibility`: the lowest visibility.
- `snow_accumulation`: the thickness of snow falling during the day, in the precipitation unit.
- `snow_depth`: the snow depth on the ground, in the precipitation unit.
- `sunshine_duration`: the hours of sunshine.
- `solar_radiation_sum`: the solar energy reaching the ground over the day, in Wh/m².
- `sunrise` and `sunset`: the times of sunrise and sunset, in UTC.
- `confidence`: how confident Foreca is in the forecast: `good`, `normal`, or `low`.

For a `daily` forecast, the response looks similar to this:

{% example %}
output: |
  weather.home:
    forecast:
      - datetime: "2026-11-06T00:00:00+02:00"
        apparent_templow: -4.34
        max_humidity: 99
        min_humidity: 58
        min_dew_point: -0.99
        min_visibility: 10.0
        snow_accumulation: 0.0
        snow_depth: 0.0
        sunshine_duration: 5.35
        solar_radiation_sum: 921
        sunrise: "2026-11-06T05:54:46+00:00"
        sunset: "2026-11-06T14:11:42+00:00"
        confidence: good
{% endexample %}

## Good to know

- The action reads the forecast the integration has already retrieved, so it uses no extra requests.
- Snow accumulation and depth are the thickness of the snow, not its water equivalent.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
