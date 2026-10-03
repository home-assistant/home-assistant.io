---
title: Candy House Sesame BLE
description: Instructions on how to integrate Candy House Sesame smart locks over Bluetooth Low Energy into Home Assistant.
ha_category:
  - Lock
ha_release: '2026.10'
ha_iot_class: Local Push
ha_codeowners:
  - '@deece'
ha_domain: sesame_ble
ha_config_flow: true
ha_bluetooth: true
ha_platforms:
  - lock
ha_integration_type: device
ha_quality_scale: bronze
---

The **Candy House Sesame BLE** {% term integration %} allows you to monitor and control Candy House Sesame smart locks locally over Bluetooth Low Energy.

Communication occurs locally between Home Assistant and the lock via Home Assistant's [Bluetooth](/integrations/bluetooth/) integration or remote [ESPHome](/integrations/esphome/) Bluetooth proxies.

## Supported devices

The following Candy House Sesame locks are supported:

- Sesame 3
- Sesame 4
- Sesame 5
- Sesame 5 Pro
- Sesame 5 USA
- Sesame 6
- Sesame 6 Pro
- Sesame 6 Pro Sliding Door
- Sesame Bike 1
- Sesame Bike 2
- Sesame Bike 3

## Unsupported devices

- The original Sesame (1st generation) smart lock is not supported by this integration. Use the legacy [Sesame](/integrations/sesame/) cloud integration instead.
- Accessory devices such as Sesame Bot, Sesame Open Sensor, and biometric Sesame Keypad units are not supported in this initial release.

## Prerequisites

- A [Bluetooth](/integrations/bluetooth/) adapter or [ESPHome](/integrations/esphome/) Bluetooth proxy that supports active connections.
- For registered locks, you will need either:
  - The QR code image or `ssm://` URL exported from the official Sesame mobile application, or
  - The 16-byte (32-character hexadecimal) secret key and Bluetooth MAC address of the lock.
- For factory-reset or unregistered locks, direct app-free registration requires placing the device into reset mode (press the reset button on the lock until the LED flashes).

{% include integrations/config_flow.md %}

The integration supports three onboarding methods:

### Automatic discovery

When Home Assistant detects a nearby Sesame lock, it appears automatically in **Settings** > **Devices & services**. Select **Configure** and choose whether to confirm setup by providing the lock's 32-character hexadecimal secret key or importing its QR code.

### App-free direct registration

If your Sesame lock is factory-reset or has never been paired with the official mobile application:

1. Press the reset button on the lock until the LED flashes to enter pairing mode.
2. In Home Assistant, navigate to **Settings** > **Devices & services** > **Add integration** and search for **Candy House Sesame BLE**.
3. Select **Register New Device Nearby**.
4. Select your device from the list of discovered unregistered devices to automatically pair and generate encryption keys.

### Manual setup or QR code import

If discovery is not available:

1. In Home Assistant, navigate to **Settings** > **Devices & services** > **Add integration** and search for **Candy House Sesame BLE**.
2. Select **Import via QR Code** to paste an `ssm://` setup URL or upload an image file of the exported QR code.
3. Alternatively, select **Manual Setup** to manually specify the device parameters.

{% configuration_basic %}
Bluetooth MAC address:
  description: "The Bluetooth MAC address of the Sesame lock (for example, AA:BB:CC:DD:EE:FF)."
Secret key:
  description: "The 16-byte (32-character hexadecimal) secret key used to authenticate and encrypt communications with the lock."
Product model:
  description: "The specific hardware model of the lock (for example, Sesame 5, Sesame 6 Pro)."
Device UUID:
  description: "The UUID of the Sesame lock. Required only when configuring a lock that is not currently broadcasting nearby."
QR code image upload:
  description: "An image file containing the exported Sesame QR code from the official mobile application."
QR code setup URL:
  description: "The exported setup URL beginning with ssm://."
{% endconfiguration_basic %}

## Supported functionality

### Lock

Each Sesame lock provides a lock entity that allows you to lock and unlock the door:

- State updates reflect `locked`, `locking`, `unlocked`, `unlocking`, and `jammed` states.
- Standard Home Assistant lock actions (`lock.lock`, `lock.unlock`) are supported.

## Candy House Sesame BLE automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Lock the front door at night

Ensure the front door lock is secured automatically at night:

- **Trigger**: Time: 23:00:00
- **Condition**: Lock is unlocked
- **Action**: Lock lock
  - **Target**: Front Door Lock

{% details "YAML example for locking the door at night" %}

{% example %}
automation: |
  alias: "Lock front door at night"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: state
      entity_id: lock.front_door
      state: "unlocked"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

## Data updates

The integration communicates using **Local Push**:

- Sesame locks broadcast encrypted status updates over Bluetooth Low Energy advertisements. Home Assistant listens for these advertisements to update the lock state instantaneously without {% term polling %}.
- Active Bluetooth connections are established on-demand only when sending a lock or unlock command, preserving device battery life.
- Remote ESPHome Bluetooth proxies and local Bluetooth adapters are fully supported.

## Known limitations

- The integration provides the **Lock** platform only. Battery level and mechanical status are reported via lock entity attributes.
- Locks must be within Bluetooth range of your Home Assistant server or an active Bluetooth proxy.

## Troubleshooting

### The lock is not discovered

#### Symptom: Device missing from discovery

Home Assistant does not automatically discover the Sesame lock.

#### Resolution

To resolve this issue, try the following steps:

1. Confirm that the lock has fresh batteries installed and is within range of your Bluetooth adapter or ESPHome Bluetooth proxy.
2. If registering a new or factory-reset lock, ensure the lock is in reset mode with the LED flashing.
3. Check **Settings** > **Connectivity** > **Bluetooth** to ensure your Bluetooth integration and proxies are functioning properly.

### Authentication or key errors

#### Symptom: Invalid Secret Key or QR Code mismatch

Setup fails with an error indicating an invalid key or device mismatch.

#### Resolution

- If entering the secret key manually, ensure it consists of exactly 32 hexadecimal characters (16 bytes).
- If importing via QR code or `ssm://` URL, ensure the QR code was exported after the most recent lock reset or pairing in the mobile app. Re-pairing a lock in the official app generates new encryption keys and invalidates previously exported credentials.

### No connectable Bluetooth path is available

#### Symptom: "No connectable Bluetooth path is available"

Home Assistant reports that no connectable Bluetooth path is available when attempting to operate the lock.

#### Resolution

1. Verify that your ESPHome Bluetooth proxy has active connections enabled and has free connection slots available.
2. Ensure that no other device (such as the Sesame mobile application on a nearby smartphone) is maintaining an active, exclusive Bluetooth connection to the lock.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
