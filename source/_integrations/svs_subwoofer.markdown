---
title: SVS Subwoofer
description: Instructions on how to integrate SVS subwoofers into Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Number
  - Select
  - Switch
ha_iot_class: Local Push
ha_release: "2026.6"
ha_config_flow: true
ha_codeowners:
  - '@dangerouslaser'
ha_domain: svs_subwoofer
ha_platforms:
  - binary_sensor
  - button
  - number
  - select
  - switch
ha_integration_type: device
ha_quality_scale: bronze
ha_bluetooth: true
---

The **SVS Subwoofer** integration lets you control [SVS](https://www.svsound.com/) Bluetooth-enabled subwoofers (such as the SB-1000 Pro, SB-2000 Pro, SB-3000, and PB-series) directly from Home Assistant — the same way the official SVS app does, but without leaving your dashboard.

The integration speaks the SVS BLE binary protocol (originally reverse-engineered by [Logon84](https://github.com/logon84/pySVS)), so all parameter changes are applied locally over Bluetooth — no cloud, no extra hardware.

## Supported devices

Any SVS subwoofer with the SVS Bluetooth module attached, including:

- SB-1000 Pro
- SB-2000 Pro
- SB-3000
- PB-1000 Pro / PB-2000 Pro / PB-3000
- 16-Ultra series

If your subwoofer pairs successfully with the SVS app, it will work with this integration.

## Prerequisites

- A Bluetooth adapter known to Home Assistant. See the [Bluetooth integration documentation](/integrations/bluetooth/).
- The SVS phone app must be **disconnected** from the subwoofer. SVS subwoofers only accept one BLE connection at a time.

{% include integrations/config_flow.md %}

The integration auto-discovers SVS subwoofers via their advertised service UUID. You can also enter the MAC address manually if discovery is not picking up the device.

## Entities

For each configured subwoofer the integration creates:

### Number entities

- **Volume** — output level (-60 dB to 0 dB).
- **Phase** — phase shift (0° to 180°).
- **Low pass filter frequency** — crossover frequency (30 Hz to 200 Hz).
- **PEQ1 / PEQ2 / PEQ3 frequency, boost, Q-factor** — three bands of parametric EQ.

### Select entities

- **Low pass filter slope** (6, 12, 18, 24 dB/oct).
- **Room gain frequency / slope** — room-gain compensation.
- **Standby mode** — Auto ON / Trigger / ON.
- **Preset** — switch between Preset 1, 2, 3, or the factory default.

### Switch entities

- Low pass filter, PEQ1, PEQ2, PEQ3, room gain compensation, polarity (inverted).

### Binary sensor

- **Connected** — true while the integration holds an active BLE connection.

### Buttons

- **Reconnect** — force a fresh BLE connection (useful after the SVS app has disconnected).
- **Save to preset 1 / 2 / 3** — store the current settings in one of the writable preset slots. Preset 4 is the factory default and cannot be overwritten.

## Actions

The integration adds three actions for multi-subwoofer setups:

### Action: `svs_subwoofer.sync_from`

Copies all settings from one subwoofer to one or more others.

### Action: `svs_subwoofer.set_volume`

Sets the volume on multiple subwoofers in one call, with optional per-device dB offsets so a slave subwoofer can sit a few dB above or below the master.

### Action: `svs_subwoofer.load_preset`

Loads the same preset on multiple subwoofers simultaneously.

## Known limitations

- The subwoofer accepts only one BLE connection at a time. If the SVS app is connected, Home Assistant cannot connect.
- After a write, the device does not always push back a confirmation notification, so the integration applies an optimistic update locally. The next read on connect or via "Reconnect" reconciles state with the device.

## Removing the integration

This integration follows the standard integration removal procedure.

{% include integrations/remove_device_service.md %}
