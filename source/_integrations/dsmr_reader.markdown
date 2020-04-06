---
title: DSMR Reader
description: Instructions on how to integrate DSMR Reader.
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.103
ha_codeowners:
  - '@depl0y'
ha_domain: dsmr_reader
---

The `dsmr_reader` sensor platform allows you to easily add all sensors that [DSMR Reader](https://dsmr-reader.readthedocs.io/en/latest/) exposes to MQTT. It adds a separate sensor for every field in the MQTT topics.

## Setup

To use this component, you will need DSMR Reader to be set up to publish to the MQTT server, that Home Assistant also uses. It is important that you setup DSMR Reader to publish to MQTT using "Split Topic" and that you use the default mappings.

## Configuration

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dsmr_reader
```
