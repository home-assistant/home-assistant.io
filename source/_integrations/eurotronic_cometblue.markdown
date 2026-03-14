---
title: Eurotronic Comet Blue Thermostats
description: Instructions on how to integrate Eurotronic Comet Blue Thermostats into Home Assistant.
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2026.4
ha_config_flow: true
ha_codeowners:
  - '@rikroe'
ha_domain: eurotronic_cometblue
ha_integration_type: device
ha_platforms:
  - climate
  - number
  - sensor
---

The **Eurotronic Comet Blue** {% term integration %} allows you to integrate Eurotronic Comet Blue (and similar) thermostats.
These Bluetooth Radiator Valves can be programmed with a schedule, as well as overwritten via Home Assistant.

## Supported devices
- Eurotronic Comet Blue
- Sygonix HT100 BT
- Xavax Hama
- Lidl Silvercrest RT2000BT

## Discovery

The Eurotronic Comet Blue {% term integration %} integration will automatically discover devices once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional.

The device require active scans to be discovered.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Device PIN:
  description: "Device PIN with 6 digits."
  required: true
  type: integer
  default: 000000
{% endconfiguration_basic %}

## Climate
TODO: high/low, presets

## Numbers
TODO: Target temp low, high, offset, window

## Actions
### Get schedule
### Set schedule
### Set datetime
### Set holiday

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}