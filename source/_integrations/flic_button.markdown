---
title: Flic
description: Connect Flic smart buttons to Home Assistant over Bluetooth.
ha_category:
  - Event
ha_release: 2025.8
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

The **Flic** {% term integration %} allows you to connect [Flic](https://flic.io/) smart buttons to Home Assistant over Bluetooth Low Energy (BLE). Flic buttons are wireless buttons that can trigger automations with clicks, double-clicks, holds, swipe gestures, and rotation.

## Supported devices

The following Flic devices are supported:

- **Flic 2** — A single-button device powered by a CR2032 coin cell battery. Supports click, double-click, and hold actions.
- **Flic Duo** — A two-button device (big button and small button) powered by a CR2032 coin cell battery. Supports click, double-click, hold, swipe gestures (left, right, up, down), and rotation while holding a button.
- **Flic Twist** — A rotary dial device powered by two AAA batteries with 12 physical detent positions. Supports click, double-click, hold, and rotation. The rotation behavior is configurable via the push-twist mode option.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) adapter on the device running Home Assistant.
- The Flic button must be in pairing mode. To enter pairing mode, make sure the button is not currently connected to anything and hold the button for 10 seconds until the LED flashes.

{% include integrations/config_flow.md %}

### Auto-discovery

Flic buttons are automatically discovered over Bluetooth when they are in pairing mode. If a Flic button is discovered, it will appear as a new device on the integrations page.

### Manual setup

If the button is not automatically discovered:

1. Make sure the button is not connected to anything.
2. Put the button into pairing mode by holding it for 10 seconds until the LED flashes.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
4. Select **Add integration** and search for **Flic**.
5. Follow the on-screen instructions to complete pairing.

## Entities

### Flic 2

- **Button** (event) — Fires events for click, double-click, hold, press, and release actions.

### Flic Duo

- **Big button** (event) — Fires events for the big button including click, double-click, hold, press, release, swipe gestures (left, right, up, down), and rotation while held (clockwise, counter-clockwise).
- **Small button** (event) — Fires events for the small button with the same event types as the big button.

### Flic Twist

The events available on the **Button** entity depend on the selected **push-twist mode** (see [Configuration options](#configuration-options) below).

**Default and continuous modes:**

- **Button** (event) — Fires events for click, double-click, hold, press, release, twist increment/decrement, and push-twist increment/decrement.

**Selector mode:**

- **Button** (event) — Fires events for click, double-click, hold, press, release, rotation (clockwise, counter-clockwise), and selector changed.

## Configuration options

Options are available for **Flic Twist** devices only. To access them, go to {% my integrations title="**Settings** > **Devices & services**" %}, find the Flic integration entry for your Twist device, and select **Configure**.

### Push-twist mode

Controls the behavior when holding the button and twisting the dial:

- **Default** — Fires twist increment/decrement and push-twist increment/decrement events. Values clamp at the boundaries.
- **Continuous** — Same as default, but values wrap around instead of clamping at the boundaries.
- **Selector mode** — Fires clockwise/counter-clockwise rotation events and selector-changed events. This mode is useful when you want the dial to behave like a selector with distinct positions.

Changing the push-twist mode reloads the integration and updates the event types available on the Button entity.

## Device automations

### Triggers

Device triggers are available for each Flic device. The available triggers depend on the device type:

**Flic 2:**

- Button clicked, double-clicked, held, pressed, released

**Flic Duo** (per button — big and small):

- Button clicked, double-clicked, held, pressed, released
- Swiped left, right, up, down
- Rotated clockwise, counter-clockwise

**Flic Twist (default/continuous mode):**

- Button clicked, double-clicked, held, pressed, released
- Twist incremented, decremented
- Push-twist incremented, decremented

**Flic Twist (selector mode):**

- Button clicked, double-clicked, held, pressed, released
- Rotated clockwise, counter-clockwise
- Selector changed

## Troubleshooting

### Button not discovered

Make sure the button is in pairing mode before starting discovery. If it is connected to something else, disconnect it first, then hold the button for 10 seconds until the LED flashes. Keep the button close to your Bluetooth adapter and try again.

### Pairing failed

If pairing fails, try the following:

1. Make sure the button is not connected to anything.
2. Make sure the button is still in pairing mode (LED flashing).
3. Move the button closer to the Bluetooth adapter.
4. If you see an "invalid signature" error, this may indicate the button is not a genuine Flic device.
5. If you are still having issues, try a factory reset. Remove the battery, insert it again, immediately press and hold the button for 10 seconds, and release it when the LED blinks red a few times.

### Button disconnects frequently

Flic buttons use BLE and might disconnect when idle to save battery. The integration automatically reconnects when the button advertises over Bluetooth. If disconnections are frequent, check that the button is within range and that there is no Bluetooth interference.
