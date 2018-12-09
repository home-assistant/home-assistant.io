---
layout: page
title: "Islamic Prayer Times"
description: "Instructions on how to integrate the Islamic Prayer Times sensor within Home Assistant."
date: 2018-12-09 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Calendar
ha_iot_class: "Local Poll"
ha_release: "0.85"
---

The Islamic Prayer Times (`islamic_prayer_times`) sensor platform displays the various prayer times for Muslims as sensors.

## {% linkable_title Configuration %}

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: islamic_prayer_times
```

{% configuration %}
sensors:
  required: false
  default: 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha'
  description: List of available sensors.
  keys:
    fajr:
      description: Show the fajr prayer time for today.
    sunrise:
      description: Show the sunrise for today which is the end of fajr prayer.  This is a calculated field and may not necessarily be the same as the astronomical sunrise.
    dhuhr:
      description: Show the dhuhr prayer time for today.
    asr:
      description: Show the asr prayer time for today.
    maghrib:
      description: Show the maghrib prayer time for today.
    isha:
      description: Show the isha prayer time for today.
    midnight:
      description: Show the midnight for today which is the end of isha prayer.  This is a calculated field and is not the same as 12:00AM.
calculation_method:
  required: false
  default: 'isna'
  description: The calculation method used for prayer times.  Must be one of:
  keys:
    karachi:
      description: University of Islamic Sciences, Karachi
    isna:
      description: Islamic Society of North America
    mwl:
      description: Muslim World League
    makkah:
      description: Umm Al-Qura University, Makkah
{% endconfiguration %}

```yaml
# Example configuration.yaml entry for all available sensors
sensor:
  - platform: islamic_prayer_times
    sensors:
      - fajr
      - sunrise
      - dhuhr
      - asr
      - maghrib
      - isha
      - midnight
```
