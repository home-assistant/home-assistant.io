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
{% endconfiguration_basic %}

## YAML Configuration

To enable the history statistics sensor, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

{% raw %}

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

{% endraw %}

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
{% endconfiguration %}

{% note %}

  You have to provide **exactly 2** of `start`, `end` and `duration`.
<br/>
  You can use [template extensions](/docs/configuration/templating/#home-assistant-template-extensions) such as `now()` or `as_timestamp()` to handle dynamic dates, as shown in the examples below.

{% endnote %}

## Sensor type

Depending on the sensor type you choose, the `history_stats` integration can show different values:

- **time**: The default value, which is the tracked time, in hours
- **ratio**: The tracked time divided by the length of your period, as a percentage
- **count**: How many times the tracked entity matched the configured state during the time period. This will count states (for example, how many times a light was in the `on` state during the time period), as opposed to counting state transitions (for example, how many times a light was *turned* `on`). The difference is if the entity was already in the desired state at the start of the time period, that scenario will be counted with this sensor type.

{% note %}
For a **time** or **count** sensor that uses a time period that does not slide (such as one that resets upon each hour, as opposed to one which considers the trailing 60 minutes), consider using [customization](/docs/configuration/customizing-devices/#customizing-an-entity-in-yaml) to change the `state_class` to `total_increasing` to generate statistics that track the `sum`. This is useful when emulating the behavior of a `utility_meter` helper that has a defined reset cycle. Without intervention, the `state_class` of any `history_stats` sensor will be `measurement` and will therefore generate `average`, `min`, and `max` statistics.
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

### Video tutorial
This video tutorial explains how you can use history stats. It also shows how you can create a daily bar chart graph to visualize things such as occupancy, or how long the lights are on in a particular room.

<lite-youtube videoid="BMlU4SynQBY" videotitle="How To Master Graphs to Monitor Occupancy and Device Usage in Home Assistant" posterquality="maxresdefault"></lite-youtube>

### Examples

Here are some examples of periods you could work with, and what to write in your {% term "`configuration.yaml`" %}:

**Today**: starts at 00:00 of the current day and ends right now.

{% raw %}

```yaml
    start: "{{ today_at('00:00') }}"
    end: "{{ now() }}"
```

{% endraw %}

**Yesterday**: ends today at 00:00, lasts 24 hours.

{% raw %}

```yaml
    end: "{{ today_at('00:00') }}"
    duration:
      hours: 24
```

{% endraw %}

**This morning (6AM - 11AM)**: starts today at 6, lasts 5 hours.

{% raw %}

```yaml
    start: "{{ today_at('06:00') }}"
    duration:
      hours: 5
```

{% endraw %}

**Current week**: starts last Monday at 00:00, ends right now.

Here, last Monday is today at 00:00, minus the current weekday (the weekday is 0 on Monday, 6 on Sunday).

{% raw %}

```yaml
    start: "{{ today_at('00:00') - timedelta(days=now().weekday()) }}"
    end: "{{ now() }}"
```

{% endraw %}

**Current month**: starts the first day of the current month at 00:00, ends right now.

{% raw %}

```yaml
    start: "{{ today_at('00:00').replace(day=1) }}"
    end: "{{ now() }}"
```

{% endraw %}

**Previous month**: starts the first day of the previous month at 00:00, ends the first day of the current month.

{% raw %}

```yaml
    start: "{{ (today_at('00:00').replace(day=1) - timedelta(days=1)).replace(day=1) }}"
    end: "{{ today_at('00:00').replace(day=1) }}"
```

{% endraw %}

**Next 4 pm**: 24 hours, from the last 4 pm till the next 4 pm. If it hasn't been 4 pm today, that would be 4 pm yesterday until 4 pm today. If it is already past 4 pm today, it will be 4 pm today until 4 pm tomorrow. When changing the start time, then add or subtract to the 8-hour buffer to match the next midnight.

{% raw %}

```yaml
    end: "{{ (now() + timedelta(hours=8)).replace(hour=16, minute=0, second=0, microsecond=0) }}"
    duration:
        hours: 24
```

{% endraw %}

**Last 30 days**: ends today at 00:00, lasts 30 days. Easy one.

{% raw %}

```yaml
    end: "{{ today_at('00:00') }}"
    duration:
      days: 30
```

{% endraw %}

**All your history** starts at timestamp = 0, and ends right now.

{% raw %}

```yaml
    start: "{{ 0 }}"
    end: "{{ now() }}"
```

{% endraw %}

{% tip %}
The `/developer-tools/template` page of your Home Assistant UI can help you check if the values for `start`, `end` or `duration` are correct. If you want to check if your period is right, just click on your component, the `from` and `to` attributes will show the start and end of the period, nicely formatted.
{% endtip %}
