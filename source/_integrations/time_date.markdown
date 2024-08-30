---
title: Time & Date
description: Instructions on how to create time and the date sensors within Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Local Push
ha_release: pre 0.7
ha_quality_scale: internal
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
ha_domain: time_date
ha_platforms:
  - sensor
ha_integration_type: service
---

The time and date (`time_date`) integration allows one to create sensors for the current date or time in different formats. All values are based on the timezone which is set in "General Configuration". 

{% include integrations/config_flow.md %}

Sensors including the time update every minute, the date sensor updates each day at midnight.

<p class='img'>
  <img src='/images/screenshots/time_date.png' />
</p>

# Producing your own custom time and date sensor

The following can be used to create a time and date sensor whose output can be properly customised to use your own preferred formatting, specified in the call to timestamp_custom() using standard [Python datetime formatting](https://docs.python.org/3.8/library/datetime.html#strftime-and-strptime-behavior).

{% raw %}

```yaml
sensor:
  # Minimal configuration of the standard time and date sensor
  - platform: time_date
    display_options:
      - 'date_time_iso'
  # Build on the standard sensor to produce one that can be customized    
template:
  - sensor:
      - name: "Date and time"
        state: "{{ as_timestamp(states('sensor.date_time_iso')) | timestamp_custom('%A %B %-d, %I:%M %p') }}"
        icon: "mdi:calendar-clock"
```

{% endraw %}

## More time-related resources

For more information about using time related variables and sensors in templates (such as `today_at()`, `now()` or `as_timestamp()`) visit this [time section](/docs/configuration/templating/#time) on the templating page.
