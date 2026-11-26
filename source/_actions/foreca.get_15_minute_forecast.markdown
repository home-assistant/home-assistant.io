---
title: "Get 15-minute forecast"
action: foreca.get_15_minute_forecast
domain: foreca
response: required
description: "Retrieves the Foreca forecast in 15-minute steps for the next three hours."
---

Use this action to get a detailed forecast for the next three hours in 15-minute steps, for example to time a run or a bike ride between showers, or to warn about snow starting in the next hour. Home Assistant forecasts go no finer than hourly, so this action returns the 15-minute forecast as [response data](/docs/automation/action/#action-response-data).

{% include actions/ui_header.md %}

To get a 15-minute forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what data you want to read. Under **By target** (see [Targets](#targets)), pick the Foreca weather entity of the location you want the forecast for. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Get 15-minute forecast**.
7. In the **Response variable** field, enter a name to store the data in, such as `nowcast`.
8. Select **Save**.

### Options in the UI

This action has no options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `foreca.get_15_minute_forecast`. Because it returns data, you store the result in a response variable. A basic example looks like this:

{% example %}
action: |
  action: foreca.get_15_minute_forecast
  target:
    entity_id: weather.home
  response_variable: nowcast
{% endexample %}

### Options in YAML

This action has no options beyond the target.

{% include actions/targets.md domain="weather" entity_type="Foreca weather entity" example="weather.home" %}

## Response data

{% include actions/response.md %}

The action returns the forecast for each targeted weather entity, keyed by its entity ID. For each entity, the response contains a `forecast` field with a list of up to 12 entries, one for each 15 minutes of the next three hours. An entry that the API returns without a valid time is left out, so the list can be shorter. Values are in the weather entity's units. Each entry has the fields of an hourly entry of [`weather.get_forecasts`](/actions/weather.get_forecasts/), except precipitation, plus the following:

- `precipitation_rate`: the precipitation rate, in the precipitation unit per hour.
- `snow_rate`: the rate at which snow builds up, in the precipitation unit per hour.
- `precipitation_type`: `rain`, `mixed`, or `snow`.
- `thunderstorm_probability`: the probability of thunder, in percent.
- `visibility`: the visibility, in the visibility unit.

A trimmed example response looks like this:

{% example %}
output: |
  weather.home:
    forecast:
      - datetime: "2026-11-06T11:30:00+02:00"
        condition: partlycloudy
        temperature: 3.1
        apparent_temperature: -0.7
        humidity: 76
        wind_speed: 15.98
        precipitation_probability: 1
        precipitation_rate: 0
        snow_rate: 0.0
        precipitation_type: rain
        thunderstorm_probability: 0
        visibility: 10.0
{% endexample %}

## Good to know

- Each call requests fresh data from the Foreca Weather API, one request for every Foreca weather entity it targets, and each request counts toward your plan's daily request limit. Calling the action every few minutes around the clock can use more requests than the regular updates do.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
