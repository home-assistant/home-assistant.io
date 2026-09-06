---
title: "Get extra forecasts data"
action: nws.get_forecasts_extra
domain: nws
description: "Retrieves extra data for weather forecasts."
---

The **Get extra forecasts data** action retrieves extra forecast data from the National Weather Service that is not returned by the standard [`weather.get_forecasts`](/integrations/weather#action-weatherget_forecasts) action, such as the detailed and short text descriptions.

This is useful when you want an automation or script to display the National Weather Service's worded forecast, for example a sentence like "50% chance of rain, otherwise partly cloudy with a high of 75°F."

{% include actions/targets.md domain="weather" %}

{% include actions/ui_header.md %}

To get the extra forecast data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **National Weather Service (NWS): Get extra forecasts data**.
6. Select the weather entity as the target, then choose the **Forecast type**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Forecast type:
  description: The scope of the weather forecast. Either hourly or twice daily.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nws.get_forecasts_extra`. Because this action returns data, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: nws.get_forecasts_extra
  target:
    entity_id: weather.khou
  data:
    type: twice_daily
  response_variable: weather_forecast
{% endexample %}

This retrieves the extra forecast data and stores it in the `weather_forecast` variable.

### Options in YAML

{% options_yaml %}
type:
  description: >
    The scope of the weather forecast. Either `hourly` or `twice_daily`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response is a mapping of the targeted weather entities, each containing a `forecast` field. The `forecast` field is a list of forecasted conditions at a given point in time. Each entry can include:

- `datetime`: The start time of the forecasted conditions.
- `short_description`: A short description of the weather condition.
- `is_daytime`: Whether the forecast period is during the day. Only set for `twice_daily` forecasts.
- `detailed_description`: A detailed, worded description of the forecast. Only set for `twice_daily` forecasts.

For a `twice_daily` forecast, the response looks similar to this:

{% example %}
output: |
  weather.khou:
    forecast:
      - datetime: "2023-02-17T14:00:00+00:00"
        is_daytime: true
        detailed_description: >-
          50% chance of rain, otherwise partly cloudy with a high of 75°F.
        short_description: "Partly sunny then slight chance showers and thunderstorms"
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
