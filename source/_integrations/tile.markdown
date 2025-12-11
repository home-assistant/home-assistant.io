---
title: Tile
description: Instructions on how to use Tile to track devices in Home Assistant.
ha_release: 0.58
ha_category:
  - Presence detection
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@bachya'
ha_domain: tile
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - device_tracker
  - diagnostics
ha_integration_type: hub
---

The `tile` platform allows Home Assistant to utilize [Tile® Bluetooth trackers](https://www.thetileapp.com).
The official Tile mobile app handles the actual tracking of Tile devices using
the mobile device's Bluetooth and GPS.

{% include integrations/config_flow.md %}
