---
title: Chef iQ
description: Instructions on how to integrate Chef iQ wireless probes with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Invader444'
ha_domain: chef_iq
ha_integration_type: device
ha_platforms:
  - diagnostics
  - sensor
ha_bluetooth: true
ha_quality_scale: bronze
---

The **Chef iQ** {% term integration %} lets you read the temperatures from Chef iQ wireless cooking probes directly over Bluetooth Low Energy. No cloud account, base station, or hub is required: the probe broadcasts its readings and Home Assistant listens passively.

## Supported devices

The following Chef iQ wireless probes are supported:

- Chef iQ Smart Wireless Meat Thermometer (CQ60)
- Chef iQ Smart Wireless Meat Thermometer (CQ50)

The **iQ Sense** base station broadcasts under the same Bluetooth identifier, but it is a Wi-Fi appliance rather than a passive probe and is not supported by this integration.

## Prerequisites

This integration requires a working [Bluetooth](/integrations/bluetooth/) setup, either a local Bluetooth adapter or an [ESPHome Bluetooth proxy](/integrations/esphome/). The probe is battery-powered and only broadcasts while it is awake, so make sure it is awake (for example, by taking it off its charging dock) before adding it.

{% include integrations/config_flow.md %}

## Supported functionality

The **Chef iQ** {% term integration %} provides the following {% term entities %}.

### Sensors

A probe exposes the following sensors:

- **Food temperature**: the food (internal) temperature at the probe tip.
- **Ambient temperature**: the ambient (cooking environment) temperature.
- **Probe tip 1 through 4 temperatures**: the temperatures measured along the probe shaft (disabled by default).
- **Battery**: the probe battery percentage.
- **SoC temperature**: the temperature of the probe's system-on-chip (SoC), its internal electronics (diagnostic, disabled by default).
- **Signal strength**: the Bluetooth signal strength (diagnostic, disabled by default).

The battery level and <abbr title="system-on-chip">SoC</abbr> temperature are sent in a separate Bluetooth advertisement from the cooking temperatures (food, ambient, and probe tip), so they may appear a few seconds later after setup.

## Known limitations

The integration is passive and read-only. It reports the probe's broadcast readings, but cannot start cooks, set target temperatures, or change probe settings. Those features require the Chef iQ app.

## Troubleshooting

If the device is not discovered, try the following:

1. Make sure that the probe is awake and broadcasting (take it off its dock).
2. Make sure your Bluetooth adapter or proxy is in range of the probe.
3. Make sure the [Bluetooth](/integrations/bluetooth/) integration is set up and working.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
