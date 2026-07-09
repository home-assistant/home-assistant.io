---
title: Easywave
description: Instructions on how to set up the Easywave integration in Home Assistant.
ha_category:
  - Sensor
ha_release: "2026.4"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@eldateas"
ha_domain: easywave
ha_integration_type: hub
ha_quality_scale: bronze
ha_platforms:
  - sensor
---

The **Easywave** {% term integration %} connects your Easywave home automation devices to Home Assistant via the RX11 USB Transceiver.

Easywave is a wireless protocol operating on the European 868 MHz ISM band. It is widely used for home automation devices such as blinds, shutters, lights, and switches. This integration supports the **RX11 USB Transceiver** and enables you to:

- **Receive input from transmitters** such as wall switches and hand-held remotes (1–4 buttons)
- **Receive sensor data** from Easywave neo wireless sensors (temperature and humidity)
- **Monitor the gateway** with a diagnostic connection status sensor

## Supported devices

The following USB transceivers are supported:

- RX11 USB Transceiver: USB VID `155A`, USB PID `1014`, operating at 868.30 MHz

## Prerequisites

Before setting up the integration, make sure the following requirements are met:

- An RX11 USB transceiver is physically connected to your Home Assistant host.
- The device is recognized by the operating system and appears as a serial port (typically `/dev/ttyACM0` or similar).
- If you are running Home Assistant Operating System or a supervised installation, USB devices are passed through automatically. For container-based installations, ensure the serial device is mapped into the container.

{% include integrations/config_flow.md %}

During setup, Home Assistant scans for connected RX11 USB devices. If a single device is found, you will be taken directly to the confirmation step. If multiple devices are found, you will be asked to select which one to use.

### USB discovery

The RX11 USB transceiver is automatically discovered when plugged in. Home Assistant will display a notification offering to set up the Easywave integration. Accepting the notification will guide you through the setup process.

If you prefer to set up the integration manually, go to {% my integrations title="**Settings** > **Devices & services**" %} and add the **Easywave** integration.

## Adding devices

After the RX11 gateway is set up, you can add transmitters and Easywave neo sensors from the integration entry:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Easywave** integration.
3. Open the three dots {% icon "mdi:dots-vertical" %} menu and choose **Add Easywave transmitter** or **Add Easywave neo sensor**.
4. Follow the on-screen steps to learn the device.

The RX11 transceiver must be connected while you add a device.

## Automations

### Using transmitters as triggers

Each transmitter exposes a **State** sensor that reports which button was pressed most recently. The transmitter device also appears as **device triggers** in the automations editor, so you can start an automation when a button is pressed or released without writing YAML.

Available transmitter device triggers:

- **Button pressed (Button A)**, **Button B**, **Button C**, or **Button D**
- **Button released** when the button is released
- **Battery OK** and **Battery low**

You can also use the **State** sensor directly as a state trigger in automations.

### Gateway triggers

The RX11 gateway device exposes **Gateway connected** and **Gateway disconnected** device triggers, which are useful for notifications when the USB transceiver is unplugged or reconnected.

## Transmitters

Easywave transmitters are input devices (remotes, wall switches) whose button presses are received and forwarded by the RX11. When adding a transmitter, choose how many buttons the device has (1–4), then press a button on the physical device when prompted. The integration learns the transmitter's serial number automatically.

Each transmitter creates two sensor entities:

- **State** — an enum sensor that reports the most recently pressed button (`Button A`, `Button B`, `Button C`, `Button D`, or `Not pressed` when the button is released)
- **Battery** — a diagnostic sensor that reports `OK` or `Low`

The **State** sensor value is restored across restarts, so the last known button state remains visible after a reboot.

## Easywave neo sensors

Easywave neo wireless sensors transmit temperature and humidity data via RF. When adding a sensor, press the learn button on the physical sensor when prompted. Home Assistant automatically detects which measurements the sensor provides and creates the matching entities:

- **Temperature** — current temperature in °C
- **Humidity** — current relative humidity in %

Measurement values are restored across restarts.

## Gateway sensor

A **Connection status** diagnostic sensor is always created for the RX11 gateway.

- `Connected` — the transceiver is connected and operational
- `Disconnected` — the transceiver is not found or offline

The sensor also exposes the `device_path` attribute, which shows the current system path of the USB device. This path may change after a reconnect (for example, from `/dev/ttyACM0` to `/dev/ttyACM1`).

### Automatic reconnection

The integration monitors the USB connection and automatically detects when the transceiver is disconnected or reconnected. When the device goes offline, transmitter and sensor entities become unavailable and the gateway sensor changes to `Disconnected`. The integration will periodically attempt to reconnect and restore normal operation without user intervention.

## Regulatory compliance

Easywave operates on the **868 MHz ISM band**, which is permitted in the following regions:

- All EU/EEA member states
- United Kingdom
- Switzerland
- Norway, Iceland, and Liechtenstein
- Other CEPT member states

If your configured Home Assistant country is outside the permitted region for the 868 MHz band, the integration will not start and a **repair issue** will be created in your Home Assistant dashboard explaining the restriction.

To verify or change your country setting, go to {% my general title="**Settings** > **System** > **General**" %} and check the **Country** field.

## Known limitations

- Receivers are not yet supported. Classic Easywave receivers and Easywave neo receivers are planned for a future release.
- Transmitters are supported in group mode with impulse switching only. Individual per-button entities and type-2/type-3 transmitter modes are planned for a future release.
- Only one RX11 USB transceiver can be configured at a time.

## Troubleshooting

### The integration does not find my device

- Ensure the RX11 USB transceiver is firmly connected to a USB port.
- Check that the device appears as a serial port on your system (for example, `/dev/ttyACM0`).
- For container-based installations, verify that the USB device is mapped into the container.
- Try a different USB port or cable.

### The sensor shows "Disconnected" after setup

- The transceiver may have been physically disconnected. Reconnect it and wait for the automatic reconnection (up to 30 seconds).
- Check your system logs for USB-related errors.

### Repair issue: frequency not permitted

- This occurs when your Home Assistant country setting does not match a region where 868 MHz operation is allowed.
- Go to {% my general title="**Settings** > **System** > **General**" %} and verify that the correct country is selected.

## Removing the integration

{% include integrations/remove_device_service.md %}

The RX11 gateway device cannot be removed individually via the device menu. To remove the integration entirely, use the three-dot menu on the integration entry and select **Delete**.
