---
title: OKOK Scale
description: Instructions to configure the OKOK Scale integration into Home Assistant.
ha_release: 2026.8
ha_iot_class: Local Push
ha_codeowners:
  - '@rrooggiieerr'
ha_config_flow: true
ha_domain: okokscale
ha_integration_type: device
ha_platforms:
  - sensor
ha_bluetooth: true
ha_quality_scale: bronze
---

The **OKOK Scale** {% term integration %} allows you to connect your [OKOK·International App](https://okokapp.com/) supported scale to Home Assistant. This lets you keep an eye on your weight over time in Home Assistant, chart it on a dashboard, and use each new measurement in your automations.

## Supported devices

The following device is known to be supported by the integration:

- Tristar WG-2440

## Prerequisites

This integration requires a working [Bluetooth](/integrations/bluetooth/) setup, either a local Bluetooth adapter or an [ESPHome Bluetooth proxy](/integrations/esphome/). The scale is battery-powered and only broadcasts while it is awake, so make sure it is awake by doing a measurement before adding it.

{% include integrations/config_flow.md %}

## Supported functionality

The **OKOK Scale** {% term integration %} provides the following {% term entities %}.

### Sensors

A scale exposes the following sensors:

- **Weight**: the measured weight.
- **Impedance**: the measured impedance, if supported by the scale.
- **Battery**: the scale battery percentage.
- **Signal strength**: the Bluetooth signal strength (diagnostic, disabled by default).

The battery level and impedance are sent in a separate Bluetooth advertisement from the weight, so they may appear a few seconds later after setup.

## Troubleshooting

If the device is not discovered, try the following:

1. Make sure that the scale is awake and broadcasting by doing a measurement.
2. Make sure your scale is in range of the Bluetooth adapter or proxy.
3. Make sure the [Bluetooth](/integrations/bluetooth/) integration is set up and working.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}