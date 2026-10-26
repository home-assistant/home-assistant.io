---
description: Instructions on how to integrate a Marantz receiver via its RS-232 serial port into Home Assistant.
ha_release: 2026.11
ha_domain: marantz_rs232
---

The **Marantz RS-232** {% term integration %} lets you control a [Marantz](https://www.marantz.com/) receiver through its RS-232 serial port. It provides local control and receives state changes from the receiver over the serial connection.

With it, you can include the receiver in a movie-night scene that selects the TV input and sets the listening volume, control an additional zone independently from the main listening area, or put a zone in standby at bedtime so it isn't left on overnight.

## Supported devices

The integration supports Marantz receivers that use the 2007 Marantz RS-232 protocol.

### Tested models

The integration has been tested with the following models:

- Marantz SR7002

Other receivers using the 2007 Marantz protocol may also work but have not been tested.

## Prerequisites

{% include integrations/serial_connected.md %}

- A Marantz receiver with an RS-232 port that uses the 2007 Marantz protocol.
- Turn the receiver on for the initial setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Port:
    description: "The serial port connected to your receiver. Select a local serial port or an ESPHome Serial Proxy."
{% endconfiguration_basic %}

There are no additional configuration options after setup.

## Supported functionality

Home Assistant adds a media player {% term entity %} for each supported zone, allowing you to control the zones independently. The main zone is always added. If the receiver reports an additional **Multi-room A** zone when Home Assistant connects, Home Assistant adds a separate media player named **Multi-room** for that zone.

Each zone's media player supports:

- Turning the zone on and off.
- Setting the volume and stepping it up or down. For the **Multi-room** media player, the volume controls adjust the receiver's multi-room output volume, not the main zone volume.
- Muting and unmuting.
- Selecting an input source.

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
