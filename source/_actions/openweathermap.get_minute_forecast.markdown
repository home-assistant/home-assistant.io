---
title: "Get minute forecast"
action: openweathermap.get_minute_forecast
domain: openweathermap
description: "Retrieves a minute-by-minute precipitation forecast for the next hour from OpenWeatherMap."
---

Use this action to get a minute-by-minute precipitation forecast for the next hour, for example to decide whether to start the garden sprinklers or to send yourself a heads-up before rain arrives. It returns the forecasted rain or snow for each of the next 60 minutes as [response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data).

{% important %}
The minute forecast is only available when the OpenWeatherMap integration mode is set to `v3.0`. The action fails if the mode is set to `current`, `forecast`, or `air pollution`.
{% endimportant %}

{% include actions/ui_header.md %}

To get a minute forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **OpenWeatherMap: Get minute forecast**.
6. Select the OpenWeatherMap weather entity you want the forecast for.
7. In the **Response variable** field, enter a name to store the data in, such as `weather_forecast`.
8. Select **Save**.

### Options in the UI

This action has no options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `openweathermap.get_minute_forecast`. Because it returns data, you store the result in a response variable. A basic example looks like this:

{% example %}
action: |
  action: openweathermap.get_minute_forecast
  target:
    entity_id: weather.openweathermap
  response_variable: weather_forecast
{% endexample %}

### Options in YAML

This action has no options beyond the target.

{% include actions/targets.md domain="weather" %}

## Response data

The action returns the forecast for each targeted weather entity, keyed by its entity ID. For each entity, the response contains a `forecast` field with a list of 60 entries, one for each minute of the next hour. Each entry has the following fields:

- `datetime`: the time of the forecasted conditions.
- `precipitation`: the forecasted precipitation amount, in millimeters per hour.

A trimmed example response looks like this:

```yaml
weather.openweathermap:
  forecast:
    - datetime: "2024-10-19T18:59:00+00:00"
      precipitation: 5.46
    - datetime: "2024-10-19T19:00:00+00:00"
      precipitation: 5.62
    - datetime: "2024-10-19T19:01:00+00:00"
      precipitation: 5.62
```

## Good to know

- The forecast covers the next 60 minutes, with one entry per minute.
- A `precipitation` value of 0 means no rain or snow is expected for that minute.
- The forecast is only as accurate as the data OpenWeatherMap provides for your location.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
