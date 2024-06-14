---
title: Sensoterra
description: Instructions on how to integrate your Sensoterra probes with Home Assistant.
ha_release: 2024.7
ha_category:
  - Sensor
ha_iot_class: Cloud Poll
ha_config_flow: true
ha_domain: sensoterra
ha_platforms:
  - sensor
ha_codeowners:
  - '@markruys'
ha_integration_type: integration
ha_quality_scale: silver
---

This integration interacts with your [Sensoterra](https://sensoterra.com) soil moisture probes by communicating with the public [Sensoterra Customer API](https://monitor.sensoterra.com/api/v3/) through HTTPS.

## Pre-requisites

- You need to own registered Sensoterra soil moisture probes.

## Sensors

The integration offers a few sensors per probe: 

- Soil moisture (either in volumetric-% or in SI)
- Temperature
- LoRaWAN signal strength (RSSI level)
- Battery level (100, 50 or 10% approximations)
- Last seen timestamp

Typically, soil moisture probes measure once an hour. The HA integration polls this data each 15 minutes.
