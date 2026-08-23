---
title: Tonewinner
description: Instructions on how to integrate Tonewinner processors and receivers into Home Assistant.
ha_category:
  - Media player
ha_codeowners:
  - "@emma-sg"
ha_config_flow: true
ha_domain: tonewinner
ha_integration_type: device
ha_iot_class: Local Push
ha_platforms:
  - media_player
ha_release: "2026.9"
ha_quality_scale: silver
---

The **Tonewinner** {% term integration %} allows you to control Tonewinner AV processors and receivers from Home Assistant over an RS-232 serial connection, via a USB-to-serial adapter, or with a serial proxy with an ESPHome device.

## Supported devices

The integration is known to work with the AT-500, but should work with other Tonewinner devices as well.

## Prerequisites

- A Tonewinner processor or receiver with an RS-232 serial port.
- A serial connection between the receiver and the machine running Home Assistant. If your machine does not have a serial port, a USB-to-serial adapter can be used.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Serial port:
  description: >-
    The serial port the receiver is connected to, for example, `/dev/ttyUSB0`.
    The list only shows serial ports connected via USB that were detected by Home Assistant.
Baud rate:
  description: >-
    The baud rate for the serial connection. This should be 9600 for all Tonewinner devices.
{% endconfiguration_basic %}

## Configuration options

Configuration options can be changed from the integration page.

{% configuration_basic %}
Serial port:
  description: >-
    The serial port the receiver is connected to. Changing this reconnects the
    integration to the receiver on a different port.
Baud rate:
  description: The baud rate for the serial connection.
Enabled:
  description: >-
    For each input (HDMI 1-6, Optical 1-2, Coaxial 1-2, Analog 1-3, Bluetooth,
    USB, PC, and HDMI eARC): whether the input is shown in the source list of
    the media player entity. Not all devices have all of these inputs, so you can disable inputs that aren't available on your device, as well as ones you don't use.
Custom name:
  description: >-
    For each input: the name shown in the source list instead of the default
    name.
{% endconfiguration_basic %}

## Supported functionality

### Media player controls

You can use Home Assistant to:

- Turn the receiver on and off
- Control volume (set, up, and down) and mute
- Select the input source
- Select the sound mode (for example, Direct, Pure, Stereo, or All Stereo)

## Known limitations

- At least for the AT-500, there is a period of a few seconds during startup when the device may not accept commands, and may report incorrect information. Status should be correct once the boot sequence completes.
- The device should be powered on and connected to the serial port before setting up the integration in Home Assistant.
