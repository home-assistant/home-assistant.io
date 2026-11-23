---
title: ESI R2D7
description: Instructions on how to control blinds on an ESI R2D7 controller through its RS-232 serial port in Home Assistant.
ha_category:
  - Cover
ha_release: 2027.1
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - '@davidfi01'
ha_domain: esi_r2d7
ha_platforms:
  - cover
ha_integration_type: hub
ha_quality_scale: bronze
---

The **ESI R2D7** {% term integration %} lets you open, close and stop motorized blinds and shades on an ESI R2D7 controller through its RS-232 serial port. ESI is now part of Hunter Douglas. Draper also uses the R2D7 for its shades.

Home Assistant sends commands straight to the controller, so control is local. The R2D7 never reports back. Home Assistant shows the last command it sent, not the measured position of a blind.

## Prerequisites

{% include integrations/serial_connected.md %}

- An ESI R2D7 controller with its RS-232 port connected to the serial port. The link runs at 9600 baud, 8 data bits, no parity and 1 stop bit.
- The R2D7 system number and the channels that have a blind. You set these on the controller.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Port:
  description: "The serial port the R2D7 is connected to."
System:
  description: "The R2D7 system number, 1 to 7."
First channel:
  description: "The lowest channel that has a blind, 1 to 60."
Last channel:
  description: "The highest channel that has a blind, 1 to 60."
{% endconfiguration_basic %}

Setup only checks that the serial port opens. The R2D7 never answers, so Home Assistant cannot confirm that a controller is attached. After setup, test one blind.

## Supported functionality

The integration adds one cover {% term entity %} for each channel from the first channel to the last channel. Each blind supports:

- Open
- Close
- Stop

### Stop is system-wide

The R2D7 has no per-blind stop. **Stop on any blind stops every moving blind on the same R2D7 system.** After a Stop, Home Assistant shows the position as unknown for the blind you stopped and for every blind that was sent Open or Close in the last 2 minutes.

## Known limitations

- The R2D7 reports nothing back. If a wall switch, a remote or another controller moves a blind, Home Assistant does not know.
- The R2D7 has a 256-byte command buffer and discards all commands when it overflows. Do not move more than about 20 blinds in one action.
- After a restart of Home Assistant, the position of each blind is unknown until you send a command.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
