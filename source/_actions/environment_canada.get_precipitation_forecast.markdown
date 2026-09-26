---
title: "Get precipitation forecast"
action: environment_canada.get_precipitation_forecast
domain: environment_canada
description: "Retrieves the precipitation forecast series for an Environment Canada location."
related_actions:
  - environment_canada.get_alerts
  - environment_canada.get_forecasts
  - environment_canada.set_radar_type
---

Use this action to retrieve the precipitation forecast series for one of your Environment Canada locations: a short-interval series covering the recent past and the next hour or so, and an hourly series covering up to the next two days. The result is intended for building your own precipitation chart, for example with a template sensor or a custom card.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the precipitation forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Environment Canada: Get precipitation forecast**.
6. Select the **Environment Canada service** to get the precipitation forecast for, and set any of the options you need.
7. In the **Response variable** field, enter a name to store the data in, such as `precipitation`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Environment Canada service:
  description: The Environment Canada location to get the precipitation forecast for.
  required: true
Precipitation type:
  description: Which precipitation type to report. One of auto, rain, or snow. Defaults to auto, which detects the type from radar.
  required: false
Past minutes:
  description: How far back the short-interval series reaches, in minutes, from 0 to 180. Defaults to 60.
  required: false
Future minutes:
  description: How far ahead the short-interval series reaches, in minutes, from 0 to 72. Defaults to 72.
  required: false
Hourly hours:
  description: Length of the hourly series, in hours, from 0 to 48. Zero disables the hourly series. Defaults to 24.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `environment_canada.get_precipitation_forecast`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: environment_canada.get_precipitation_forecast
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
  response_variable: precipitation
{% endexample %}

This stores the precipitation forecast series for the selected location in `precipitation`.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Environment Canada location to get the precipitation forecast for.
  required: true
  type: string
precip_type:
  description: >
    Which precipitation type to report. One of auto, rain, or snow. Defaults
    to auto, which detects the type from radar.
  required: false
  type: string
past_minutes:
  description: >
    How far back the short-interval series reaches, in minutes, from 0 to
    180. Defaults to 60.
  required: false
  type: integer
future_minutes:
  description: >
    How far ahead the short-interval series reaches, in minutes, from 0 to
    72. Defaults to 72.
  required: false
  type: integer
hourly_hours:
  description: >
    Length of the hourly series, in hours, from 0 to 48. Zero disables the
    hourly series. Defaults to 24.
  required: false
  type: integer
{% endoptions_yaml %}

## Response data

The response has three keys:

- `nowcast`: A short-interval precipitation rate series, combining recent observed radar with roughly the next hour of radar extrapolation.
- `hourly`: An hourly precipitation amount, probability, and type series, covering up to the next two days.
- `metadata`: Attribution and reference information for the series, such as the timestamp of the most recent radar observation.

Each `nowcast` entry has a `timestamp` field along with fields such as `rate`, `unit`, `precip_type`, and `forecast`, which is `true` for an extrapolated entry and `false` for an observed one. Each `hourly` entry has a `timestamp` field along with fields such as `amount`, `probability`, `conditional_amount`, `expected_amount`, and `precip_type`.

```yaml
nowcast:
  - timestamp: "2024-01-01T12:00:00+00:00"
    rate: 1.2391
    unit: mm/h
    precip_type: rain
    forecast: false
hourly:
  - timestamp: "2024-01-01T13:00:00+00:00"
    amount: 1.726
    probability: 57
    conditional_amount: 0.909
    expected_amount: 0.518
    precip_type: Rain
metadata:
  attribution: Data provided by Environment Canada
  timestamp: "2024-01-01T12:00:00+00:00"
```

## Good to know

- Unlike the weather and radar camera entities in this integration, this action is not backed by a coordinator: each call queries Environment Canada directly, so the response reflects the latest available radar and model data at the time of the call.
- Repeated calls with the same location and options within a few minutes can reuse a very recent result instead of triggering a new query.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: notify about rain in the next hour

This automation checks the short-interval series every 10 minutes and, if any of the next hour's rates are above zero, notifies you with the upcoming rates so you know rain is about to start without checking the app.

- **Trigger**: Time pattern (every 10 minutes)
- **Action**: Get precipitation forecast
  - **Precipitation type**: Rain
  - **Past minutes**: 0
  - **Future minutes**: 60
- **Condition**: Template
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying about rain in the next hour" %}

{% example %}
automation: |
  alias: "Notify about rain in the next hour"
  triggers:
    - trigger: time_pattern
      minutes: "/10"
  actions:
    - action: environment_canada.get_precipitation_forecast
      data:
        config_entry_id: YOUR_CONFIG_ENTRY_ID
        precip_type: rain
        past_minutes: 0
        future_minutes: 60
      response_variable: precipitation
    - condition: template
      value_template: >
        {{ precipitation.nowcast | selectattr('rate', 'gt', 0) | list
        | count > 0 }}
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Rain expected in the next hour: {{ precipitation.nowcast
          | map(attribute='rate') | list }}
{% endexample %}

{% enddetails %}

### Automation: notify about precipitation in the next 24 hours

This automation runs every evening, retrieves the hourly series, and notifies you with the total expected amount, so you can plan for the next day.

- **Trigger**: Time (21:00)
- **Action**: Get precipitation forecast
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying about precipitation in the next 24 hours" %}

{% example %}
automation: |
  alias: "Notify about precipitation in the next 24 hours"
  triggers:
    - trigger: time
      at: "21:00:00"
  actions:
    - action: environment_canada.get_precipitation_forecast
      data:
        config_entry_id: YOUR_CONFIG_ENTRY_ID
      response_variable: precipitation
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Expected precipitation over the next 24 hours: {{
          precipitation.hourly | sum(attribute='expected_amount')
          | round(1) }} mm.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
