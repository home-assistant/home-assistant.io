---
title: SmartTub
description: Instructions on how to integrate SmartTub into Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 2021.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@mdz'
ha_domain: smarttub
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
---

The `smarttub` integration allows you to view and control hot tubs which use the [SmartTub](https://www.jacuzzi.com/en-us/hot-tubs/owners/smarttub-system) system, in Home Assistant.

## Prerequisites

- A hot tub with a SmartTub module
- A SmartTub account (registration is not supported, you can use the SmartTub mobile app)

{% include integrations/config_flow.md %}
