---
title: Rainforest RAVEn
description: Instructions on how to setup Rainforest RAVEn devices with Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2024.2
ha_iot_class: Local Polling
ha_codeowners:
  - '@cottsay'
ha_domain: rainforest_raven
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

The RAVEn family of devices from Rainforest Automation, Inc. includes the [EMU-2](https://www.rainforestautomation.com/rfa-z105-2-emu-2-2/), a wireless device that reads energy usage information directly from your utility meter. This integration connects to a RAVEn-compatible device attached to the Home Assistant instance via USB to integrate instantaneous power demand, accumulated usage, and current unit pricing.

{% include integrations/config_flow.md %}
