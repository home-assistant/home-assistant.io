---
title: Specialized Turbo
description: Read telemetry from Specialized Turbo e-bikes over Bluetooth Low Energy in Home Assistant.
ha_category:
  - Sensor
ha_release: "2026.9"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@JamieMagee'
ha_domain: specialized_turbo
ha_integration_type: device
ha_quality_scale: silver
ha_platforms:
  - sensor
ha_bluetooth: true
related:
  - docs: /integrations/bluetooth/
    title: Bluetooth
---

The **Specialized Turbo** {% term integration %} connects Home Assistant to [Specialized](https://www.specialized.com/) Turbo e-bikes over Bluetooth Low Energy. The integration reads battery, motor, ride, and system telemetry from the bike.

You can use this data to track battery health, record ride information, or create battery charge notifications.

## Supported devices

The integration supports Specialized Turbo bikes with these Bluetooth systems:

- TCU1
- TCX1
- TCX2
- TCX3
- TCX4

These systems are available in models from the Turbo Vado, Levo, Creo, Como, and Tero families. The integration supports legacy `TURBOHMI` advertisements, modern advertisements, and bikes that advertise only a `WSBC...` name.

## Unsupported devices

The integration does not support these devices:

- Specialized bikes without Bluetooth
- Non-Turbo Specialized bikes
- E-bikes from other manufacturers

## Prerequisites

1. Turn on the bike.
2. Make sure that Home Assistant has access to a [Bluetooth adapter](/integrations/bluetooth/).
3. If you use an ESPHome Bluetooth proxy, enable active connections on the proxy.
4. Disconnect the Specialized app and other Bluetooth clients from the bike.

An encrypted bike also requires one of these items:

- A Specialized account that contains the bike
- The 64-character wrapped key for the bike

Home Assistant uses your account password only during key retrieval. Home Assistant stores the wrapped bike key, but it does not store the password or account token.

{% include integrations/config_flow.md %}

The bike is usually discovered automatically. If it is not listed, add the integration from {% my integrations title="**Settings** > **Devices & services**" %}.

{% configuration_basic %}
Encryption key source:
  description: "For an encrypted bike, select your Specialized account or manual wrapped-key entry."
Specialized account email:
  description: "The email address for the Specialized account that contains the bike."
Specialized account password:
  description: "The integration sends this password to Specialized during key retrieval. Home Assistant does not store it."
Wrapped key:
  description: "The 64-character wrapped key for the bike. Use this option if you do not want to use a Specialized account."
{% endconfiguration_basic %}

The Bluetooth backend manages bike pairing. The integration does not ask for or store a pairing PIN.

Some bikes require confirmation in the operating system. If the Bluetooth backend cannot show this request, pair the bike in the operating system first.

## Reconfigure an encryption key

You can replace the stored key for an encrypted bike. Use this function after a display replacement or an invalid-key error.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Specialized Turbo** integration.
3. Open the three-dot menu for the bike.
4. Select **Reconfigure**.
5. Select a Specialized account or manual wrapped-key entry.

Home Assistant starts reauthentication when a stored key is missing, invalid, or stale.

## Supported functionality

### Entities

The **Specialized Turbo** integration provides 26 sensor entities.

#### Sensors

- **Battery**
  - **Description**: Current battery charge in percent

- **Battery capacity**
  - **Description**: Total battery capacity in watt-hours

- **Battery remaining**
  - **Description**: Remaining battery energy in watt-hours

- **Battery health**
  - **Description**: Battery health in percent
  - **Category**: Diagnostic

- **Battery temperature**
  - **Description**: Battery temperature
  - **Category**: Diagnostic

- **Charge cycles**
  - **Description**: Total number of battery charge cycles
  - **Category**: Diagnostic

- **Battery voltage**
  - **Description**: Current battery voltage
  - **Category**: Diagnostic

- **Battery current**
  - **Description**: Current battery input or output
  - **Category**: Diagnostic

- **Speed**
  - **Description**: Current bike speed

- **Rider power**
  - **Description**: Power from the rider in watts

- **Motor power**
  - **Description**: Power from the motor in watts

- **Cadence**
  - **Description**: Pedaling cadence in revolutions per minute

- **Odometer**
  - **Description**: Total bike distance

- **Motor temperature**
  - **Description**: Motor temperature
  - **Category**: Diagnostic

- **Assist level**
  - **Description**: Current assist mode: Off, Eco, Trail, or Turbo

- **ECO assist**
  - **Description**: Configured assistance for Eco mode
  - **Category**: Diagnostic
  - **Remarks**: Disabled by default

- **Trail assist**
  - **Description**: Configured assistance for Trail mode
  - **Category**: Diagnostic
  - **Remarks**: Disabled by default

- **Turbo assist**
  - **Description**: Configured assistance for Turbo mode
  - **Category**: Diagnostic
  - **Remarks**: Disabled by default

- **Range (long)**
  - **Description**: Estimated range for the long-range calculation
  - **Remarks**: Disabled by default

- **Range (short)**
  - **Description**: Estimated range for the short-range calculation
  - **Remarks**: Disabled by default

- **Altitude**
  - **Description**: Current altitude
  - **Remarks**: Disabled by default

- **Altitude gain**
  - **Description**: Total altitude gain
  - **Remarks**: Disabled by default

- **Gradient**
  - **Description**: Current gradient in percent
  - **Remarks**: Disabled by default

- **System temperature**
  - **Description**: Temperature reported by the bike system
  - **Category**: Diagnostic
  - **Remarks**: Disabled by default

- **Consumption**
  - **Description**: Energy consumption in watt-hours per kilometer
  - **Remarks**: Disabled by default

- **Calories**
  - **Description**: Total ride energy in kilocalories
  - **Remarks**: Disabled by default

## Automation examples

### Notify when the battery is fully charged

```yaml
- alias: "Bike battery full"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.specialized_turbo_battery
      above: 99
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your bike is fully charged."
```

### Warn when battery health decreases

{% raw %}

```yaml
- alias: "Bike battery health warning"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.specialized_turbo_battery_health
      below: 80
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Bike battery health is at
          {{ states(
            'sensor.specialized_turbo_battery_health'
          ) }}%.
          Consider scheduling a service.
```

{% endraw %}

## Data updates

The integration keeps an active Bluetooth connection while the bike is awake and in range. The bike sends telemetry changes through Bluetooth notifications.

The integration also requests telemetry periodically. This request supplies values that the bike does not send through notifications.

If the connection stops, the entities become unavailable. The integration reconnects after it receives another advertisement from the bike.

## Known limitations

- **Bluetooth range**: The bike must be near a Bluetooth adapter. The typical range is 5 to 10 meters.
- **One connection at a time**: Disconnect the Specialized app before Home Assistant connects.
- **Read-only access**: The integration cannot change assistance, tuning, or bike configuration.
- **Sleep mode**: The bike stops Bluetooth communication when it sleeps.
- **Encrypted setup**: Account key retrieval requires internet access during setup or reauthentication.
- **Bluetooth proxies**: Some ESPHome proxies cannot complete operating-system pairing requests.

## Move from the HACS integration

The Core integration uses the same domain and entity unique IDs as the HACS integration.

1. Update the HACS integration to version 0.6.0 or later.
2. Restart Home Assistant.
3. Remove the Specialized Turbo custom integration files from HACS.
4. Do not delete the Specialized Turbo configuration entry.
5. Restart Home Assistant with a version that includes the Core integration.

Home Assistant keeps the configuration entry, the encrypted bike key, and the entity registry entries.

## Privacy

The integration can contact Specialized during encrypted bike setup. This request retrieves the wrapped key for the selected bike.

Home Assistant does not store the Specialized account password or account token.

## Troubleshooting

### The bike is not discovered

#### Symptom: The bike is not listed during setup

The bike can be asleep, out of range, or unavailable to the Bluetooth adapter.

##### Resolution

1. Turn on the bike.
2. Move the bike near the Bluetooth adapter.
3. Make sure that the Bluetooth integration is available.
4. If you use an ESPHome proxy, make sure that active connections are enabled.

Older bikes can advertise only a `WSBC...` name. The integration supports this name and selects the protocol after connection.

### The bike does not connect

#### Symptom: Setup reports that the bike connection cannot complete

Another Bluetooth client can hold the connection. The Bluetooth backend can also require operating-system pairing.

##### Resolution

1. Disconnect the Specialized app from the bike.
2. Remove an old bike pairing from the operating system.
3. Pair the bike in the operating system.
4. Start the Home Assistant setup again.

If you use an ESPHome proxy, complete the first pairing through a local Bluetooth adapter when possible.

### Sensor entities are unavailable

#### Symptom: All bike sensor entities show **Unavailable**

The bike is asleep, out of range, or disconnected from Home Assistant.

##### Resolution

1. Wake the bike.
2. Move the bike near the Bluetooth adapter.
3. Disconnect other Bluetooth clients.
4. Reload the integration from **Settings** > **Devices & services**.

### The encryption key is unavailable

#### Symptom: Setup cannot retrieve or use the bike key

The account credentials can be incorrect. The Specialized service can also be unavailable.

##### Resolution

1. Make sure that Home Assistant has internet access.
2. Make sure that the bike is present in the Specialized account.
3. Enter the account credentials again.
4. If account retrieval fails, enter the wrapped key manually.

### More than one `WSBC...` device is listed

Some bikes expose more than one Bluetooth endpoint. Select the endpoint that is present, has a current signal, and accepts pairing.

An endpoint with a signal strength of `-127` can be stale or unavailable.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
