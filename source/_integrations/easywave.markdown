---
title: Easywave
description: Instructions on how to set up the Easywave integration in Home Assistant.
ha_category:
  - Sensor
ha_release: "2026.9"
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

- Receive button presses from wall switches and hand-held remotes
- Read temperature and humidity from Easywave neo wireless sensors
- Trigger automations when a remote button is pressed or released, or when the USB gateway connects or disconnects
- Monitor the gateway connection status

## Supported devices

The following USB transceivers are supported:

- RX11 USB Transceiver: USB VID `155A`, USB PID `1014`, operating at 868.30 MHz

## Prerequisites

Before setting up the integration, make sure the following requirements are met:

- An RX11 USB transceiver is physically connected to your Home Assistant host.
- The device is recognized by the operating system and appears as a serial port (typically `/dev/ttyACM0` or similar).
- If you are running Home Assistant Operating System or a supervised installation, USB devices are passed through automatically. For container-based installations, ensure the serial device is mapped into the container.
- Your Home Assistant **Country** setting is a region where the 868 MHz band is permitted. Check this under {% my general title="**Settings** > **System** > **General**" %}.

{% include integrations/config_flow.md %}

During setup, Home Assistant scans for connected RX11 USB devices. If a single device is found, you will be taken directly to the confirmation step. If multiple devices are found, you will be asked to select which one to use.

Only one Easywave gateway can be configured at a time.

### USB discovery

The RX11 USB transceiver is automatically discovered when plugged in. Home Assistant will display a notification offering to set up the Easywave integration. Accepting the notification will guide you through the setup process.

If you prefer to set up the integration manually, go to {% my integrations title="**Settings** > **Devices & services**" %} and add the **Easywave** integration.

{% configuration_basic %}
USB device path:
  description: "The serial port of the RX11 USB Transceiver. Home Assistant lists the ports it finds during setup."
{% endconfiguration_basic %}

## Adding devices

After the RX11 gateway is set up, you can add transmitters and Easywave neo sensors from the integration entry:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Easywave** integration.
3. Open the three dots {% icon "mdi:dots-vertical" %} menu and choose **Add Easywave transmitter** or **Add Easywave neo sensor**.
4. Follow the on-screen steps to learn the device.

The RX11 transceiver must be connected while you add a device. Only one learning session can run at a time. If another learning session is already in progress, wait until it finishes and try again.

## Supported functionality

### Transmitters

Easywave transmitters are input devices (remotes, wall switches) whose button presses are received by the RX11. When adding a transmitter, choose how many buttons the device has (1–4), then press a button on the physical device when prompted. The integration learns the transmitter's serial number automatically.

For a **1-button** transmitter, Home Assistant also stores which button code was pressed during learning (`Button A`, `Button B`, `Button C`, or `Button D`). The **State** sensor and the matching press trigger then use only that code. A 1-button remote that sent code B during learning therefore exposes **Button B pressed**, not **Button A pressed**.

For transmitters with 2–4 buttons, the available codes are always the first letters in order: A/B, A/B/C, or A/B/C/D.

Each transmitter creates these sensor entities:

- **State** — reports the most recently pressed button among the codes configured for that transmitter, or `Not pressed` when the button is released
- **Battery** — a diagnostic sensor that reports `OK` or `Low`

The **State** and **Battery** values are restored across restarts.

### Easywave neo sensors

Easywave neo wireless sensors transmit temperature and humidity data via RF. When adding a sensor, press the learn button on the physical sensor when prompted. Home Assistant automatically detects which measurements the sensor provides and creates the matching entities:

- **Temperature** — current temperature in °C
- **Humidity** — current relative humidity in %

Measurement values are restored across restarts.

### Gateway

A **Connection status** diagnostic sensor is always created for the RX11 gateway:

- `Connected` — the transceiver is connected and operational
- `Disconnected` — the transceiver is not found or offline

