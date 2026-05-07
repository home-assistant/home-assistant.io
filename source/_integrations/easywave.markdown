---
title: Easywave
description: Instructions on how to set up the Easywave integration in Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Cover
  - Event
  - Sensor
  - Switch
ha_release: "2026.4"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@eldateas"
ha_domain: easywave
ha_integration_type: device
ha_quality_scale: bronze
ha_platforms:
  - binary_sensor
  - button
  - cover
  - event
  - sensor
  - switch
---

The **Easywave** {% term integration %} connects your Easywave home automation devices to Home Assistant via the RX11 USB Transceiver.

Easywave is a one-way wireless protocol operating on the European 868 MHz ISM band. It is widely used for home automation devices such as blinds, shutters, lights, and switches. This integration supports the **RX11 USB Transceiver** and enables you to:

- **Control receivers**: covers (blinds, shutters), on/off switches, and heating/cooling actuators
- **Receive input from transmitters**: wall switches and hand-held remotes (1–4 buttons, cover remotes, motor remotes)
- **Receive sensor data**: temperature and humidity from Easywave neo wireless sensors

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

## Adding devices

After setup, open the integration entry and use **Add device** to pair receivers, transmitters, and sensors with the gateway.

## Automations

### Using transmitters as triggers

Type-1 transmitters configured in **Individual** grouping mode expose each button as an {% term event %} entity and automatically appear as **device triggers** in the automations editor. You can select the physical button as a trigger directly in the UI without writing YAML.

Transmitters configured in **Group** mode, and Type-2/3 transmitters, expose sensor entities whose state changes can be used as state triggers in automations.

### Controlling receivers from automations

All receiver entities use standard Home Assistant platforms and can be targeted by the corresponding {% term action %}:

| Receiver mode | Platform | Actions available |
| ------------- | -------- | ----------------- |
| Impulse / Universal | Button | `button.press` |
| On/Off switch / Heating actuator | Switch | `switch.turn_on`, `switch.turn_off`, `switch.toggle` |
| Up/Down cover / Up/Stop/Down motor | Cover | `cover.open_cover`, `cover.close_cover`, `cover.stop_cover` |

## Receivers

Easywave receivers are output devices controlled by the RX11 gateway. Click **Add receiver** and select the mode matching the physical device. The integration will occupy a free gateway slot and send a learning telegram; briefly activate the receiver's learn mode as described in its manual.

The following receiver modes are available:

| Mode | Platform | Description |
| ---- | -------- | ----------- |
| Impulse | Button | Sends a momentary button press (A or B) |
| Universal (4-button) | Button | Sends one of four button commands (A, B, C, D) |
| On/Off switch | Switch | Two-state switch with separate On (A) and Off (B) commands |
| Heating/Cooling actuator | Switch | Like On/Off switch, but keeps the actuator alive by resending the state every 4 hours |
| Up/Down cover | Cover | Cover with Open (A) and Close (B) commands |
| Up/Stop/Down motor | Cover | Cover with Open (A), Stop (C) and Close (B) commands |

Switch and cover states are **persisted across restarts**. On startup the last known state is restored without sending a command. Heating actuators additionally resend their last state on startup if the gateway was offline for more than 4 hours, and track the last-sent time as an entity attribute (`last_sent`).

## Transmitters

Easywave transmitters are input devices (remotes, wall switches) whose button presses are received and forwarded by the RX11. Click **Add transmitter**, then press the desired button on the physical device; the integration learns the transmitter's serial number and button count automatically.

Transmitters are categorised by their **operating type**, which determines how many independent button channels the device supports and which entities are created.

### Type 1 – Per-button transmitters

Type-1 transmitters have 1–4 independent buttons, each addressed individually. The setup flow asks for two additional options:

#### Grouping mode

| Mode | Entities created | Description |
| ---- | --------------- | ----------- |
| **Individual** (default) | One {% term event %} entity per button | Each button gets its own event entity that fires `pressed` and `released` events |
| **Group** | One sensor entity (last pressed button) | A single sensor reports which button was most recently pressed; the switch mode (see below) determines whether the sensor resets to `released` when the button is released |

For **individual** mode, each button event entity also appears as a **device trigger** in the automations editor, so automations can be created directly by selecting the device without writing YAML.

#### Switch mode (group grouping only)

The switch mode is only asked when **Group** grouping is selected. It controls whether the sensor resets to `released` after a button is released:

| Mode | Behavior |
| ---- | --------- |
| **Impulse** | State resets to `released` when the button is released; sensor states: `a` / `b` / `c` / `d` / `released` |
| **Permanent** | State stays on the most recently pressed button; sensor states: `a` / `b` / `c` / `d` |

