---
title: Möhlenhoff Alpha 2
description: Instructions on how to integrate a Möhlenhoff Alpha 2 temperature control system into Home Assistant.
ha_category:
  - Climate
ha_release: 2022.3
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@j-a-n'
ha_domain: moehlenhoff_alpha2
ha_platforms:
  - binary_sensor
  - button
  - climate
  - sensor
ha_integration_type: integration
---

The Möhlenhoff Alpha 2 integration allows you to control a [Möhlenhoff Alpha 2](https://dev.moehlenhoff.de/en/products/room-by-room-control/oem-alpha-2-system)

temperature control system.

## Prerequisites

Please make sure the base station is turned on and connected to your local network.


{% include integrations/config_flow.md %}

## Climate

The  climate platform provides current and target temperature information,
HVAC and preset mode.

A climate entity will be created for each area. The name of the entity is
taken from the name of the heat area defined in the Alpha 2 base station.

The state is polled from the base every 60 seconds.

Please note that after changing the temperature in Home Assistant,
it may take up to 10 minutes for your room control units to display these
changes.

### Actions

This integration supports the following actions (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#action-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#action-climateset_hvac_mode)
  - `heat` for heating mode
  - `cool` for cooling mode
- [`set_preset_mode`](/integrations/climate/#action-climateset_preset_mode)
  - `auto` enable schedule based operation
  - `day` enable day mode
  - `night` enable night mode
