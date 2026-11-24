---
title: ESI R2D7
description: Instructions on how to control blinds on an ESI R2D7 controller through its RS-232 serial port in Home Assistant.
ha_release: 2027.1
ha_domain: esi_r2d7
ha_categories:
  - blinds_curtains
ha_iot_class: Assumed State
ha_codeowners:
  - '@davidfi01'
ha_config_flow: true
ha_integration_type: hub
ha_platforms:
  - cover
ha_quality_scale: bronze
related:
  - docs: /integrations/serial/#setting-up-a-serial-connection-in-home-assistant
    title: Setting up a serial connection in Home Assistant
  - docs: /integrations/cover/
    title: Cover
---

The **ESI R2D7** {% term integration %} lets you open, close and stop motorized blinds and shades on an ESI R2D7 controller through its RS-232 serial port. ESI is now part of Hunter Douglas. Draper also uses the R2D7 for its shades.

Home Assistant sends commands straight to the controller, so control is local. The R2D7 never reports back. Home Assistant shows the last command it sent, not the measured position of a blind.

## Supported devices

- ESI R2D7 controllers that use the R2D7 v4.1 RS-232 protocol.

## Prerequisites

{% include integrations/serial_connected.md %}

- An ESI R2D7 controller with its RS-232 port connected to the serial port. The link runs at 9600 baud, 8 data bits, no parity and 1 stop bit.
- The R2D7 system number and the channels that have a blind. You set these on the controller.

You can also connect the R2D7 to an RS-232 port of a Home Assistant Connect AUX-2. Add the AUX-2 to Home Assistant through the ESPHome integration, with its standard firmware. Its RS-232 port then shows in the list of serial ports during setup.

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

## ESI R2D7 automation examples

The blinds are regular cover entities, so you can use them in any automation that works with covers.
Here are some ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Closing the blinds at sunset

This automation closes 2 blinds every evening at sunset.

- **Trigger**: Sun: sunset
- **Action**: Close cover
  - **Targets**: `cover.esi_r2d7_system_1_channel_01` and `cover.esi_r2d7_system_1_channel_02`

{% details "YAML example for closing the blinds at sunset" %}

{% example %}
automation: |
  alias: "Close the blinds at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: cover.close_cover
      target:
        entity_id:
          - cover.esi_r2d7_system_1_channel_01
          - cover.esi_r2d7_system_1_channel_02
{% endexample %}

{% enddetails %}

### Automation: Stopping all blinds from a button

Because Stop is system-wide, one Stop action on any blind stops every moving blind on that R2D7 system. This automation stops all blinds when you press a button.

- **Trigger**: Entity: `input_button.stop_blinds` changes state
- **Action**: Stop cover
  - **Target**: `cover.esi_r2d7_system_1_channel_01`

{% details "YAML example for stopping all blinds" %}

{% example %}
automation: |
  alias: "Stop all blinds"
  triggers:
    - trigger: state
      entity_id: input_button.stop_blinds
  actions:
    - action: cover.stop_cover
      target:
        entity_id: cover.esi_r2d7_system_1_channel_01
{% endexample %}

{% enddetails %}

One blind as the target is enough. Stops sent to several blinds at the same moment go out as a single Stop.

## Data updates

The R2D7 never sends data, so the integration does not {% term polling poll %}. The state of a blind changes only when Home Assistant sends a command.

The integration watches the serial link. When the link drops, the blinds become unavailable, and the integration reconnects.

## Known limitations

- The R2D7 reports nothing back. If a wall switch, a remote or another controller moves a blind, Home Assistant does not know.
- The R2D7 has a 256-byte command buffer and discards all commands when it overflows. Do not move more than about 20 blinds in one action.
- After a restart of Home Assistant, the position of each blind is unknown until you send a command.
- A blind that travels for longer than 2 minutes can still show open or closed after a Stop that caught it halfway.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
