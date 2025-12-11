---
title: Sensoterra
description: Instructions on how to integrate your Sensoterra probes with Home Assistant.
ha_release: '2024.10'
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: sensoterra
ha_platforms:
  - sensor
ha_codeowners:
  - '@markruys'
ha_integration_type: hub
---

This {% term integration %} communicates with your [Sensoterra](https://sensoterra.com) soil moisture probes using the public [Sensoterra Customer API](https://monitor.sensoterra.com/api/v3/) via HTTPS.

## Prerequisites

Soil moisture probes can be purchased at Sensoterra.com. Create a free account in the Sensoterra app and register your probes. The Sensoterra Home Assistant integration needs your credentials to obtain a token to access your probe data.

{% include integrations/config_flow.md %}

## Sensors

The integration provides the following sensors for each probe:

- Soil moisture (either in volumetric-% or in SI)
- Temperature (in degrees Celsius)
- LoRaWAN signal strength (RSSI level)
- Battery level (100, 50 or 10% approximations)
- Last seen timestamp

Typically, soil moisture probes measure once an hour. The Home Assistant integration polls this data every 15 minutes.
