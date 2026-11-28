---
description: Instructions on how to integrate a Möhlenhoff Alpha 2 temperature control system into Home Assistant.
ha_release: 2022.3
ha_domain: moehlenhoff_alpha2
---

The **Möhlenhoff Alpha 2** {% term integration %} allows you to control a [Möhlenhoff Alpha 2](https://dev.moehlenhoff.de/en/products/room-by-room-control/oem-alpha-2-system)

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

After changing the temperature in Home Assistant,
it may take up to 10 minutes for your room control units to display these
changes.

### Actions

This integration supports the following actions (see [Climate](/integrations/climate/)).

- [`set_temperature`](/integrations/climate/#action-set-temperature)
- [`set_hvac_mode`](/integrations/climate/#action-set-hvac-mode)
  - `heat` for heating mode
  - `cool` for cooling mode
- [`set_preset_mode`](/integrations/climate/#action-set-preset-mode)
  - `auto` enable schedule based operation
  - `day` enable day mode
  - `night` enable night mode

## Room devices

A Home Assistant device is created for each heat area. The climate entity and the entities associated with the room are grouped under this device.

## Numbers

The number platform exposes the settings provided by the Alpha 2 base for each heat area. Available entities can include:

- Temperature offset
- Heating temperature for day and night
- Cooling temperature for day and night
- Minimum and maximum target temperature

Temperature values can be adjusted in steps of 0.1 °C. The temperature offset ranges from -5 °C to 5 °C; the other settings range from 0 °C to 50 °C. An entity is created only when the corresponding setting is available from the base.

## Sensors

The sensor platform reports the valve opening as a percentage when this value is available from the base.

A battery binary sensor is created for an I/O device associated with a heat area. It turns on when the battery is weak or empty.