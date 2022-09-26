---
title: Time & Date
description: Instructions on how to create time and the date sensors within Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Local Push
ha_release: pre 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@fabaff'
ha_domain: time_date
ha_platforms:
  - sensor
ha_integration_type: integration
---

The time and date (`time_date`) integration allows one to create sensors for the current date or time in different formats. All values are based on the timezone which is set in "General Configuration". 

To have these sensors available in your installation, add the following to your `configuration.yaml` file (each option creates a separate sensor that contains appropriate data, e.g.,  `sensor.date` for the `date` option):

```yaml
# Example configuration.yaml entry
sensor:
  - platform: time_date
    display_options:
      - 'time'
      - 'date'
      - 'date_time'
      - 'date_time_utc'
      - 'date_time_iso'
      - 'time_date'
      - 'time_utc'
      - 'beat'
```


{% configuration %}
display_options:
  description: The sensors to create. The types *date_time*, *date_time_utc*, *time_date*, and *date_time_iso* create combined date and the time sensors. The other types just the time sensor or the date sensor. *beat* creates the [Swatch Internet Time](https://en.wikipedia.org/wiki/Swatch_Internet_Time).
  required: true
  type: list
{% endconfiguration %}


Sensors including the time update every minute, the date sensor updates each day at midnight, and the beat sensor updates with each beat (86.4 seconds).

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
