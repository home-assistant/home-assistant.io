---
title: Marantz RS-232
description: Instructions on how to integrate a Marantz receiver via its RS-232 serial port into Home Assistant.
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

The **Marantz RS-232** {% term integration %} lets you control a Marantz receiver through its RS-232 serial port. It provides local control and receives state changes from the receiver over the serial connection.

_This integration currently only supports the 2007 Marantz protocol._

## Tested models

The integration has been tested with the following models:

- Marantz SR7002

Other receivers using the 2007 Marantz protocol may also work but have not been tested.

## Prerequisites

- A Marantz receiver with an RS-232 port.
- A direct serial connection between the receiver and the system running Home Assistant, or an [ESPHome Serial Proxy](/integrations/serial/#serial-proxy) connected to the receiver.
- Turn the receiver on for the initial setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Port:
    description: "The serial port connected to your receiver. Select a local serial port or an ESPHome Serial Proxy."
{% endconfiguration_basic %}

There are no additional configuration options after setup.

## Supported functionality

Home Assistant adds a media player {% term entity %} for the main zone and another for the multi-room output when it responds during setup.

Both entities support:

- Turning the output on and off.
- Setting the volume and stepping it up or down.
- Muting and unmuting.
- Selecting an input source.

## Use cases

- Include the receiver in a movie-night scene that selects the TV input and sets the listening volume.
- Control the multi-room output independently from the main listening area.
- Put an output in standby at bedtime to avoid leaving it on overnight.

## Data updates

The integration enables automatic status feedback when it connects. Changes made with the receiver's remote control or front panel are pushed to Home Assistant over the serial connection, without regular {% term polling %}.

## Known limitations

- The input list includes all sources defined by the 2007 protocol. Some inputs may not be available on your receiver, and their names may differ.
- Tuner presets, surround-mode selection, and other advanced receiver settings are not exposed.
- At the receiver's minimum volume setting, Home Assistant may not show a numeric volume level.

## Troubleshooting

### Can't set up the device

#### Symptom: "Failed to connect"

The setup form shows "Failed to connect".

#### Description

Home Assistant could not communicate with the receiver over the selected serial port.

#### Resolution

1. Confirm the receiver uses the 2007 Marantz protocol and is powered on.
2. Check that the correct serial port is selected and that no other software is using it.
3. Check the RS-232 cable and adapter connections.
4. If you use an ESPHome Serial Proxy, check its connection to Home Assistant and the receiver.

### The receiver becomes unavailable

If the serial connection is lost, the entities become unavailable and Home Assistant attempts to reconnect. Check the cable, adapter, and ESPHome Serial Proxy connection, if used.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
