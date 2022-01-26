---
title: Möhlenhoff Alpha 2
description: Instructions on how to integrate a Möhlenhoff Alpha 2 temperature control system into Home Assistant.
ha_category: Climate
ha_release: 2022.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@j-a-n'
ha_domain: moehlenhoff_alpha2
ha_platforms:
  - climate
---

The `moehlenhoff_alpha2` platform allows you to control a [Möhlenhoff Alpha 2](https://www.moehlenhoff.de/en/products/room-by-room-control/oem-alpha-2-system) temperature control system.

## Setup

Please make sure the base is turned on and connected to your local network.
{% include integrations/config_flow.md %}

Fill in the hostname or the IP address of your base.
If using a hostname, make sure the name resolution works as expected.

After pressing `Submit` the integration will connect to your base and setup.
No further configuration is required.

It is also possible to repeat these steps to setup another base.

## Climate

The `moehlenhoff_alpha2` climate platform provides current and target temperature
information, HVAC and preset mode.

A climate entity will be created for each area.
The name of the entity is taken from the name of the heat area defined in the Alpha 2 base.

The state is polled from the base every 60 seconds.

Please note that after changing the temperature in Home Assistant,
it may take up to 10 minutes for your room control units to display these changes.

### Integration services

This integration supports the following services (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#service-climateset_temperature)
- [`set_hvac_mode`](/integrations/climate/#service-climateset_hvac_mode)
  - `heat` for heating mode
  - `cool` for cooling mode
- [`set_preset_mode`](/integrations/climate/#service-climateset_preset_mode)
  - `auto` enable schedule based operation
  - `day` enable day mode
  - `night` enable night mode
