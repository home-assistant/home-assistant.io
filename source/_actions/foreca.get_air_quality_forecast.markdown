---
title: "Get air quality forecast"
action: foreca.get_air_quality_forecast
domain: foreca
description: "Retrieves the Foreca air quality index forecast, hourly for up to 85 hours or daily for four days."
---

The **Get air quality forecast** action returns the forecasted US EPA air quality index for a location, either hourly for up to 85 hours or daily for four days. Use it, for example, to air out the house while the air is clean, or to warn someone sensitive before ozone or particulate levels rise.

Home Assistant keeps forecasts out of entities, so the coming hours and days are available here as [response data](/docs/automation/action/#action-response-data).

{% important %}
The air quality forecast needs a Foreca plan that includes air quality. If your plan does not, the action fails with an error that says so.
{% endimportant %}

{% include actions/targets.md domain="weather" entity_type="Foreca weather entity" example="weather.home" %}

{% include actions/ui_header.md %}

To get the air quality forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what data you want to read. Under **By target** (see [Targets](#targets)), pick the Foreca weather entity of the location you want the forecast for. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Get air quality forecast**.
7. Select the **Forecast type** to retrieve.
8. In the **Response variable** field, enter a name to store the data in, such as `air_quality`.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Forecast type:
  description: The forecast to return. Either daily or hourly.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `foreca.get_air_quality_forecast`. Because this action returns data, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: foreca.get_air_quality_forecast
  target:
    entity_id: weather.home
  data:
    type: hourly
  response_variable: air_quality
{% endexample %}

### Options in YAML

{% options_yaml %}
type:
  description: >
    The forecast to return. Either `daily` or `hourly`.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response is a mapping of the targeted weather entities, each containing a `forecast` field. The `forecast` field is a list with one entry per hour (up to 85) or per day (four). An hour or day that the API returns without a valid time is left out, so the list can be shorter. Each entry includes:

- `datetime`: the start of the hour, or the start of the day in your Home Assistant time zone.
- `aqi`: the overall air quality index.
- `dominant_pollutant`: the pollutant that sets the index: `carbon_monoxide`, `nitrogen_dioxide`, `ozone`, `pm10`, `pm25`, or `sulphur_dioxide`. It is `null` when Foreca names no pollutant or one not in this list.
- `aqi_co`, `aqi_no2`, `aqi_o3`, `aqi_so2`, `aqi_pm10`, and `aqi_pm25`: the index for each pollutant.

For an `hourly` forecast, the response looks similar to this:

{% example %}
output: |
  weather.home:
    forecast:
      - datetime: "2026-11-09T16:00:00+02:00"
        aqi: 31
        dominant_pollutant: ozone
        aqi_co: 1
        aqi_no2: 4
        aqi_o3: 31
        aqi_so2: 0
        aqi_pm10: 9
        aqi_pm25: 17
{% endexample %}

## Good to know

- Each call requests fresh data from the Foreca Weather API: one request for every Foreca weather entity it targets, counted toward your plan's daily request limit.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