Additionally, a **Battery** sensor entity is always created for every type-1 transmitter.

#### Summary of type-1 entities

| Grouping | Switch mode | Entities |
| -------- | ----------- | -------- |
| Individual | — | N × event (button A … D, events: `pressed` / `released`) + battery sensor |
| Group | Impulse | 1 × last-button sensor (states: `a` / `b` / `c` / `d` / `released`) + battery sensor |
| Group | Permanent | 1 × last-button sensor (states: `a` / `b` / `c` / `d`) + battery sensor |

### Type 2 – Channel transmitters

Type-2 transmitters treat pairs of buttons as a single channel (on/off or open/closed). The setup flow asks for the **usage type** and, for larger remotes, the **channel count**.

#### Usage type

| Usage | Entities created | Description |
| ----- | --------------- | ----------- |
| **Switch** | Binary sensor per channel | Button A → channel `on`, Button B → channel `off`. A 4-button remote creates two independent channels (A/B and C/D). |
| **Cover** | Sensor per channel | Tracks open/closed state from paired button presses. Reported as an enum sensor with values `opened` / `closed`. |

#### Channel count and entities

| Usage | Button count | Entities |
| ----- | ------------ | -------- |
| Switch | 1–2 | 1 × binary sensor (on/off) + battery sensor |
| Switch | 3–4 | 2 × binary sensor (A/B channel, C/D channel) + battery sensor |
| Cover | 1–2 | 1 × channel state sensor (open/closed) + battery sensor |
| Cover | 3–4 | 2 × channel state sensor (A/B channel, C/D channel) + battery sensor |

### Type 3 – Motor transmitters

Type-3 transmitters are 3-button motor remotes with dedicated **Open**, **Stop** and **Close** buttons (for example, for motorized shutters or awnings). No additional configuration is required during setup.

The integration creates a **Motor state** enum sensor that tracks the last action sent by the remote:

| State | Trigger button | Description |
| ----- | -------------- | ----------- |
| `opened` | A | The motor was commanded to open |
| `closed` | B | The motor was commanded to close |
| `stopped` | C or D | The motor was commanded to stop |

The motor state is persisted across restarts so the last known action is always visible even after a reboot.

A **Battery** sensor entity is also created for every type-3 transmitter.

#### Summary of type-3 entities

| Entities |
| -------- |
| 1 × motor state sensor (opened / closed / stopped) + battery sensor |

## Easywave neo sensors

Easywave neo wireless sensors transmit temperature, humidity, and battery data via RF. Click **Add sensor** and press the learn button on the physical sensor. The following entities are created:

| Entity | Platform | Description |
| ------ | -------- | ----------- |
| Temperature | Sensor | Current temperature reading in °C |
| Humidity | Sensor | Current relative humidity in % |
| Battery warning | Sensor (diagnostic) | Battery state derived from every sensor telegram: `ok` or `low` |

## Gateway sensor

A **Connection Status** diagnostic sensor is always created for the RX11 gateway.

| State | Description |
| ----- | ----------- |
| `Connected` | The transceiver is connected and operational |
| `Not Connected` | The transceiver is not found or offline |

The sensor exposes the following diagnostic attributes:

| Attribute | Description |
| --------- | ----------- |
| `device_path` | The system path of the USB device |
| `connected` | Whether the transceiver is currently connected |
| `usb_serial_number` | The USB serial number of the device |
| `hardware_version` | The hardware version reported by the device |
| `firmware_version` | The firmware version reported by the device |

### Automatic reconnection

The integration monitors the USB connection and automatically detects when the transceiver is disconnected or reconnected. When the device goes offline, all receiver and sensor entities become unavailable and the gateway sensor changes to `Not Connected`. The integration will periodically attempt to reconnect and restore normal operation without user intervention.

## Regulatory compliance

Easywave operates on the **868 MHz ISM band**, which is permitted in the following regions:

- All EU/EEA member states
- United Kingdom
- Switzerland
- Other CEPT member states

If your configured Home Assistant country is outside the permitted region for the 868 MHz band, the integration will not start and a **repair issue** will be created in your Home Assistant dashboard explaining the restriction.

To verify or change your country setting, go to {% my general title="**Settings** > **System** > **General**" %} and check the **Country** field.

## Known limitations

- Easywave switch and cover receivers do not provide position feedback; the integration tracks on/off and open/closed state based on sent commands only. Easywave neo motor receivers are bidirectional and will support position feedback once Easywave neo receiver support is added.
- Easywave neo receivers are not yet supported. Switch and motor variants with 1, 2, and 4 channels are planned for a future release.
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
