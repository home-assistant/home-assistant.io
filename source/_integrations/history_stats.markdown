---
title: History Stats
description: Instructions about how to integrate historical statistics into Home Assistant.
ha_category:
  - Utility
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.39
ha_quality_scale: internal
ha_domain: history_stats
ha_platforms:
  - sensor
---

The `history_stats` sensor platform provides quick statistics about another integration or platforms, using data from the [`history`](/integrations/history/) integration.

It can track how long the integration has been in a specific state, in a custom time period.

Examples of what you can track:

- How long you were at home this week
- How long the lights were ON yesterday
- How long you watched TV today

## Configuration

To enable the history statistics sensor, add the following lines to your `configuration.yaml`:

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: history_stats
    name: Lamp ON today
    entity_id: light.my_lamp
    state: "on"
    type: time
    start: "{{ now().replace(hour=0, minute=0, second=0) }}"
    end: "{{ now() }}"
```

{% endraw %}

{% configuration %}
entity_id:
  description: The entity you want to track.
  required: true
  type: string
state:
  description: The states you want to track.
  required: true
  type: [list, string]
name:
  description: Name displayed on the frontend. Note that it is used by Home Assistant to generate sensor's `object_id` so it is advisable to choose a unique one and change name for frontend using [customization](/docs/configuration/customizing-devices/#friendly_name) or via [Lovelace](/lovelace/entities/#name).
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

<div class='note'>

  You have to provide **exactly 2** of `start`, `end` and `duration`.
<br/>
  You can use [template extensions](/topics/templating/#home-assistant-template-extensions) such as `now()` or `as_timestamp()` to handle dynamic dates, as shown in the examples below.

</div>

## Sensor type

Depending on the sensor type you choose, the `history_stats` integration can show different values:

- **time**: The default value, which is the tracked time, in hours
- **ratio**: The tracked time divided by the length of your period, as a percentage
- **count**: How many times the integration you track was changed to the state you track

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
duration: 06:00
```

```yaml
# 1 minute, 30 seconds
duration: 00:01:30
```

```yaml
# 2 hours and 30 minutes
duration:
  # supports seconds, minutes, hours, days
  hours: 2
  minutes: 30
```

<div class='note'>

  If the duration exceeds the number of days of history stored by the `recorder` component (`purge_keep_days`), the history statistics sensor will not have all the information it needs to look at the entire duration. For example, if `purge_keep_days` is set to 7, a history statistics sensor with a duration of 30 days will only report a value based on the last 7 days of history.

</div>

### Examples

Here are some examples of periods you could work with, and what to write in your `configuration.yaml`:

**Today**: starts at 00:00 of the current day and ends right now.

{% raw %}

```yaml
    start: "{{ now().replace(hour=0, minute=0, second=0) }}"
    end: "{{ now() }}"
```

{% endraw %}

**Yesterday**: ends today at 00:00, lasts 24 hours.

{% raw %}

```yaml
    end: "{{ now().replace(hour=0, minute=0, second=0) }}"
    duration:
      hours: 24
```

{% endraw %}

**This morning (6AM - 11AM)**: starts today at 6, lasts 5 hours.

{% raw %}

```yaml
    start: "{{ now().replace(hour=6, minute=0, second=0) }}"
    duration:
      hours: 5
```

{% endraw %}

**Current week**: starts last Monday at 00:00, ends right now.

Here, last Monday is _today_ as a timestamp, minus 86400 times the current weekday (86400 is the number of seconds in one day, the weekday is 0 on Monday, 6 on Sunday).

{% raw %}

```yaml
    start: "{{ as_timestamp( now().replace(hour=0, minute=0, second=0) ) - now().weekday() * 86400 }}"
    end: "{{ now() }}"
```

{% endraw %}

**Next 4 pm**: 24 hours, from the last 4 pm till the next 4 pm. If it hasn't been 4 pm today, that would be 4 pm yesterday until 4 pm today. If it is already past 4 pm today, it will be 4 pm today until 4 pm tomorrow. When changing the start time, then add or subtract to the 8-hour buffer to match the next midnight.

{% raw %}

```yaml
    end: "{{ (now().replace(minute=0,second=0) + timedelta(hours=8)).replace(hour=16) }}"
    duration:
        hours: 24
```

{% endraw %}

**Last 30 days**: ends today at 00:00, lasts 30 days. Easy one.

{% raw %}

```yaml
    end: "{{ now().replace(hour=0, minute=0, second=0) }}"
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

<div class='note'>

  The `/developer-tools/template` page of your Home Assistant UI can help you check if the values for `start`, `end` or `duration` are correct. If you want to check if your period is right, just click on your component, the `from` and `to` attributes will show the start and end of the period, nicely formatted.

</div>
