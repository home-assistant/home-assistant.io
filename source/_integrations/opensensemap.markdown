---
title: openSenseMap
description: Instructions on how to setup openSenseMap sensors in Home Assistant.
ha_category:
  - Health
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_domain: opensensemap
ha_platforms:
  - air_quality
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `opensensemap` air quality {% term integration %} will query the open data API of [openSenseMap.org](https://opensensemap.org/) to monitor air quality sensor station.

## Setup

To get the ID of a station you need to select it on the [openSense map](https://opensensemap.org/) and find it in the addressbar of your browser. It's the last part of the URL, e.g., `5b450e565dc1ec001bf7cd1d` [https://opensensemap.org/explore/5b450e565dc1ec001bf7cd1d](https://opensensemap.org/explore/5b450e565dc1ec001bf7cd1d).

## Manual configuration

To enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: opensensemap
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
