---
title: Islamic Prayer Times
description: Instructions on how to integrate the Islamic Prayer Times integration within Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.85
ha_config_flow: true
ha_domain: islamic_prayer_times
---

The Islamic Prayer Times (`islamic_prayer_times`) integration displays the various prayer times for Muslims as sensors.

This platform calculates prayer times using the following calculation methods:

- University of Islamic Sciences in Karachi
- Islamic Society of North America
- Muslim World League
- Umm Al-Qura University in Makkah

## Configuration

Set up the integration through **Configuration -> Integrations -> Islamic Prayer Times**. To import the configuration from `configuration.yaml` remove any previously configured sensors with platform type `islamic_prayer_times` and add the following lines:

```yaml
# Example configuration.yaml entry
islamic_prayer_times:

```

{% configuration %}
calculation_method:
  required: false
  default: 'isna'
  type: string
  description: "The calculation method used for prayer times.  Must be one of: `karachi`, `isna`, `mwl`, `makkah`."
{% endconfiguration %}

## Integration Sensors

The following sensors are added by the integration:

sensors:
  - fajr: Show the fajr prayer time for today.
  - sunrise: Show the sunrise for today which is the end of fajr prayer. This is a calculated field and may not necessarily be the same as the astronomical sunrise.
  - dhuhr: Show the dhuhr prayer time for today.
  - asr: Show the asr prayer time for today.
  - maghrib: Show the maghrib prayer time for today.
  - isha: Show the isha prayer time for today.
  - midnight: Show the midnight for today which is the end of isha prayer. This is a calculated field and is not the same as 12AM.

```yaml
# Example configuration.yaml using a non-default calculation method
islamic_prayer_times:
    calculation_method: makkah

```
