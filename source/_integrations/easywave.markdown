---
title: Easywave
description: Instructions on how to set up the Easywave integration in Home Assistant.
ha_category:
  - Sensor
ha_release: "2026.4"
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - "@eldateas"
ha_domain: easywave
ha_integration_type: device
ha_quality_scale: bronze
ha_platforms:
  - sensor
---

The **Easywave** {% term integration %} allows you to use Easywave 868 MHz USB transceivers with Home Assistant.

Easywave is a wireless protocol operating on the European 868 MHz ISM band, commonly used for home automation purposes such as controlling shutters, lights, dimmers, and switches. This integration supports the **RX11 USB Transceiver** and provides real-time monitoring of the gateway connection status, including automatic detection of USB disconnects and reconnects.

Support for directly pairing and controlling Easywave devices (such as shutters, switches, and dimmers) through Home Assistant will be added in a future release.

## Supported devices

The following USB transceivers are supported:

- RX11 USB Transceiver: USB VID `155A`, USB PID `1014`, operating at 868.30 MHz

## Prerequisites

Before setting up the integration, make sure the following requirements are met:

- An RX11 USB transceiver is physically connected to your Home Assistant host.
- The device is recognized by the operating system and appears as a serial port (typically `/dev/ttyACM0` or similar).
- If you are running Home Assistant OS or a supervised installation, USB devices are passed through automatically. For container-based installations, ensure the serial device is mapped into the container.

{% include integrations/config_flow.md %}

The integration automatically scans for connected RX11 USB devices during setup. If a single device is found, you will be taken directly to the confirmation step. If multiple devices are found, you will be asked to select which one to use.

### USB discovery

The RX11 USB transceiver is automatically discovered when plugged in. Home Assistant will display a notification offering to set up the Easywave integration. Accepting the notification will guide you through the setup process.

If you prefer to set up the integration manually, go to {% my integrations title="**Settings** > **Devices & services**" %} and add the **Easywave** integration.

## Sensors

The integration provides a **Connection Status** diagnostic sensor that reports the current connection state of the RX11 USB transceiver.

### Connection status

The connection status sensor is a diagnostic entity and supports the following states:

| State           | Description                                  |
| --------------- | -------------------------------------------- |
| `Connected`     | The transceiver is connected and operational |
| `Not Connected` | The transceiver is not found or offline      |

The sensor also exposes the following diagnostic attributes:

| Attribute           | Description                                    |
| ------------------- | ---------------------------------------------- |
| `device_path`       | The system path of the USB device              |
| `connected`         | Whether the transceiver is currently connected |
| `usb_serial_number` | The USB serial number of the device            |
| `hardware_version`  | The hardware version reported by the device    |
| `firmware_version`  | The firmware version reported by the device    |

### Automatic reconnection

The integration monitors the USB connection and automatically detects when the transceiver is disconnected or reconnected. When the device goes offline, the sensor state changes to `Not Connected`. The integration will periodically attempt to reconnect and restore normal operation without user intervention.

## Regulatory compliance

Easywave operates on the **868 MHz ISM band**, which is permitted in the following regions:

- All EU/EEA member states
- United Kingdom
- Switzerland
- Other CEPT member states

If your configured Home Assistant country is outside the permitted region for the 868 MHz band, the integration will not start and a **repair issue** will be created in your Home Assistant dashboard explaining the restriction.

To verify or change your country setting, go to {% my general title="**Settings** > **System** > **General**" %} and check the **Country** field.

## Known limitations

- The integration currently supports monitoring the gateway connection status. Direct pairing and control of Easywave devices, such as shutters, switches, and dimmers, will be added in a future update.
- Only one RX11 USB transceiver can be configured at a time.

## Troubleshooting

### The integration does not find my device

- Ensure the RX11 USB transceiver is firmly connected to a USB port.
- Check that the device appears as a serial port on your system (for example, `/dev/ttyACM0`).
- For container-based installations, verify that the USB device is mapped into the container.
- Try a different USB port or cable.

### The sensor shows "Not Connected" after setup

- The transceiver may have been physically disconnected. Reconnect it and wait for the automatic reconnection (up to 30 seconds).
- Check your system logs for USB-related errors.

### Repair issue: frequency not permitted

- This occurs when your Home Assistant country setting does not match a region where 868 MHz operation is allowed.
- Go to {% my general title="**Settings** > **System** > **General**" %} and verify that the correct country is selected.

## Removing the integration

{% include integrations/remove_device_service.md %}

The RX11 gateway device cannot be removed individually via the device menu. To remove the integration entirely, use the three-dot menu on the integration entry and select **Delete**.