The sensor also exposes the `device_path` attribute, which shows the current system path of the USB device. This path may change after a reconnect (for example, from `/dev/ttyACM0` to `/dev/ttyACM1`).

The gateway device in Home Assistant also shows the hardware and firmware versions reported by the transceiver.

#### Automatic reconnection

The integration monitors the USB connection and automatically detects when the transceiver is disconnected or reconnected. When the device goes offline, transmitter and sensor entities become unavailable and the gateway sensor changes to `Disconnected`. The integration periodically attempts to reconnect.

If you replace the RX11 with another compatible stick and only one Easywave transceiver is connected, Home Assistant reconnects to that stick without requiring a new setup.

{% include integrations/triggers.md %}

## Easywave automation examples

Use these examples as a starting point for remotes and gateway monitoring.

{% include docs/paste_yaml_tip.md %}

### Automation: turn on a light when Button A is pressed

When someone presses Button A on an Easywave wall switch, turn on the living room light.

- **Trigger**: Button A pressed
  - **Target**: Living room wall switch state sensor
- **Action**: Turn on light
  - **Target**: Living room light

{% details "YAML example for turning on a light from Button A" %}

{% example %}
automation: |
  alias: "Turn on living room light from Easywave Button A"
  triggers:
    - trigger: easywave.button_press_a
      target:
        entity_id: sensor.living_room_wall_switch_state
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: notify when the RX11 disconnects

Send a notification if the USB transceiver is unplugged or goes offline.

- **Trigger**: Gateway disconnected
  - **Target**: RX11 connection status sensor
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a gateway disconnect notification" %}

{% example %}
automation: |
  alias: "Notify when Easywave gateway disconnects"
  triggers:
    - trigger: easywave.gateway_disconnected
      target:
        entity_id: sensor.rx11_usb_transceiver_connection_status
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The Easywave RX11 USB transceiver is disconnected."
{% endexample %}

{% enddetails %}

## Data updates

Easywave uses local push. The RX11 delivers RF telegrams as they arrive, and Home Assistant updates transmitter and neo sensor entities immediately. The gateway connection status is checked periodically (about every 30 seconds) so a disconnected stick can be rediscovered without user intervention.

## Known limitations

- Receivers are not yet supported. Classic Easywave receivers and Easywave neo receivers are planned for a future release.
- Transmitters are supported in group mode with impulse switching only. Individual per-button entities and other transmitter operating types are planned for a future release.
- Only one RX11 USB transceiver can be configured at a time.

## Troubleshooting

### The integration does not find my device

- Ensure the RX11 USB transceiver is firmly connected to a USB port.
- Check that the device appears as a serial port on your system (for example, `/dev/ttyACM0`).
- For container-based installations, verify that the USB device is mapped into the container.
- Try a different USB port or cable.

### The sensor shows "Disconnected" after setup

- The transceiver may have been physically disconnected. Reconnect it and wait for the automatic reconnection (up to 30 seconds).
- If you replaced the stick, make sure only one compatible RX11 is connected so Home Assistant can adopt it automatically.
- Check your system logs for USB-related errors.

### Repair issue: frequency not permitted

- This occurs when your Home Assistant country setting does not match a region where 868 MHz operation is allowed (CEPT member states).
- Go to {% my general title="**Settings** > **System** > **General**" %} and verify that the correct country is selected.
- After correcting the country, reload the Easywave integration or restart Home Assistant.
- If the country setting is already correct, disconnect the RX11 and remove the integration.

### Learning times out or says another session is in progress

- Move the transmitter or sensor closer to the RX11 and try again.
- Wait until any other learning session finishes, then start a new one.
- Confirm that the gateway **Connection status** sensor shows `Connected`.

## Removing the integration

{% include integrations/remove_device_service.md %}

The RX11 gateway device cannot be removed individually via the device menu. To remove the integration entirely, use the three-dot menu on the integration entry and select **Delete**.
