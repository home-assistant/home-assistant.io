---
title: Flic
description: Connect Flic smart buttons to Home Assistant over Bluetooth.
ha_category:
  - Event
  - Number
  - Select
  - Sensor
  - Update
ha_release: "2025.8"
ha_iot_class: Local Push
ha_config_flow: true
ha_domain: flic_button
ha_platforms:
  - event
  - number
  - select
  - sensor
  - update
ha_integration_type: device
ha_quality_scale: silver
ha_codeowners:
  - "@50ButtonsEach"
ha_bluetooth: true
---

The **Flic** {% term integration %} allows you to connect [Flic](https://flic.io/) smart buttons to Home Assistant over Bluetooth Low Energy (BLE). Flic buttons are wireless buttons that can trigger automations with clicks, double-clicks, holds, swipe gestures, and rotation.

## Supported devices

The following Flic devices are supported:

- **Flic 2** — A single-button device powered by a CR2032 coin cell battery. Supports click, double-click, and hold actions.
- **Flic Duo** — A two-button device (big button and small button) powered by a CR2032 coin cell battery. Supports click, double-click, hold, swipe gestures (left, right, up, down), and rotation while holding a button.
- **Flic Twist** — A rotary dial device powered by 2x AAA batteries with 12 physical detent positions. Supports click, double-click, hold, and rotation. The rotation behavior is configurable via the push-twist mode option.

## Prerequisites

- A working [Bluetooth](/integrations/bluetooth) adapter on the device running Home Assistant.
- The Flic button must be in pairing mode. To enter pairing mode, make sure the button is not currently connected to anything and hold the button for 7 seconds.

{% include integrations/config_flow.md %}

### Auto-discovery

Flic buttons are automatically discovered over Bluetooth when they are in pairing mode. If a Flic button is discovered, it will appear as a new device on the integrations page.

### Manual setup

If the button is not automatically discovered:

1. Make sure the button is not connected to anything.
2. Put the button into pairing mode by holding it for 7 seconds.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
4. Select **Add integration** and search for **Flic**.
5. Follow the on-screen instructions to complete pairing.

## Entities

### All devices

The following entities are created for all Flic devices:

- **Battery** (sensor) — Reports the battery level as a percentage. Uses voltage-to-percentage conversion curves specific to each battery type (CR2032 coin cell for Flic 2 and Duo, 2x AAA for Twist).
- **Firmware** (update) — Shows the currently installed firmware version and checks for available updates from the Flic firmware API. Firmware updates are installed over BLE and show progress during the transfer. Updates are auto-installed when a new version is available.

### Flic 2

- **Button** (event) — Fires events for click, double-click, hold, press, and release actions.

### Flic Duo

- **Big button** (event) — Fires events for the big button including click, double-click, hold, press, release, swipe gestures (left, right, up, down), and rotation while held (clockwise, counter-clockwise).
- **Small button** (event) — Fires events for the small button with the same event types as the big button.
- **Big button rotate** (number) — Shows the rotation position (0–100%) based on rotation while the big button is held. Read-only.
- **Small button rotate** (number) — Shows the rotation position (0–100%) based on rotation while the small button is held. Read-only.

### Flic Twist

The entities created for the Flic Twist depend on the selected **push-twist mode** (see [Configuration options](#configuration-options) below).

**Default and continuous modes:**

- **Button** (event) — Fires events for click, double-click, hold, press, release, twist increment/decrement, and push-twist increment/decrement.
- **Twist position** (number) — Shows the current rotation position (0–100%) when twisting without pressing the button. Can be set manually.
- **Push twist position** (number) — Shows the current rotation position (0–100%) when twisting while pressing the button. Can be set manually.

**Selector mode:**

- **Button** (event) — Fires events for click, double-click, hold, press, release, rotation (clockwise, counter-clockwise), and selector changed.
- **Slot 1–12 position** (number) — Twelve entities, one for each physical slot. Each shows the rotation position (0–100%) for that slot. Can be set manually.
- **Selected slot** (select) — Shows which of the 12 slots is currently selected on the physical dial. Read-only.

## Configuration options

Options are available for **Flic Twist** devices only. To access them, go to {% my integrations title="**Settings** > **Devices & services**" %}, find the Flic integration entry for your Twist device, and select **Configure**.

### Push-twist mode

Controls the behavior when holding the button and twisting the dial:

- **Default** — Provides two position sliders: one for free rotation (twist position) and one for rotation while the button is pressed (push-twist position). Values clamp at 0% and 100%.
- **Continuous** — Same as default, but values wrap around instead of clamping at the boundaries.
- **Selector mode** — Provides 12 individual slot sliders corresponding to the physical detent positions on the dial. Includes a selected slot entity and fires slot change events. This mode is useful when you want each physical position on the dial to control something different.

Changing the push-twist mode reloads the integration and creates the appropriate entities for the selected mode. Entities from the previous mode are automatically removed.

## Device automations

### Triggers

Device triggers are available for each Flic device. The available triggers depend on the device type:

**Flic 2:**

- Button clicked, double-clicked, held, pressed, released

**Flic Duo** (per button — big and small):

- Button clicked, double-clicked, held, pressed, released
- Swiped left, right, up, down
- Rotated clockwise, counter-clockwise
- Dial position changed

**Flic Twist (default/continuous mode):**

- Button clicked, double-clicked, held, pressed, released
- Twist incremented, decremented
- Push-twist incremented, decremented

**Flic Twist (selector mode):**

- Button clicked, double-clicked, held, pressed, released
- Rotated clockwise, counter-clockwise
- Selector changed
- Slot 1–12 position changed

## Troubleshooting

### Button not discovered

Press and hold your Flic until it connects. This should take no longer than 10 seconds. Make sure that your Bluetooth adapter is within range.

### Pairing failed

If pairing fails, try the following:

1. Make sure the button is not connected to anything.
2. Make sure the button is still in pairing mode (LED flashing).
3. Move the button closer to the Bluetooth adapter.
4. If you see an "invalid signature" error, this may indicate the button is not a genuine Flic device.
5. If you are having issues, try a factory reset: Remove the battery, insert it again, and immediately push and hold the button for 7 seconds. When you release the button, it should blink red a few times.

### Button disconnects frequently

Flic buttons use BLE and might disconnect when idle to save battery. The integration automatically reconnects when the button advertises over Bluetooth. If disconnections are frequent, check that the button is within range and that there is no Bluetooth interference.
