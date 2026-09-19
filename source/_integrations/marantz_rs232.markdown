---
title: Marantz RS-232
description: Instructions on how to integrate a Marantz SR7002 receiver via its RS-232 serial port into Home Assistant.
ha_category:
  - Media player
ha_iot_class: Local Push
ha_release: 2026.10
ha_codeowners:
  - '@balloob'
ha_config_flow: true
ha_domain: marantz_rs232
ha_platforms:
  - media_player
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Marantz RS-232** {% term integration %} lets you control a Marantz SR7002 receiver through its RS-232 serial port. It provides local control and receives state changes from the receiver over the serial connection.

## Supported devices

This integration supports the Marantz SR7002, using its 2007-generation serial protocol. Other Marantz models and protocol generations are not supported.

## Prerequisites

- A Marantz SR7002 receiver with its RS-232 port connected to the system running Home Assistant.
- A compatible RS-232 cable and serial port, USB-to-RS-232 adapter, or remote serial proxy.
- For a remote serial proxy, configure the receiver connection for 9600 baud, 8 data bits, no parity, and 1 stop bit.
- Turn the receiver on for the initial setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Port:
    description: "The serial port connected to your SR7002. Select a local adapter or a configured remote serial proxy."
{% endconfiguration_basic %}

There are no additional configuration options after setup.

## Supported functionality

Home Assistant adds a media player {% term entity %} for the main zone and another for the multi-room output when it responds during setup.

Both entities support:

- Turning the output on and off.
- Setting the volume and stepping it up or down.
- Muting and unmuting.
- Selecting an input source supported by the SR7002.

## Use cases

- Include the receiver in a movie-night scene that selects the TV input and sets the listening volume.
- Control the multi-room output independently from the main listening area.
- Put an output in standby at bedtime to avoid leaving it on overnight.

## Marantz RS-232 automation examples

### Automation: Put an output in standby at a set time

Use this blueprint to turn off the main zone or multi-room output at a time you choose each day. Create a separate automation for each output if you want different schedules.

{% my blueprint_import badge blueprint_url="https://www.home-assistant.io/blueprints/integrations/marantz_rs232_scheduled_standby.yaml" %}

## Data updates

The integration enables automatic status feedback when it connects. Changes made with the receiver's remote control or front panel are pushed to Home Assistant over the serial connection, without regular {% term polling %}.

## Known limitations

- Only the SR7002 is supported.
- Tuner presets, surround-mode selection, and other advanced receiver settings are not exposed.
- At the receiver's minimum volume setting, Home Assistant may not show a numeric volume level.

## Troubleshooting

### Can't set up the device

#### Symptom: "Failed to connect"

The setup form shows "Failed to connect".

#### Description

Home Assistant could not communicate with the receiver over the selected serial port.

#### Resolution

1. Confirm the receiver is an SR7002 and is powered on.
2. Check that the correct serial port is selected and that no other software is using it.
3. Check the RS-232 cable and adapter connections.
4. For a remote serial proxy, check its network connection and serial settings.

### The receiver becomes unavailable

If the serial connection is lost, the entities become unavailable and Home Assistant attempts to reconnect. Check the cable, adapter, and any remote proxy connection.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
