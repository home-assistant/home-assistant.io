---
title: openSenseMap
description: Instructions on how to setup openSenseMap sensors in Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: opensensemap
ha_platforms:
  - air_quality
  - sensor
ha_integration_type: service
ha_quality_scale: legacy
---

The **openSenseMap** {% term integration %} queries the open data API of [openSenseMap.org](https://opensensemap.org/) to monitor the measurements published by a sensor station.

## Setup

To find the ID of a station, open it on [openSenseMap](https://opensensemap.org/) and copy the last segment of the URL — for example, `5b450e565dc1ec001bf7cd1d` in [https://opensensemap.org/explore/5b450e565dc1ec001bf7cd1d](https://opensensemap.org/explore/5b450e565dc1ec001bf7cd1d).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Station ID:
  description: The ID of the openSenseMap station to monitor.
{% endconfiguration_basic %}

## Sensors

A sensor entity is created for each of the following measurements that the station reports:

- **PM1** — particulate matter under 1 µm (µg/m³)
- **PM2.5** — particulate matter under 2.5 µm (µg/m³)
- **PM10** — particulate matter under 10 µm (µg/m³)
- **Temperature**
- **Humidity** (%)
- **Atmospheric pressure**
- **Illuminance** (lx)
- **Wind speed**
- **Wind direction** (°)
