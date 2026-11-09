---
title: "Get minute forecast"
action: google_weather.get_minute_forecast
domain: google_weather
description: "Retrieves the precipitation forecast (nowcast) for up to 6 hours. Amounts are returned in the weather entity's precipitation unit; the snowfall amount is the liquid-water equivalent, not the snow depth. Unlike the cached forecasts, every call makes a live request to the Google Weather API and counts toward your quota."
related_actions:
  - weather.get_forecasts
---

Use this action to get a short-term precipitation forecast, also called a nowcast, for one of your Google Weather entities. It covers up to the next 6 hours in short segments, so you can tell whether rain is about to start, how heavy it is likely to get, and when it is expected to stop.

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

The response is keyed by the entity ID of each targeted weather entity. For every entity, the response contains:

- `start_time`: when the whole forecast starts.
- `end_time`: when the whole forecast ends.
- `segments`: the list of forecast segments, in chronological order.

Each segment has these fields:

- `start_time`: when the segment starts.
- `end_time`: when the segment ends.
- `precipitation_type`: the kind of precipitation expected. One of `none`, `rain`, `snow`, or `hail`. It is empty if Google doesn't specify a type.
- `precipitation_probability`: how likely the precipitation is, from 0 to 100.
- `precipitation`: the expected amount of liquid precipitation.
- `snowfall_amount`: the expected amount of snow, as its liquid-water equivalent, not the snow depth.
- `intensity`: how heavy the precipitation is expected to be. One of `none`, `light`, `mid_light`, `moderate`, `mid_moderate`, `heavy`, or `mid_heavy`. It is empty if Google doesn't specify an intensity.

The `precipitation` and `snowfall_amount` values use the precipitation unit of the weather entity, the same as `weather.get_forecasts`. They are not rounded, because the amounts in short segments can be very small. Both are empty when Google doesn't provide an amount, which is common for dry segments, so guard for this in templates.

A shortened example response looks like this:

```yaml
weather.home:
  start_time: "2025-06-01T00:00:00Z"
  end_time: "2025-06-01T06:00:00Z"
  segments:
    - start_time: "2025-06-01T00:00:00Z"
      end_time: "2025-06-01T00:02:00Z"
      precipitation_type: rain
      precipitation_probability: 62
      precipitation: 0.5
      snowfall_amount: 0.0
      intensity: moderate
    - start_time: "2025-06-01T00:02:00Z"
      end_time: "2025-06-01T00:04:00Z"
      precipitation_type: none
      precipitation_probability: 0
      precipitation:
      snowfall_amount:
      intensity: none
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
            {% if segment['precipitation_type'] not in ['none', none]
                  and as_timestamp(segment['end_time'])
                      > now().timestamp() %}
              {% set minutes = (as_timestamp(segment['start_time'])
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

- The forecast covers up to the next 6 hours. Segments are 2 or 15 minutes long depending on the location, so do not assume a fixed segment length or a fixed number of segments.
- Google offers this forecast as an experimental, pre-general-availability feature. The data it returns, and its availability in your area, can change.
- A segment with a `precipitation_type` of `none` means no precipitation is expected during that segment.
- The Google Maps Platform terms require that these forecast values are not kept for longer than one hour, so do not archive them in long-term statistics.
- The forecast is only as accurate as the data Google provides for your location.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: get a heads-up before rain starts

Check the nowcast every 15 minutes, and send a notification when precipitation is expected to begin within the next half hour. It stays quiet while precipitation is already falling, so you only hear about it before it starts. Because it checks every 15 minutes and looks 30 minutes ahead, it usually notifies you twice about the same rain: a first heads-up, then a second one closer to the start.

At this cadence the automation adds about 2,900 calls per month, which fits alongside one configured location but not two.

- **Trigger**: Time pattern, every 15 minutes
- **Action**: Google Weather: Get minute forecast
  - **Target**: Home (`weather.home`)
  - **Response variable**: `nowcast`
- **Condition**: Template, no precipitation is falling now and the next precipitation starts within 30 minutes
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
        next_segment: >
          {% set ns = namespace(segment=none) %}
          {% for segment in nowcast['weather.home']['segments']
             if ns.segment is none %}
            {% if segment['precipitation_type'] not in ['none', none]
                  and as_timestamp(segment['end_time'])
                      > now().timestamp() %}
              {% set ns.segment = segment %}
            {% endif %}
          {% endfor %}
          {{ ns.segment }}
    - condition: template
      value_template: >
        {{ next_segment is not none
           and 0 < as_timestamp(next_segment['start_time'])
                   - now().timestamp() < 1800 }}
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {{ next_segment['precipitation_type'] }} expected in about
          {{ ((as_timestamp(next_segment['start_time'])
               - now().timestamp()) / 60) | round | int }} minutes.
{% endexample %}

{% enddetails %}

### Automation: skip the sprinklers when rain is on the way

Before the evening watering run, check the nowcast and only turn the sprinklers on when no meaningful rain is expected in the next 6 hours. The example adds up the forecast amounts, skipping the segments that have no amount. The threshold of `1` is in the precipitation unit of your weather entity, so this example assumes millimeters. If your entity uses inches, use a value such as `0.04` instead.

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
           | map(attribute='precipitation')
           | select
           | sum < 1 }}
    - action: switch.turn_on
      target:
        entity_id: switch.sprinklers
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
