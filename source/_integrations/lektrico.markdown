---
title: Lektrico Charging Station
description: Instructions on how to integrate a Lektrico Chargering Station with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.47
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@mtarjoianu'
ha_quality_scale: platinum
ha_domain: lektrico
ha_zeroconf: false
ha_platforms:
  - sensor
---

This `lektrico` integrates your [Lektrico Charging Station](https://lektri.co/en/product/ev-charging-station-lektri-co-svik-7-4kw-ac/) into your Home Assistant and allows you to monitor it.

## Configuration

The Lektrico Charging Station device will be added as a sensor in Home Assistant.

Before adding the integration you must know the device's IP.
For this you can use some network scanners.
