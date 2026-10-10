---
title: "Get minute forecast"
action: google_weather.get_minute_forecast
domain: google_weather
description: "Retrieves the precipitation forecast (nowcast) for the next 6 hours, in 2- or 15-minute segments depending on the location. Unlike the cached forecasts, every call makes a live request to the Google Weather API and counts toward your quota."
related_actions:
  - weather.get_forecasts
---

Use this action to get a short-term precipitation forecast, also called a nowcast, for one of your Google Weather entities. It covers the next 6 hours in short segments, so you can tell whether rain is about to start, how heavy it is likely to get, and when it is expected to stop.

This is more detailed than the hourly forecast that the {% term entity %} itself provides. Use it when the timing matters, for example to send yourself a heads-up a few minutes before rain reaches your house, or to hold off the sprinklers when a shower is on the way. It returns the forecast as [response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data).

{% important %}
Unlike the `weather.get_forecasts` action, every call to this action sends a new request to Google and counts toward your API quota.

The Google Weather integration already uses about 4,464 requests per month for each location you have configured, out of the 10,000 requests per month that are free. That leaves roughly 5,500 calls per month for one location, which is about one call every 8 minutes. With two locations configured, there is far less room.

Call this action on a schedule you choose, such as a time pattern, or only when something else makes the forecast worth checking. Do not call it from a template that re-renders on its own, and check the [billing section in the Google developer documentation](https://developers.google.com/maps/documentation/weather/usage-and-billing) before going beyond the free usage cap.
{% endimportant %}

{% include actions/ui_header.md %}

To get a minute forecast from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the Google Weather weather entity you want the forecast for. You can also select an area, a device, or a label.
6. From the actions shown for that target, select **Google Weather: Get minute forecast**.
7. In the **Response variable** field, enter a name to store the data in, such as `nowcast`.
8. Select **Save**.

### Options in the UI

This action has no options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_weather.get_minute_forecast`. Because it returns data, store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: google_weather.get_minute_forecast
  target:
    entity_id: weather.home
  response_variable: nowcast
{% endexample %}

This stores the nowcast for `weather.home` in `nowcast`.

### Options in YAML

This action has no options beyond the target.

{% include actions/targets.md domain="weather" %}

## Response data

The response is keyed by the entity ID of each targeted weather entity. For every entity, the response contains the data exactly as Google returns it, which means the field names use camelCase instead of the snake_case used elsewhere in Home Assistant:

- `overallPredictionTimeframe`: the `startTime` and `endTime` that the whole forecast covers.
- `timeZone`: the time zone of the location, under `id`.
- `segments`: the list of forecast segments, in chronological order.

Each segment has these fields:

- `timeFrame`: the `startTime` and `endTime` of the segment.
- `type`: the kind of precipitation expected. One of `NONE`, `RAIN`, `SNOW`, or `HAIL`.
- `probability`: how likely the precipitation is, from 0 to 100.
- `intensity`: how heavy the precipitation is expected to be. One of `NO_INTENSITY`, `LIGHT`, `MID_LIGHT`, `MODERATE`, `MID_MODERATE`, `HEAVY`, or `MID_HEAVY`.
- `qpf`: the expected amount of liquid precipitation, as a `quantity` and a `unit`.
- `snowfallAmount`: the expected amount of snow, as a `quantity` and a `unit`.

The `qpf` and `snowfallAmount` fields are only present when precipitation is expected, so guard for them in templates. The amounts are always in millimeters, whatever unit system you have configured in Home Assistant.

A shortened example response looks like this:

```yaml
weather.home:
  overallPredictionTimeframe:
    startTime: "2025-06-01T00:00:00Z"
    endTime: "2025-06-01T06:00:00Z"
  timeZone:
    id: America/New_York
  segments:
    - timeFrame:
        startTime: "2025-06-01T00:00:00Z"
        endTime: "2025-06-01T00:15:00Z"
      type: RAIN
      probability: 62
      intensity: MODERATE
      qpf:
        quantity: 0.5
        unit: MILLIMETERS
      snowfallAmount:
        quantity: 0
        unit: MILLIMETERS
    - timeFrame:
        startTime: "2025-06-01T00:15:00Z"
        endTime: "2025-06-01T00:30:00Z"
      type: NONE
      intensity: NO_INTENSITY
```

To keep the answer around as a {% term entity %}, store it in a trigger-based template sensor. This one counts down the minutes until precipitation is expected to start, and is `unknown` when nothing is expected in the next 6 hours:

```yaml
template:
  - triggers:
      - trigger: time_pattern
        minutes: /15
    actions:
      - action: google_weather.get_minute_forecast
        target:
          entity_id: weather.home
        response_variable: nowcast
    sensor:
      - name: "Precipitation starts in"
        unique_id: google_weather_precipitation_starts_in
        unit_of_measurement: min
        state: >
          {% raw %}
          {% set ns = namespace(starts_in=none) %}
          {% for segment in nowcast['weather.home']['segments']
             if ns.starts_in is none %}
            {% if segment['type'] != 'NONE'
                  and as_timestamp(segment['timeFrame']['endTime'])
                      > now().timestamp() %}
              {% set minutes = (as_timestamp(segment['timeFrame']['startTime'])
                                - now().timestamp()) / 60 %}
              {% set ns.starts_in = [minutes, 0] | max %}
            {% endif %}
          {% endfor %}
          {% if ns.starts_in is not none %}
            {{ ns.starts_in | round | int }}
          {% endif %}
          {% endraw %}
```

The loop skips segments that have already ended, so the sensor never reports a negative countdown. A state of `0` means precipitation is falling now, and `unknown` means none is expected in the next 6 hours.

This example refreshes every 15 minutes, which adds about 2,900 calls per month. That fits alongside one configured location, but not two. Check the arithmetic above against your own setup before copying the cadence.

## Good to know

- The forecast covers the next 6 hours. Segments are 2 or 15 minutes long depending on the location, so do not assume a fixed segment length or a fixed number of segments.
- Google offers this forecast as an experimental, pre-general-availability feature. The data it returns, and its availability in your area, can change.
- A segment with a `type` of `NONE` means no precipitation is expected during that segment.
- The Google Maps Platform terms require that these forecast values are not kept for longer than one hour, so do not archive them in long-term statistics.
- The forecast is only as accurate as the data Google provides for your location.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: get a heads-up before rain starts

Check the nowcast every 15 minutes, and send a notification when precipitation is expected to begin within the next half hour. It only looks at segments that haven't started yet, so it stays quiet once the rain has arrived.

At this cadence the automation adds about 2,900 calls per month, which fits alongside one configured location but not two.

- **Trigger**: Time pattern, every 15 minutes
- **Action**: Google Weather: Get minute forecast
  - **Target**: Home (`weather.home`)
  - **Response variable**: `nowcast`
- **Condition**: Template, the next precipitation starts within 30 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a heads-up before rain starts" %}

{% example %}
automation: |
  alias: "Warn me before rain starts"
  triggers:
    - trigger: time_pattern
      minutes: /15
  actions:
    - action: google_weather.get_minute_forecast
      target:
        entity_id: weather.home
      response_variable: nowcast
    - variables:
        upcoming: >
          {% set ns = namespace(segment=none) %}
          {% for segment in nowcast['weather.home']['segments']
             if ns.segment is none %}
            {% if segment['type'] != 'NONE'
                  and as_timestamp(segment['timeFrame']['startTime'])
                      > now().timestamp() %}
              {% set ns.segment = segment %}
            {% endif %}
          {% endfor %}
          {{ ns.segment }}
    - condition: template
      value_template: >
        {{ upcoming is not none
           and as_timestamp(upcoming['timeFrame']['startTime'])
               - now().timestamp() < 1800 }}
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {{ upcoming['type'] | lower }} expected in about
          {{ ((as_timestamp(upcoming['timeFrame']['startTime'])
               - now().timestamp()) / 60) | round | int }} minutes.
{% endexample %}

{% enddetails %}

### Automation: skip the sprinklers when rain is on the way

Before the evening watering run, check the nowcast and only turn the sprinklers on when no meaningful rain is expected in the next 6 hours. The example adds up the forecast amounts, skipping the segments that have no `qpf` field.

- **Trigger**: Time, 19:00:00
- **Action**: Google Weather: Get minute forecast
  - **Target**: Home (`weather.home`)
  - **Response variable**: `nowcast`
- **Condition**: Template, less than 1 mm of rain expected in total
- **Action**: Turn on switch
  - **Target**: Sprinklers

{% details "YAML example for skipping the sprinklers when rain is coming" %}

{% example %}
automation: |
  alias: "Water the garden unless rain is coming"
  triggers:
    - trigger: time
      at: "19:00:00"
  actions:
    - action: google_weather.get_minute_forecast
      target:
        entity_id: weather.home
      response_variable: nowcast
    - condition: template
      value_template: >
        {{ nowcast['weather.home']['segments']
           | map(attribute='qpf.quantity', default=0)
           | sum < 1 }}
    - action: switch.turn_on
      target:
        entity_id: switch.sprinklers
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
