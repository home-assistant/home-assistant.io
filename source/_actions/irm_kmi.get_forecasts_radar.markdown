---
title: "Get radar forecasts"
action: irm_kmi.get_forecasts_radar
domain: irm_kmi
response: required
description: "Retrieves the available rain radar forecast for an IRM KMI weather entity."
related_actions:
  - weather.get_forecasts
---

Use this action to get the rain radar forecast for one of your IRM KMI weather entities. Each entry is one radar frame with the expected rain rate, so you can see whether rain is coming and how heavy it will be.

The regular forecast from [`weather.get_forecasts`](/actions/weather.get_forecasts/) covers hours and days. This action only covers precipitation, with one entry per radar frame. Use it for short-term decisions, for example to skip watering the garden when a shower is coming.

{% include actions/ui_header.md %}

To get the radar forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the IRM KMI weather entity you want the forecast for.
6. From the actions shown for that target, select **Royal Meteorological Institute of Belgium: Get radar forecasts**.
7. In the **Response variable** field, enter a name to store the data in, such as `radar`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Include past forecasts:
  description: Whether to also return the radar frames before the current one. The current frame is always returned. Disabled by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `irm_kmi.get_forecasts_radar`. Because it returns data, store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: irm_kmi.get_forecasts_radar
  target:
    entity_id: weather.brussels
  response_variable: radar
{% endexample %}

This stores the radar forecast for `weather.brussels` in `radar`.

### Options in YAML

{% options_yaml %}
include_past_forecasts:
  description: >
    Whether to also return the radar frames before the current one. The
    current frame is always returned.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/targets.md domain="weather" %}

## Response data

{% include actions/response.md %}

The response is keyed by the entity ID of each targeted weather entity. For every entity, the response contains a `forecast` list with one entry per radar frame, oldest first. Each entry has these fields:

- `datetime`: when the radar frame starts.
- `precipitation`: the expected rain rate, in mm/h.
- `rain_forecast_min` and `rain_forecast_max`: the lower and upper bound of the expected rain rate, in mm/h.
- `might_rain`: whether rain is possible during the frame.
- `unit`: the unit of the rain rates, `mm/h`.

A shortened example response looks like this:

```yaml
weather.brussels:
  forecast:
    - datetime: "2023-12-28T15:10:00+01:00"
      precipitation: 0.6
      rain_forecast_min: 0.3
      rain_forecast_max: 0.9
      might_rain: true
      unit: mm/h
    - datetime: "2023-12-28T15:20:00+01:00"
      precipitation: 0.3
      rain_forecast_min: 0.0
      rain_forecast_max: 0.6
      might_rain: true
      unit: mm/h
```

## Good to know

- Without past forecasts, the first entry is the frame that covers the current time. Its `datetime` is usually a few minutes in the past.
- Frames are 10 minutes apart in Belgium and Luxembourg, and 5 minutes apart in the Netherlands. Don't count on a fixed number of frames.
- The action uses the radar data from the last update of the integration. It does not send a new request to the provider.
- If the provider has no radar data for the location, the action fails with the error "The rain radar reported no forecast for this location". Try again after the next update.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: skip the sprinklers when rain is on the way

Before the evening watering run, check the radar and only turn on the sprinklers when no rain shows up in any of the frames.

- **Trigger**: Time, 20:00:00
- **Action**: Get radar forecasts
  - **Target**: Brussels (`weather.brussels`)
  - **Response variable**: `radar`
- **Condition**: Template, no frame has rain
- **Action**: Turn on switch
  - **Target**: Sprinklers (`switch.sprinklers`)

{% details "YAML example for skipping the sprinklers when rain is coming" %}

{% example %}
automation: |
  alias: "Water the garden unless rain is coming"
  triggers:
    - trigger: time
      at: "20:00:00"
  actions:
    - action: irm_kmi.get_forecasts_radar
      target:
        entity_id: weather.brussels
      response_variable: radar
    - condition: template
      value_template: >
        {{ radar['weather.brussels'].forecast
           | map(attribute='precipitation')
           | select('gt', 0)
           | list
           | count == 0 }}
    - action: switch.turn_on
      target:
        entity_id: switch.sprinklers
{% endexample %}

{% enddetails %}

### Automation: get a heads-up before rain starts

Check the radar every 10 minutes, and send a notification when it is dry now but rain shows up in a later frame. You may get the same heads-up more than once while the rain comes closer.

- **Trigger**: Time pattern, every 10 minutes
- **Action**: Get radar forecasts
  - **Target**: Brussels (`weather.brussels`)
  - **Response variable**: `radar`
- **Condition**: Template, the current frame is dry and a later frame has rain
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a heads-up before rain starts" %}

{% example %}
automation: |
  alias: "Warn me before rain starts"
  triggers:
    - trigger: time_pattern
      minutes: /10
  actions:
    - action: irm_kmi.get_forecasts_radar
      target:
        entity_id: weather.brussels
      response_variable: radar
    - variables:
        rates: >
          {{ radar['weather.brussels'].forecast
             | map(attribute='precipitation')
             | list }}
    - condition: template
      value_template: >
        {{ rates[0] == 0 and rates | select('gt', 0) | list | count > 0 }}
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Rain is on its way."
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
