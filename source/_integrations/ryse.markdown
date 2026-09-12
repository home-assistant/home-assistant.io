---
title: RYSE
description: Instructions on how to integrate RYSE Smart Shades into Home Assistant.
ha_category:
  - Cover
ha_bluetooth: true
ha_release: '2026.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mohamedkallel82'
ha_domain: ryse
ha_platforms:
  - cover
ha_integration_type: device
ha_quality_scale: bronze
---

The **RYSE** {% term integration %} allows you to control [RYSE](https://www.helloryse.com/) SmartShade motors from Home Assistant over Bluetooth Low Energy.

RYSE SmartShade motors retrofit existing beaded-chain window shades. This integration connects to the motor directly, so the RYSE SmartBridge is not needed.

## Supported devices

- RYSE SmartShade (wired)
- RYSE SmartShade (wire-free, with BatteryPack)

## Unsupported devices

- RYSE SmartBridge. This integration talks to the shades directly over Bluetooth and does not use the bridge.

## Prerequisites

- The [Bluetooth](/integrations/bluetooth) integration is set up and working.
- A local Bluetooth adapter on the machine running Home Assistant. Pairing is performed with BlueZ on that machine, so a shade cannot be added through a [remote adapter](/integrations/bluetooth/#remote-adapters-bluetooth-proxies).
- The shade is powered on and within Bluetooth range of Home Assistant.

{% include integrations/config_flow.md %}

Shades are discovered automatically once the [Bluetooth](/integrations/bluetooth) integration is enabled and functional, but only while they are in pairing mode. Shades that are not in pairing mode are deliberately left out.

### Pairing a shade

1. Press the **PAIR** button on the shade.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}. The shade is shown as a discovered **RYSE** device. If it is not, add it manually as described above and pick the shade from the list.
3. Select **Submit** to start pairing.

Pairing takes up to 30 seconds. Home Assistant connects, pairs, and bonds with the shade, and retries up to three times before reporting a failure. Leave the shade powered and in range until the dialog closes.

Repeat these steps for each shade.

## Supported functionality

### Entities

The **RYSE** integration provides the following entities.

#### Cover

Each shade is added as a single cover entity, named after the shade. It can be opened, closed, and set to any position, where 100% is fully open and 0% is fully closed.

Tilt is not supported.

## Data updates

The shade pushes its position to Home Assistant over a Bluetooth notification whenever it moves, including when it is operated with the on-device buttons or the RYSE app.

As a fallback, Home Assistant also {% term polling polls %} the shade every 15 seconds to re-establish the Bluetooth connection if it was lost and to request the position while it is still unknown.

## Known limitations

- A shade accepts a single Bluetooth connection at a time. Keep the RYSE mobile app closed while Home Assistant is using the shade.
- Adding a shade requires a local Bluetooth adapter. Bluetooth proxies cannot be used to pair a shade.

## Troubleshooting

### No RYSE device is found

The shade is only listed while it is in pairing mode.

1. Press the **PAIR** button on the shade, then start the flow again straight away.
2. Move the shade and Home Assistant closer together. Walls and metal shades reduce Bluetooth range considerably.
3. Check that the shade has not already been added. Configured shades are left out of the list.

### Pairing fails

If pairing keeps failing after a retry, a stale Bluetooth bond may be getting in the way. From a terminal on the machine running Home Assistant, remove the bond and pair again:

```bash
bluetoothctl remove AA:BB:CC:DD:EE:FF
```

Replace `AA:BB:CC:DD:EE:FF` with the Bluetooth address of the shade.

### The cover is unavailable

The shade is out of range, out of power, or connected to something else. A phone running the RYSE app holds the Bluetooth connection and locks Home Assistant out. Close the app and wait for the next update.

After a Home Assistant restart, the cover is unavailable until the first successful connection to the shade.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Pairing a shade also creates a Bluetooth bond on the machine running Home Assistant. This bond is not removed with the integration. To delete it, run the following command from a terminal on that machine:

```bash
bluetoothctl remove AA:BB:CC:DD:EE:FF
```
