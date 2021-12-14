---
title: Luftdaten
description: Instructions on how to setup Luftdaten sensors in Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.82
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: gold
ha_codeowners:
  - '@fabaff'
ha_domain: luftdaten
ha_platforms:
  - sensor
---

The `luftdaten` integration will query the open data API of [luftdaten.info](https://luftdaten.info/) to monitor air quality and other weather data from a specific (self build) sensor station.

## Prerequisites

- To get the ID of a particle sensor you need to select it on the [Feinstaub map](https://deutschland.maps.luftdaten.info/) and find it in the sidebar (Column "Sensor ID").
- To get the ID of a temperature/humidity sensor you need to find it on the map hosted on [Madavi](https://www.madavi.de/sensor/feinstaub-map-dht/).

{% include integrations/config_flow.md %}
