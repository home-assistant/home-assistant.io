---
title: SEKO PoolDose
description: Connect your SEKO PoolDose pool dosing system to Home Assistant.
ha_category:
  - Water Management
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: "2025.8"
ha_codeowners:
  - '@lmaertin'
ha_domain: pooldose
ha_platforms:
  - sensor
  - binary_sensor
  - switch
  - number
  - select
ha_integration_type: integration
---

The `PoolDose` integration connects a [SEKO](https://www.seko.com/) pool dosing system with Home Assistant. SEKO is a manufacturer of various monitoring and control devices for Pools and Spas.

This integration uses an undocumented local HTTP API, implemented in the PyPi project ```python-pooldose```. It provides live readings for pool sensors such as temperature, pH, ORP/Redox, as well as status information and control over the dosing logic.

## Prerequisites

1. Install and set-up the PoolDose devices according to the user manual.
   1. In particular, connect the device to your WiFi network.
   2. Identify the IP address or hostname of the device.
2. Browse to the IP address or hostname (default port: 80).
   1. Try to log in to the web interface with the default password (0000).
   2. Check availability of data in the web interface.
3. Optionally: Block the device from internet access to ensure cloudless-only operation and potentially breaking firmware updates.

{% include integrations/config_flow.md %}

## Configuration options

{% include integrations/option_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address resp. hostname of your PoolDose device. Identify the IP address resp. hostname in the web interface of the device or of your router.
Scan Interval:
  description: Interval for polling the device. Optional; defaults to 600 seconds.
Timeout:
  description: Connection timeout for data requests. Optional; defaults to 30 seconds.
Include Sensitive Data:
  description: Fetch sensitive data from the device, e.g., WiFi keys.
{% endconfiguration_basic %}

The serial number and API version are automatically retrieved and validated.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Notes

- This integration is fully local and requires no cloud account.
- The device lacks stability in its network connection. Cached values are used when the API is temporarily unavailable.
- The password for the Web Interface must be set to default (deactivated), i.e., 0000.

## Major Entities

Note: This is a selection of sensors of major interest.

| Entity ID (w/o prefix) | Unit | Description                            |
|--------------------------------|------|----------------------------------------|
| `sensor.temperature`      | °C   | Pool water temperature                 |
| `sensor.ph`        | pH   | Current pH level                       |
| `sensor.orp`       | mV   | Current ORP (Redox) value              |
| `sensor.ph_type_dosing`   | —    | pH dosing type                         |
| `sensor.orp_type_dosing`  | —    | ORP dosing type                        |
| `sensor.ownerid`          | —    | Owner ID                               |
| `sensor.wifi_ssid`        | —    | Current Wi-Fi SSID                     |
| `sensor.wifi_key`         | —    | Current Wi-Fi password/key (include sensitive data flag required)                   |
| `sensor.ap_ssid`          | —    | Access point SSID                      |
| `sensor.ap_key`           | —    | Access point password/key (include sensitive data flag required)              |
| `sensor.api_version`      | —    | Gateway API version                    |

## Binary Sensors

| Entity ID (w/o prefix)   | Description                          |
|----------------------------------|--------------------------------------|
| `binary_sensor.circulation_state` | Circulation pump running status     |
| `binary_sensor.ph_level_ok`      | pH level within safe range          |
| `binary_sensor.orp_level_ok`     | ORP level within safe range         |
| `binary_sensor.flow_rate_ok`     | Flow rate okay                      |
| `binary_sensor.alarm_relay`      | General alarm relay active          |
| `binary_sensor.relay_aux1_ph`    | Auxiliary relay 1 (pH control)      |
| `binary_sensor.relay_aux2_orpcl` | Auxiliary relay 2 (ORP/chlorine)    |

## Switches

| Entity ID (w/o prefix)                    | Description                            |
|------------------------------|----------------------------------------|
| `switch.stop_dosing`    | Stop all dosing (manual override)      |
| `switch.circulation_detection` | Enable/disable circulation pump detection  |
| `switch.frequency_input`     | Enable/disable frequency input for flow measurement       |

## Number (Slider)

| Entity ID (w/o prefix)             | Unit | Description                      |
|------------------------|------|----------------------------------|
| `number.ph_target`  | pH   | Set target pH value             |
| `number.orp_target` | mV   | Set target ORP (Redox) value    |

## Select

| Entity ID (w/o prefix)                  | Description                       | Options           |
|----------------------------|-----------------------------------|-------------------|
| `select.water_meter_unit` | Water meter display unit          | `m³`, `liters`     |
