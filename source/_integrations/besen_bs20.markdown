---
title: Besen BS20
description: Instructions on how to integrate Besen BS20 EV chargers over Bluetooth Low Energy with Home Assistant.
ha_category:
  - Car
ha_release: 2026.8
ha_iot_class: Local Push
ha_codeowners:
  - '@moryoav'
ha_domain: besen_bs20
ha_bluetooth: true
ha_platforms:
  - switch
ha_config_flow: true
ha_integration_type: device
---

The **Besen BS20** {% term integration %} connects Home Assistant to Besen BS20-family EV chargers over Bluetooth Low Energy.

This integration talks directly to the charger through Home Assistant's [Bluetooth](/integrations/bluetooth) stack. It does not require MQTT, a sidecar process, or a Home Assistant add-on.

## Prerequisites

- A Besen BS20 or compatible charger advertising as `ACP#...`.
- The charger's Bluetooth address and 6-digit PIN.
- A Bluetooth adapter or ESPHome Bluetooth proxy that supports active GATT connections.

ESPHome Bluetooth proxies need active connections enabled. Each connected charger uses one active GATT connection slot on the selected proxy.

{% include integrations/config_flow.md %}

Home Assistant can discover chargers that advertise as `ACP#...`. If discovery does not find your charger, add the integration manually and enter the charger's Bluetooth address.

{% configuration_basic %}
Bluetooth address:
  description: "The BLE address of the charger. Discovery fills this automatically when Home Assistant sees an ACP# advertisement."
PIN:
  description: "The charger's 6-digit Bluetooth PIN. Many units default to 123456."
{% endconfiguration_basic %}

## Supported devices

The following device is known to be supported by this integration:

- [Besen BS20 EV Charging Station](https://www.besen-group.com/products/ev-charging-station/bs20/)

Other Besen wallboxes using the same `ACP#` Bluetooth protocol may also work.

## Entities

The {% term integration %} provides a switch to start or stop charging.

The switch state follows the charging state reported by the charger.

## Data updates

The charger sends status updates over Bluetooth notifications after login. Home Assistant keeps one active Bluetooth connection open, listens for notifications, and responds to charger heartbeats. If notifications stop, the integration reconnects automatically.

This is a local push integration. There is no cloud dependency.

## Actions

The integration does not provide custom actions. Use the standard entity actions instead:

- `switch.turn_on` starts charging.
- `switch.turn_off` stops charging.

## Examples

Start charging when an off-peak tariff starts:

```yaml
alias: Start EV charging off peak
triggers:
  - trigger: time
    at: "23:00:00"
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.besen_bs20_charge
```

Stop charging before a peak tariff starts:

```yaml
alias: Stop EV charging before peak tariff
triggers:
  - trigger: time
    at: "17:00:00"
actions:
  - action: switch.turn_off
    target:
      entity_id: switch.besen_bs20_charge
```

## Troubleshooting

### The charger is not discovered

#### Symptom: The charger is missing from setup

Home Assistant does not discover the charger automatically.

#### Resolution

To resolve this issue, try the following steps:

1. Confirm the charger appears in **Settings** > **Bluetooth** > **Advertisement monitor** as `ACP#...`.
2. Move an ESPHome Bluetooth proxy closer to the charger.
3. Make sure the proxy is added to Home Assistant through the ESPHome integration.
4. Run an active scan or temporarily place a local Bluetooth adapter near the charger.

### No connectable Bluetooth path is available

#### Symptom: "No connectable Bluetooth path is available"

When setting up or loading the integration, Home Assistant reports that no connectable Bluetooth path is available.

#### Description

The charger may be visible only through a passive or non-connectable adapter. The charger can keep only one active Bluetooth client connection.

#### Resolution

To resolve this issue, try the following steps:

1. Use an ESPHome Bluetooth proxy with active connections enabled, or a local Bluetooth adapter supported by Home Assistant.
2. Stop any app, bridge, container, add-on, or service that may already be connected to the charger.

### The charger becomes unavailable

#### Symptom: The charge switch is unavailable

The charge switch becomes unavailable after the integration was set up.

#### Resolution

To resolve this issue, try the following steps:

1. Check **Settings** > **Bluetooth** > **Connection monitor**.
2. Verify the proxy has free active connection slots.
3. Stop any old MQTT bridge or companion process that may still hold the charger's Bluetooth connection.
4. Prefer Ethernet ESPHome Bluetooth proxies when possible.
5. Avoid placing the proxy next to strong Wi-Fi or USB 3.0 interference sources.

### The PIN is rejected

#### Symptom: The charger rejected the PIN

During setup, Home Assistant reports that the charger rejected the PIN.

#### Resolution

Remove and add the integration again with the current 6-digit PIN.

## Known limitations

The integration does not support:

- Changing charger settings such as charge current, language, temperature unit, LCD brightness, or device name.
- Reporting detailed charger telemetry as Home Assistant sensor entities.
- Wi-Fi provisioning.
- Password reset.
- Device reset.
- Charging history download.
- Firmware updates through Home Assistant.
- Safety-certified load balancing.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
