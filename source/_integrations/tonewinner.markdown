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

The **Tonewinner** {% term integration %} allows you to control [Tonewinner](https://en.tonewinner.com/) AV processors, receivers, and amps from Home Assistant over an RS-232 serial connection via a USB-to-serial adapter or with an [ESPHome]({% link _integrations/esphome.markdown %})-based serial proxy.

## Supported devices

The integration is known to work with the AT-500, but should work with other Tonewinner devices as well.

## Prerequisites

- A Tonewinner processor or receiver with an RS-232 serial port.
- A serial connection between the receiver and the machine running Home Assistant. If your machine does not have a serial port, a USB-to-serial adapter can be used.
- The receiver needs to have power, and it can be in standby mode.
- The receiver communicates at 9600 baud. If you use an ESPHome-based serial proxy, configure its UART for 9600 baud.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Serial port:
  description: >-
    The serial port the receiver is connected to, for example, `/dev/ttyUSB0`.
    The list shows the serial ports detected by Home Assistant, including
    USB-to-serial adapters and ESPHome-based serial proxies. If your port is
    not in the list, you can enter its path manually.
{% endconfiguration_basic %}

## Change the serial port

To connect the receiver to a different serial port later, select **Reconfigure**
on the integration page and choose the new port.

## Supported functionality

### Media player controls

You can use Home Assistant to:

- Turn the receiver on and off.
- Control volume (set, up, and down) and mute.
- Select the input source.
- Select the sound mode (for example, Direct, Pure, Stereo, or All Stereo).

## Known limitations

- At least for the AT-500, there is a period of a few seconds during startup when the device may not accept commands, and may report incorrect information. Status should be correct once the boot sequence completes.
- The device should be powered on and connected to the serial port before setting up the integration in Home Assistant.
- If the device is in standby mode, Home Assistant cannot detect the device's model name. This does not affect the functionality of the integration, but the model name will not appear in the device details.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
