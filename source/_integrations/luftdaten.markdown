---
title: Sensor.Community
description: Instructions on how to add Sensor.Community sensors to Home Assistant.
ha_category:
  - Health
  - Sensor
ha_release: 0.82
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@frenck'
ha_domain: luftdaten
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

The Sensor.Communtiy integration will query the open data API of [Sensor.Community](https://sensor.community) to monitor air quality and other weather data from a specific (self build) sensor station.

## Prerequisites

To get the ID of a particle, pressure, noise, temperature, or humidity sensor by selecting it on the [Sensor.Community map](https://maps.sensor.community/).
After selecting the sensor, it will show the needed ID in the sidebar with a `#` in front of it.

{% include integrations/config_flow.md %}
