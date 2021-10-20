---
title: Ampio Smart Smog System
description: Instructions on how to setup Ampio Smog sensors in Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.92
ha_iot_class: Cloud Polling
ha_domain: ampio
ha_platforms:
  - air_quality
---

The `ampio` air quality platform will query the open data API of [ampio.pl](http://smog.ampio.pl/) to monitor air quality sensor station.

## Setup

To get the ID of a station you need to contact Ampio directly.

## Manual Configuration

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: ampio
    station_id: STATION_ID
```

{% configuration %}
station_id:
  description: The ID of the station to monitor.
  required: true
  type: string
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: Station name
  type: string
{% endconfiguration %}
