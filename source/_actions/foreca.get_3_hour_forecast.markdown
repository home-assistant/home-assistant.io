---
title: "Get 3-hour forecast"
action: foreca.get_3_hour_forecast
domain: foreca
description: "Retrieves the Foreca forecast in 3-hour steps for the next 14 days."
---

Use this action to get a forecast in 3-hour steps for the next 14 days, for example to plan a weekend trip two weeks ahead by time of day. The hourly forecast of [`weather.get_forecasts`](/integrations/weather#action-weatherget_forecasts) covers 7 days, and its daily forecast has one entry per day, so this action returns the 3-hour forecast as [response data](/docs/automation/action/#action-response-data).

{% include actions/ui_header.md %}

To get a 3-hour forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Foreca: Get 3-hour forecast**.
6. Select the Foreca weather entity of the location you want the forecast for.
7. In the **Response variable** field, enter a name to store the data in, such as `three_hour_forecast`.
8. Select **Save**.

### Options in the UI

This action has no options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `foreca.get_3_hour_forecast`. Because it returns data, you store the result in a response variable. A basic example looks like this:

{% example %}
action: |
  action: foreca.get_3_hour_forecast
  target:
    entity_id: weather.home
  response_variable: three_hour_forecast
{% endexample %}

### Options in YAML

This action has no options beyond the target.

{% include actions/targets.md domain="weather" %}

## Response data

The action returns the forecast for each targeted weather entity, keyed by its entity ID. For each entity, the response contains a `forecast` field with a list of 112 entries, one for every 3 hours of the next 14 days. Values are in the weather entity's units. Each entry has the fields of an hourly entry of [`weather.get_forecasts`](/integrations/weather#action-weatherget_forecasts) and of [`foreca.get_forecasts_extra`](/actions/foreca.get_forecasts_extra/). `precipitation` and `snow_accumulation` are the amounts for the 3 hours that end at `datetime`.

A trimmed example response looks like this:

```yaml
weather.home:
  forecast:
    - datetime: "2026-11-11T17:00:00+02:00"
      condition: rainy
      temperature: 5.7
      apparent_temperature: 2.6
      humidity: 87
      precipitation: 1.61
      precipitation_probability: 29
      precipitation_type: rain
      snow_accumulation: 0.0
      thunderstorm_probability: 0
      visibility: 25.25
```

## Good to know

- Each call requests fresh data from the Foreca Weather API: one request for every Foreca weather entity it targets, counted toward your plan's daily request limit.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
