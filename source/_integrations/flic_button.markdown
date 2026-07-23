---
title: Flic
description: Connect Flic smart buttons to Home Assistant over Bluetooth.
ha_category:
  - Event
ha_release: 2026.7
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

The **Flic** {% term integration %} allows you to connect [Flic](https://flic.io/) smart buttons to Home Assistant over Bluetooth Low Energy (BLE). Flic buttons are wireless buttons that trigger automations with clicks, double-clicks, holds, swipe gestures, and rotation.

For example, you can keep a Flic button on your nightstand to turn off every light with a single press, stick one by the front door to start your "leaving home" routine, or use a Flic Twist to dim the living room lights by turning the dial.

## Supported devices

The following Flic devices are supported:

- **Flic 2** — A single-button device powered by a CR2032 coin cell battery. It supports click, double-click, and hold actions.
- **Flic Duo** — A two-button device (a big button and a small button) powered by a CR2032 coin cell battery. It supports click, double-click, hold, swipe gestures (left, right, up, and down), and rotation while a button is held.
- **Flic Twist** — A rotary dial powered by two AAA batteries, with 12 physical detent positions. It supports click, double-click, hold, and rotation. The rotation behavior is configurable through the push-twist mode option.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) adapter on the device running Home Assistant.
- The Flic button must be in pairing mode. To enter pairing mode, make sure the button is not currently connected to anything, then hold the button for 10 seconds until the LED flashes.

{% include integrations/config_flow.md %}

### Auto-discovery

Flic buttons are automatically discovered over Bluetooth when they are in pairing mode. When a Flic button is discovered, it appears as a new device on the integrations page, ready for you to set up.

### Manual setup

If the button is not automatically discovered:

1. Make sure the button is not connected to anything.
2. Put the button into pairing mode by holding it for 10 seconds until the LED flashes.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
4. Select **Add integration**, then search for **Flic**.
5. Follow the on-screen instructions to complete pairing.

## Configuration options

Configuration options are available for **Flic Twist** devices only. To access them, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the Flic integration entry for your Twist device, and select **Configure**.

### Push-twist mode

The push-twist mode controls what happens when you hold the button and twist the dial:

- **Default** — Fires twist increment and decrement events, along with push-twist increment and decrement events. Values stop at the boundaries.
- **Continuous** — Behaves like the default mode, but values wrap around instead of stopping at the boundaries.
- **Selector mode** — Fires clockwise and counter-clockwise rotation events, along with selector-changed events. This mode is useful when you want the dial to behave like a selector with distinct positions.

Changing the push-twist mode reloads the integration and updates the event types available on the **Button** entity.

## Supported functionality

### Entities

#### Flic 2

- **Button** (event) — Fires events for click, double-click, hold, press, and release actions.

#### Flic Duo

- **Big button** (event) — Fires events for the big button, including click, double-click, hold, press, release, swipe gestures (left, right, up, and down), and rotation while held (clockwise and counter-clockwise).
- **Small button** (event) — Fires the same event types as the big button.

#### Flic Twist

The events available on the **Button** entity depend on the selected push-twist mode (see [Configuration options](#configuration-options)).

For the default and continuous modes:

- **Button** (event) — Fires events for click, double-click, hold, press, release, twist increment and decrement, and push-twist increment and decrement.

For the selector mode:

- **Button** (event) — Fires events for click, double-click, hold, press, release, rotation (clockwise and counter-clockwise), and selector changed.

## Device automations

### Triggers

Device triggers are available for each Flic device. The available triggers depend on the device type.

#### Flic 2

- Button clicked, double-clicked, held, pressed, or released

#### Flic Duo

Triggers are available for each button (big and small):

- Button clicked, double-clicked, held, pressed, or released
- Swiped left, right, up, or down
- Rotated clockwise or counter-clockwise

#### Flic Twist (default and continuous modes)

- Button clicked, double-clicked, held, pressed, or released
- Twist incremented or decremented
- Push-twist incremented or decremented

#### Flic Twist (selector mode)

- Button clicked, double-clicked, held, pressed, or released
- Rotated clockwise or counter-clockwise
- Selector changed

## Data updates

Flic buttons push their events to Home Assistant over Bluetooth the moment they happen, so button presses, holds, and rotations are reported immediately. There is no {% term polling %} interval to configure.

## Known limitations

This integration currently exposes Flic buttons as event entities only, which you can use to trigger automations. Additional functionality may be added in future releases.

## Troubleshooting

### Button not discovered

Make sure the button is in pairing mode before you start discovery. If it is connected to something else, disconnect it first, then hold the button for 10 seconds until the LED flashes. Keep the button close to your Bluetooth adapter and try again.

### Pairing failed

If pairing fails, try the following:

1. Make sure the button is not connected to anything.
2. Make sure the button is still in pairing mode (the LED is flashing).
3. Move the button closer to the Bluetooth adapter.
4. If you see an "invalid signature" error, the button might not be a genuine Flic device.
5. If you are still having issues, try a factory reset. Remove the battery, insert it again, immediately press and hold the button for 10 seconds, then release it when the LED blinks red a few times.

### Button disconnects frequently

Flic buttons use BLE and might disconnect when idle to save battery. The integration automatically reconnects when the button advertises over Bluetooth. If disconnections are frequent, check that the button is within range and that there is no Bluetooth interference.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
