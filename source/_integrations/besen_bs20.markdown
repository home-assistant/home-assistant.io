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
  - number
  - select
  - sensor
  - switch
  - text
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
Sync charger clock:
  description: "Keeps the charger's internal clock aligned during heartbeat handling."
{% endconfiguration_basic %}

## Supported devices

Known supported device:

- [Besen BS20 EV Charging Station](https://www.besen-group.com/products/ev-charging-station/bs20/)

Other Besen wallboxes using the same `ACP#` Bluetooth protocol may also work.

## Entities

The exact entity set depends on charger model, board revision, reported phase count, and supported firmware responses.

The {% term integration %} can provide:

- A switch to start or stop charging.
- Number entities for charge current and LCD brightness.
- Sensors for power, energy, phase voltage and current, charger status, plug state, error state, temperature, RSSI, charger time, and software version.
- Select entities for language and temperature unit.
- A text entity for the charger name.

Diagnostic or less commonly used entities may be disabled by default.

## Data updates

The charger sends status updates over Bluetooth notifications after login. Home Assistant keeps one active Bluetooth connection open, listens for notifications, and responds to charger heartbeats. If notifications stop, the integration reconnects automatically.

This is a local-push integration. There is no cloud dependency.

## Actions

The integration does not provide custom actions. Use the standard entity actions instead:

- `switch.turn_on` and `switch.turn_off` on the charging switch.
- `number.set_value` on charge current.
- `select.select_option` on language or temperature unit.
- `text.set_value` on the charger name.

## Examples

Start charging after solar surplus has been available for 5 minutes:

```yaml
alias: Start EV charging on solar surplus
triggers:
  - trigger: numeric_state
    entity_id: sensor.solar_surplus_power
    above: 2500
    for: "00:05:00"
conditions:
  - condition: state
    entity_id: sensor.besen_bs20_plug_state
    state: "Connected Locked"
actions:
  - action: number.set_value
    target:
      entity_id: number.besen_bs20_charge_amps
    data:
      value: 8
  - action: switch.turn_on
    target:
      entity_id: switch.besen_bs20_charging
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
      entity_id: switch.besen_bs20_charging
```

## Troubleshooting

### The charger is not discovered

- Confirm it appears in **Settings > Bluetooth > Advertisement monitor** as `ACP#...`.
- Move an ESPHome Bluetooth proxy closer to the charger.
- Make sure the proxy is added to Home Assistant through the ESPHome integration.
- Run an active scan or temporarily place a local Bluetooth adapter near the charger.

### No connectable Bluetooth path is available

The charger may be visible only through a passive or non-connectable adapter. Use an ESPHome Bluetooth proxy with active connections enabled, or a local Bluetooth adapter supported by Home Assistant.

Stop any existing bridge, app, container, add-on, or service that may already be connected to the charger. The charger can only keep one active Bluetooth client connection.

### The charger becomes unavailable

- Check **Settings > Bluetooth > Connection monitor**.
- Verify the proxy has free active connection slots.
- Stop any old MQTT bridge or companion process that may still hold the charger's Bluetooth connection.
- Prefer Ethernet ESPHome Bluetooth proxies when possible.
- Avoid placing the proxy next to strong Wi-Fi or USB 3.0 interference sources.

### The PIN is rejected

Use the integration's reauthentication prompt or reconfigure flow to enter the current 6-digit PIN.

## Known limitations

The integration does not support:

- Wi-Fi provisioning.
- Password reset.
- Device reset.
- Charging history download.
- Firmware updates through Home Assistant.
- Safety-certified load balancing.

## Removing the integration

{% include integrations/remove_device_service.md %}
