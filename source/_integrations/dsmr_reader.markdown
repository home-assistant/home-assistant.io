---
title: DSMR Reader
description: Instructions on how to integrate DSMR Reader.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.103
ha_codeowners:
  - '@depl0y'
ha_domain: dsmr_reader
ha_platforms:
  - sensor
---

The `dsmr_reader` sensor integration allows you to easily add all sensors that [DSMR Reader](https://dsmr-reader.readthedocs.io/en/latest/) (Dutch Smart Meter Requirements Reader) exposes to MQTT. It adds a separate sensor for every field in the MQTT topics which is named `sensor_dsmr_<mqtt_topic>`.

## Prerequisites

- DSMR Reader
- MQTT broker

## Setup

1. Configure the MQTT broker in DSMR Reader which Home Assistant also connects to
2. Enable the following data sources in DSMR Reader with the default mapping:
   - Day consumption: Split topic
   - Gas consumption: Split topic
   - Meter Statistics: Split topic
   - Telegram: Split topic

## Configuration

To use this integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dsmr_reader
```
