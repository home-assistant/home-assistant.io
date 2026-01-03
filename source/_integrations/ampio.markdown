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
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ampio` air quality platform will query the open data API of [ampio.pl](http://smog.ampio.pl/) to monitor air quality sensor station.

## Setup

To get the ID of a station you need to contact Ampio directly.

## Manual configuration

To enable this platform, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
