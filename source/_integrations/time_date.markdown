---
title: Time & Date
description: Instructions on how to integrate the time and the date within Home Assistant.
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
---

The time and date (`time_date`) integration allows one to show the current date or time in different formats. All values are based on the timezone which is set in "General Configuration". 

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
  description: The option to display. The types *date_time*, *date_time_utc*, *time_date*, and *date_time_iso* shows the date and the time. The other types just the time or the date. *beat* shows the [Swatch Internet Time](https://2020.swatch.com/en_my/internet-time/).
  required: true
  type: list
{% endconfiguration %}


Sensors including the time update every minute, the date sensor updates each day at midnight, and the beat sensor updates with each beat (86.4 seconds).

<p class='img'>
  <img src='/images/screenshots/time_date.png' />
</p>

# Producing your own custom time and date sensor

Whilst there are a number of `display_options` exposed by this sensor, they cannot hope to satisfy everyone, and large parts of the world will find that their local display conventions are not included.

The following can be used to create a time and date sensor whose output can be properly customised to use your own preferred formatting, specified in the call to timestamp_custom() using standard [Python datetime formatting](https://docs.python.org/3.8/library/datetime.html#strftime-and-strptime-behavior).

{% raw %}

```yaml
sensor:
  # Minimal configuration of the standard time and date sensor
  - platform: time_date
    display_options:
      - 'date_time_iso'
  # Build on the standard sensor to produce one that can be customized    
  - platform: template
    sensors:
      time_formatted:
        friendly_name: "Date and time"
        value_template: "{{ as_timestamp(states('sensor.date_time_iso')) | timestamp_custom('%A %B %-m, %I:%M %p') }}"
        icon_template: mdi:calendar-clock
```

{% endraw %}
