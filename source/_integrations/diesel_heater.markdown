---
title: Diesel Heater
description: Instructions on how to integrate Vevor, BYD, HeaterCC, and Sunster diesel heaters via Bluetooth Low Energy.
ha_category:
  - Climate
ha_release: 2026.3
ha_iot_class: Local Polling
ha_codeowners:
  - '@Spettacolo83'
ha_domain: diesel_heater
ha_bluetooth: true
ha_platforms:
  - climate
ha_config_flow: true
ha_integration_type: device
---

The **Diesel Heater** {% term integration %} allows you to control and monitor diesel air heaters via Bluetooth Low Energy (BLE). This integration provides local control without requiring cloud connectivity.

## Supported devices

This integration supports diesel heaters from multiple brands that use compatible BLE protocols:

- **Vevor** diesel heaters (all BLE-enabled models)
- **BYD** diesel heaters
- **HeaterCC** compatible heaters (AirHeaterCC app)
- **Sunster** heaters (TB10Pro WiFi and similar)
- Generic Chinese diesel heaters using AirHeaterBLE, AirHeaterCC, or Sunster apps

## Prerequisites

Before setting up this integration:

1. Your diesel heater must be powered on and within Bluetooth range (typically 10-30 meters).
2. Unpair the heater from your phone.
   - BLE devices can only maintain one active connection.
   - If the heater is paired with the heater app on your phone, Home Assistant cannot connect.
3. The [Bluetooth](/integrations/bluetooth) integration must be set up and functional.

{% include integrations/config_flow.md %}

## Configuration options

After setup, you can configure these options:

{% configuration_basic %}
PIN code:
    description: "4-digit PIN for heater authentication. Default is 1234."
Away preset temperature:
    description: "Target temperature when the Away preset is active. Default is 8 °C."
Comfort preset temperature:
    description: "Target temperature when the Comfort preset is active. Default is 21 °C."
{% endconfiguration_basic %}

## Supported functionality

The **Diesel Heater** integration provides the following entities:

### Climate

The climate entity provides thermostat control:

- Temperature range: 8-36°C
- Presets: Away, Comfort
- HVAC modes: Off, Heat

## Troubleshooting

### Device not discovered

1. Ensure the heater is powered on.
2. Unpair the heater from your phone's Bluetooth settings.
   - This is the most common issue.
3. Close the heater app completely.
4. Check that the Bluetooth integration is active.

### Connection drops frequently

- ESPHome Bluetooth proxies have limited simultaneous connections (3-7 depending on ESP32 model).
- Raspberry Pi 4's built-in Bluetooth can be unreliable. Consider using an external USB Bluetooth 5.0 dongle.
- Reduce distance and obstacles between the Bluetooth adapter and heater.

### Temperature control not working

Temperature control only works in temperature mode. If available, check the running mode setting and switch from level mode if needed.

### Commands not responding

1. Verify the correct PIN is configured (default: 1234).
2. Check that no other device (phone app) is connected to the heater.
3. For advanced troubleshooting, see [enable debug logging and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
