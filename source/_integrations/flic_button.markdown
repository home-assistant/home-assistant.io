---
title: Flic Button
description: Connect Flic smart buttons to Home Assistant over Bluetooth.
ha_category:
  - Event
ha_release: 2026.9
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: flic_button
ha_platforms:
  - event
ha_integration_type: device
ha_quality_scale: silver
ha_codeowners:
  - '@50ButtonsEach'
ha_bluetooth: true
---

The **Flic Button** {% term integration %} allows you to connect [Flic](https://flic.io/) smart buttons to Home Assistant over Bluetooth Low Energy (BLE). Flic buttons are wireless buttons that trigger automations with pushes, double-pushes, holds, swipe gestures, and rotation.

For example, you can keep a Flic button on your nightstand to turn off every light with a single push, stick one by the front door to start your "leaving home" routine, or use a Flic Twist to dim the living room lights by turning the dial.

## Supported devices

The following Flic devices are supported:

- Flic 2: A single-button device powered by a CR2032 coin cell battery. It supports push, double-push, and hold actions.
- Flic Duo: A two-button device (a big button and a small button) powered by a CR2032 coin cell battery. It supports push, double-push, hold, swipe gestures (left, right, up, and down), and rotation while a button is held.
- Flic Twist: A rotary dial powered by two AAA batteries, with 12 physical detent positions. It supports push, double-push, hold, and rotation. The rotation behavior is configurable through the push twist mode option.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) adapter on the device running Home Assistant.
- The Flic button must be in pairing mode. To enter pairing mode, make sure the button is not currently connected to anything, then push and hold it until the LED flashes. This should take no longer than 10 seconds.

{% include integrations/config_flow.md %}

### Auto-discovery

Flic buttons are automatically discovered over Bluetooth when they are in pairing mode. When a Flic button is discovered, it appears as a new device on the integrations page, ready for you to set up.

### Manual setup

If the button is not automatically discovered:

1. Make sure the button is not connected to anything.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
3. Select **Add integration**, then search for **Flic Button**.
4. When the **Pair with Flic device** step asks for it, push and hold the button until it connects.
5. Submit the form to complete pairing.

## Configuration options

Configuration options are available for Flic Twist devices only. To access them, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the Flic Button entry for your Twist device, and select **Configure**.

{% configuration_basic %}
Push twist mode:
  description: "Controls what happens when you hold the button and twist the dial. **Default** fires twist and push-twist increment and decrement events, which stop at the boundaries. **Continuous** behaves like **Default**, but values wrap around instead of stopping. **Selector mode** fires rotation and selector changed events, so the dial behaves like a selector with distinct positions. Changing this option reloads the integration, which changes the event types the Twist provides."
{% endconfiguration_basic %}

## Supported functionality

The **Flic Button** integration provides the following entities.

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

## Data updates

Flic buttons push their events to Home Assistant over Bluetooth the moment they happen, so pushes, holds, and rotations are reported immediately. There is no {% term polling %} interval to configure.

## Known limitations

This integration exposes Flic buttons as event entities, which you can use to trigger automations. Rotation positions, battery level, and firmware updates are not exposed yet. Additional functionality may be added in future releases.

## Troubleshooting

### Button not discovered

Make sure the button is in pairing mode before you start discovery. If it is connected to something else, disconnect it first, then push and hold the button until the LED flashes. Keep the button close to your Bluetooth adapter and try again.

### Pairing failed

If pairing fails, try the following:

1. Make sure the button is not connected to anything.
2. Make sure the button is still in pairing mode, indicated by the flashing LED.
3. Move the button closer to the Bluetooth adapter.
4. If you see an "invalid signature" error, the button might not be a genuine Flic device.
5. If you are still having issues, try a factory reset. Remove the battery, insert it again, immediately push and hold the button for 10 seconds, then release it when the LED blinks red a few times.

### Button disconnects frequently

Flic buttons use BLE and might disconnect when idle to save battery. The integration automatically reconnects when the button advertises over Bluetooth. If disconnections are frequent, check that the button is within range and that there is no Bluetooth interference.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
