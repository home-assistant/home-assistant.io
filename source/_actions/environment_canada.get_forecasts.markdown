---
title: "Get forecasts"
action: environment_canada.get_forecasts
domain: environment_canada
description: "Retrieves the raw daily and hourly forecast data from Environment Canada."
related_actions:
  - environment_canada.get_alerts
  - environment_canada.set_radar_type
---

Use this action to retrieve the raw forecast data from Environment Canada for one of your weather entities. It returns both the daily forecast and the hourly forecast, which you can use in later steps of the same automation or script, for example to build a template sensor with the upcoming conditions.

{% include actions/ui_header.md %}

To get forecasts from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the weather entity you want to read.
6. From the actions shown for that target, select **Get forecasts**.
7. In the **Response variable** field, enter a name to store the data in, such as `forecasts`.
8. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `environment_canada.get_forecasts`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: environment_canada.get_forecasts
  target:
    entity_id: weather.home
  response_variable: forecasts
{% endexample %}

This stores the daily and hourly forecast of `weather.home` in `forecasts`.

{% include actions/targets.md domain="weather" %}

## Response data

The response is keyed by the entity ID of each targeted weather entity. For every entity, the response holds two lists:

- `daily_forecast`: The daily forecast entries.
- `hourly_forecast`: The hourly forecast entries.

Each entry has a `timestamp` field along with the forecast fields provided by Environment Canada, such as `text_summary`, `temperature`, and the precipitation probability.

```yaml
weather.home:
  daily_forecast:
    - timestamp: "2024-01-01T12:00:00+00:00"
      text_summary: Sunny
      temperature: 4
  hourly_forecast:
    - timestamp: "2024-01-01T13:00:00+00:00"
      temperature: 3
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
