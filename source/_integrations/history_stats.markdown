---
title: History Stats
description: Instructions about how to integrate historical statistics into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.39
ha_quality_scale: internal
ha_domain: history_stats
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **History stats** {% term integration %} provides quick statistics about another integration or platforms, using data from the [`history`](/integrations/history/) integration.

It can track how long an {% term entity %} has been in a specific state, in a custom time period.

Examples of what you can track:

- How long you were at home this week
- How long the lights were ON yesterday
- How long you watched TV today

{% include integrations/config_flow.md %}

Further information and examples about these configuration options can be found under the [YAML configuration](#yaml-configuration)

{% configuration_basic %}
Name:
  description: The name the sensor should have.
Entity:
  description: The entity that provides the input.
State:
  description: Which states of the input entity is counted in the statistics.
Type:
  description: Any of `time`, `ratio` or `count`.
Start:
  description: When to start the measure (timestamp or datetime). Can be a template.
End:
  description: When to stop the measure (timestamp or datetime). Can be a template.
Duration:
  description: Duration of the measure.
State class:
  description: The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor.
Minimum duration of measurement:
  description: Minimum duration of the measurement to be considered for calculations (defaults to 0, all measurements will be included). Useful to exclude short state changes from the statistics.
{% endconfiguration_basic %}

## YAML Configuration

To enable the history statistics sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: history_stats
    name: Lamp ON today
    entity_id: light.my_lamp
    state: "on"
    type: time
    start: "{{ today_at() }}"
    end: "{{ now() }}"
```

{% configuration %}
entity_id:
  description: The entity you want to track.
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this entity. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
state:
  description: The states you want to track.
  required: true
  type: [list, string]
name:
  description: Name displayed on the frontend. Note that it is used by Home Assistant to generate sensor's `object_id` so it is advisable to choose a unique one and change name for frontend using [customization](/docs/configuration/customizing-devices/#friendly_name) or via [Dashboards](/dashboards/entities/#name).
  required: false
  default: unnamed statistics
  type: string
type:
  description: "The type of sensor: `time`, `ratio`, or `count`."
  required: false
  default: time
  type: string
start:
  description: When to start the measure (timestamp or datetime).
  required: false
  type: template
end:
  description: When to stop the measure (timestamp or datetime).
  required: false
  type: template
duration:
  description: Duration of the measure.
  required: false
  type: time
state_class:
  description: "[state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor. May be `null`, `measurement`, or `total_increasing` (not allowed for `ratio` type)."
  required: false
  default: measurement
  type: string
min_state_duration:
  description: Minimum duration of the measurement to be considered for calculations. Used as a filter to remove short state changes from statistics.
  required: false
  default: 0
  type: time
{% endconfiguration %}

{% note %}

  You have to provide **exactly 2** of `start`, `end` and `duration`.
<br/>
  You can use [template extensions](/docs/templating/) such as `now()` or `as_timestamp()` to handle dynamic dates, as shown in the examples below.

{% endnote %}

## Sensor type

Depending on the sensor type you choose, the `history_stats` integration can show different values:

- **time**: The default value, which is the tracked time, in hours
- **ratio**: The tracked time divided by the length of your period, as a percentage
- **count**: How many times the tracked entity matched the configured state during the time period. This will count states (for example, how many times a light was in the `on` state during the time period), as opposed to counting state transitions (for example, how many times a light was *turned* `on`). The difference is if the entity was already in the desired state at the start of the time period, that scenario will be counted with this sensor type. If a list of states is provided to the state option, transitions between defined states are considered all part of a single event and do not increment the count.

{% note %}
For a **time** or **count** sensor that uses a time period that does not slide (such as one that resets upon each hour, as opposed to one which considers the trailing 60 minutes), set the `state_class` to `total_increasing` to generate statistics that track the `sum`. This is useful when emulating the behavior of a `utility_meter` helper that has a defined reset cycle.
{% endnote %}

## Time periods

The `history_stats` integration will execute a measure within a precise time period. You should always provide 2 of the following :
- When the period starts (`start` variable)
- When the period ends (`end` variable)
- How long is the period (`duration` variable)

As `start` and `end` variables can be either datetimes or timestamps, you can configure almost any period you want.

### Duration

The duration variable is used when the time period is fixed. Different syntaxes for the duration are supported, as shown below.

```yaml
# 6 hours
duration: "06:00"
```

```yaml
# 1 minute, 30 seconds
duration: "00:01:30"
```

```yaml
# 2 hours and 30 minutes
duration:
  # supports seconds, minutes, hours, days
  hours: 2
  minutes: 30
```

{% note %}
If the duration exceeds the number of days of history stored by the `recorder` integration (`purge_keep_days`), the history statistics sensor will not have all the information it needs to look at the entire duration. For example, if `purge_keep_days` is set to 7, a history statistics sensor with a duration of 30 days will only report a value based on the last 7 days of history.
{% endnote %}

{% note %}
The history stats sensor will be updated when the source entity changes or once per minute if there is no source change. Keep this in mind when using fixed durations that aren't evenly divisible by one minute.
{% endnote %}

## Minimum state duration

The minimum state duration variable is used to exclude short state changes from the statistics. In this example state changes shorter than 2 minutes will be excluded from statistics. It can be useful for instance to exclude short disconnections of a device. 

```yaml
# 2 minutes
min_state_duration: "00:02:00"
```

## Video tutorial
This video tutorial explains how you can use history stats. It also shows how you can create a daily bar chart graph to visualize things such as occupancy, or how long the lights are on in a particular room.

<lite-youtube videoid="BMlU4SynQBY" videotitle="How To Master Graphs to Monitor Occupancy and Device Usage in Home Assistant" posterquality="maxresdefault"></lite-youtube>

## Examples

{% important %}
When writing templates for `start`, `end`, or `duration`, prefer helpers like [`today_at('HH:MM')`](/docs/templating/dates-and-times/#today_at) over manual datetime math with `now() + timedelta(...)` combined with `.replace(hour=..., minute=...)`. On days when daylight saving time starts or ends, replacing the hour field of a local time may land in a skipped or repeated hour, which can silently produce the wrong timestamp. `today_at()` always returns a valid local datetime and is the safer building block for local-time boundaries. For more context, see [Dates and times in templates](/docs/templating/dates-and-times/).
{% endimportant %}

Here are some examples of periods you could work with, and what to write in your {% term "`configuration.yaml`" %}:

**Today**: starts at 00:00 of the current day and ends right now.

```yaml
    start: "{{ today_at('00:00') }}"
    end: "{{ now() }}"
    state_class: total_increasing
```

**Yesterday**: ends today at 00:00, lasts 24 hours.

```yaml
    end: "{{ today_at('00:00') }}"
    duration:
      hours: 24
```

**This morning (6AM - 11AM)**: starts today at 6, lasts 5 hours.

```yaml
    start: "{{ today_at('06:00') }}"
    duration:
      hours: 5
```

**Current week**: starts last Monday at 00:00, ends right now.

Here, last Monday is today at 00:00, minus the current weekday (the weekday is 0 on Monday, 6 on Sunday).

```yaml
    start: "{{ today_at('00:00') - timedelta(days=now().weekday()) }}"
    end: "{{ now() }}"
```

**Current month**: starts the first day of the current month at 00:00, ends right now.

```yaml
    start: "{{ today_at('00:00').replace(day=1) }}"
    end: "{{ now() }}"
```

**Previous month**: starts the first day of the previous month at 00:00, ends the first day of the current month.

```yaml
    start: "{{ (today_at('00:00').replace(day=1) - timedelta(days=1)).replace(day=1) }}"
    end: "{{ today_at('00:00').replace(day=1) }}"
```

**Next 4 pm**: 24 hours, from the last 4 pm until the next 4 pm. If it is not yet 4 pm today, the period runs from 4 pm yesterday to 4 pm today. If it is at or after 4 pm today, the period runs from 4 pm today to 4 pm tomorrow. When changing the start time, adjust the hour in `today_at()` accordingly.

```yaml
    end: >-
      {% set today_4pm = today_at('16:00') %}
      {{
        today_4pm if now() < today_4pm
        else today_4pm + timedelta(days=1)
      }}
    duration:
      hours: 24
```

**Last 30 days**: ends today at 00:00, lasts 30 days. Easy one.

```yaml
    end: "{{ today_at('00:00') }}"
    duration:
      days: 30
```

**All your history** starts at timestamp = 0, and ends right now.

```yaml
    start: "{{ 0 }}"
    end: "{{ now() }}"
```

{% tip %}
The `/developer-tools/template` page of your Home Assistant UI can help you check if the values for `start`, `end` or `duration` are correct. If you want to check if your period is right, just click on your component, the `from` and `to` attributes will show the start and end of the period, nicely formatted.
{% endtip %}
