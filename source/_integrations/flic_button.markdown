---
title: Flic
description: Connect Flic smart buttons to Home Assistant over Bluetooth.
ha_categories:
  - buttons_remotes
ha_release: 2026.11
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: flic_button
ha_platforms:
  - event
  - number
ha_integration_type: device
ha_quality_scale: bronze
ha_codeowners:
  - '@50ButtonsEach'
ha_bluetooth: true
---

The **Flic** {% term integration %} allows you to connect [Flic](https://flic.io/) smart buttons to Home Assistant over Bluetooth Low Energy (BLE). Flic buttons are wireless buttons that trigger automations with pushes, double-pushes, holds, swipe gestures, and rotation.

For example, you can keep a Flic button on your nightstand to turn off every light with a single push, stick one by the front door to start your "leaving home" routine, or use a Flic Twist to dim the living room lights by turning the dial.

## Supported devices

The following Flic devices are supported:

- Flic 2: A single-button device powered by a CR2032 coin cell battery. It supports push, double-push, and hold actions.
- Flic Duo: A two-button device (a big button and a small button) powered by a CR2032 coin cell battery. It supports push, double-push, hold, swipe gestures (left, right, up, and down), and rotation while a button is held.
- Flic Twist: A rotary dial powered by two AAA batteries, with 12 physical detent positions. It supports push, double-push, hold, and rotation. The rotation behavior is configurable through the push twist mode option.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) adapter on the device running Home Assistant.
- The Flic button must be in pairing mode. To enter pairing mode, make sure the button is not currently connected to anything, then push and hold it for 6 seconds, or 1.5 seconds if it is new or was factory reset. The button stays in pairing mode for up to 30 seconds.

{% include integrations/config_flow.md %}

## Configuration options

Configuration options are available for Flic Twist devices only. To access them, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the Flic entry for your Twist device, and select **Configure**.

{% configuration_basic %}
Push twist mode:
  description: "Controls what happens when you hold the button and twist the dial. **Default** fires twist and push-twist increment and decrement events, which stop at the boundaries. **Continuous** behaves like **Default**, but values wrap around instead of stopping. **Selector mode** fires rotation and selector changed events, so the dial behaves like a selector with distinct positions. Changing this option reloads the integration, which changes the entities and event types the Twist provides."
{% endconfiguration_basic %}

## Supported functionality

The **Flic** integration provides the following entities.

### Events

- **Button**
  - **Description**: Fires an event for each action on the button.
  - **Available for**: Flic 2 and Flic Twist.
  - **Event types**: **Single push**, **Double push**, **Hold**, **Down**, and **Up**.
  - **Remarks**: A Flic Twist adds event types that depend on the push twist mode. **Default** and **Continuous** add **Twist incremented**, **Twist decremented**, **Push-twist incremented**, and **Push-twist decremented**. **Selector mode** adds **Rotated clockwise**, **Rotated counter-clockwise**, and **Selector changed**.

- **Big button**
  - **Description**: Fires an event for each action on the big button.
  - **Available for**: Flic Duo.
  - **Event types**: **Single push**, **Double push**, **Hold**, **Down**, **Up**, **Swipe left**, **Swipe right**, **Swipe up**, **Swipe down**, **Rotated clockwise**, and **Rotated counter-clockwise**.

- **Small button**
  - **Description**: Fires an event for each action on the small button.
  - **Available for**: Flic Duo.
  - **Event types**: The same event types as **Big button**.

### Numbers

- **Twist position**
  - **Description**: The rotation position of the dial, from 0 to 100%. Setting it changes the position the Twist tracks, which its LED ring shows the next time you turn the dial.
  - **Available for**: Flic Twist in **Default** mode.

- **Push-twist position**
  - **Description**: The rotation position accumulated while the button is held, from 0 to 100%.
  - **Available for**: Flic Twist in **Default** mode.
  - **Remarks**: Tracked separately from **Twist position**, so the two do not affect each other.

- **Slot 1** to **Slot 12**
  - **Description**: The rotation position of each of the twelve detent positions, from 0 to 100%.
  - **Available for**: Flic Twist in **Selector mode**.
  - **Remarks**: Each slot keeps its own value, so turning the dial only changes the slot that is currently selected.

In **Continuous** mode, the Twist has no number entities. Its LED ring shows the raw rotation of the dial in that mode, so a position set from Home Assistant would not show on the device.

## Data updates

Flic buttons push their events to Home Assistant over Bluetooth the moment they happen, so pushes, holds, and rotations are reported immediately. There is no {% term polling %} interval to configure.

## Known limitations

The Flic Twist does not store its rotation position itself. Home Assistant holds the position and sends it back to the button every time they connect. If you turn the dial while the button is disconnected, that movement is not reported, and the position is restored to the last value Home Assistant saw once the button reconnects.

Battery level and firmware updates are not exposed yet. Additional functionality may be added in future releases.

## Troubleshooting

### Button not discovered

Make sure the button is in pairing mode before you start discovery. If it is connected to something else, disconnect it first, then push and hold the button for 6 seconds, or 1.5 seconds if it is new or was factory reset. Keep the button close to your Bluetooth adapter and try again.

### Pairing failed

If pairing fails, try the following:

1. Make sure the button is not connected to anything.
2. Make sure the button is still in pairing mode. It leaves pairing mode after 30 seconds, so put it back in pairing mode right before you try again.
3. Move the button closer to the Bluetooth adapter.
4. If you see an "invalid signature" error, the button might not be a genuine Flic device.
5. If you are still having issues, try a factory reset. Remove and reinsert the battery, then within 5 seconds push and hold the button for 10 seconds (the small button on Flic Duo). A factory reset removes all pairings.

### Button disconnects frequently

Flic buttons use BLE and might disconnect when idle to save battery. The integration automatically reconnects when the button advertises over Bluetooth. If disconnections are frequent, check that the button is within range and that there is no Bluetooth interference.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
