---
title: Terrestream
description: Connect a Terrestream Indoor Air Quality sensor over your local network.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: "2026.10"
ha_config_flow: true
ha_codeowners:
  - '@Xynergi'
ha_domain: terrestream_local
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Terrestream** {% term integration %} connects a Terrestream Indoor Air Quality sensor to Home Assistant over your local network. It provides air quality and room readings for dashboards and automations. No Terrestream account or MQTT broker is required.

## Supported devices

- Terrestream Indoor Air Quality sensor with firmware 4.1.0 or later

## Prerequisites

1. Connect your sensor to Wi-Fi and make sure its IP address or hostname is reachable from Home Assistant.
2. If your network restricts connections between devices, allow Home Assistant to reach the sensor on TCP port 6054 for pairing and TCP port 6053 for normal use. Keep these ports off the public internet.
3. On the sensor, open **Setup** > **Home Assistant** > **Pair**. Keep the displayed eight-digit code ready. It expires after two minutes.

Firmware updates are supplied by Terrestream and require internet access. Reading measurements through this integration does not require an internet connection.

{% include integrations/config_flow.md %}

Enter the sensor's local address and all eight digits of the displayed code, including any leading zeros. If the code expires, open a new pairing window on the sensor.

{% configuration_basic %}
IP address or hostname:
  description: "The sensor's reachable local address. Do not include a URL scheme or port."
Pairing code:
  description: "The eight-digit code displayed by the sensor."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides the following sensor entities:

- Carbon dioxide, in ppm
- PM1, PM2.5, PM4, and PM10, in µg/m³
- Temperature, in °C
- Humidity, in %
- Pressure, in hPa
- Illuminance, in lx
- VOC index
- NOx index
- Computed EPA particulate AQI

Home Assistant can convert supported measurement units for display. VOC and NOx indices are relative values, not gas concentrations. The computed particulate air quality index (AQI) uses instantaneous PM2.5 and PM10 readings with the United States Environmental Protection Agency's 2024 breakpoints. It is not a daily outdoor AQI or the sensor's optional AQHI+ display value.

## Terrestream automation examples

Use these sensor entities with Home Assistant's standard [numeric state triggers](/docs/automation/trigger/#numeric-state-trigger). This integration does not provide its own triggers, conditions, or actions.

### Automation: notify when carbon dioxide stays above your chosen threshold

Create an automation with a numeric state trigger for the sensor's **Carbon dioxide** entity. Set the upper threshold and the duration that suit your purpose, then add a notification action. This lets you receive a notification when the reading stays above that threshold for the selected duration.

## Data updates

Home Assistant {% term polling polls %} the sensor every five seconds. Air quality, temperature, humidity, and pressure readings expire 60 seconds after acquisition. Illuminance readings expire after 20 seconds. Network delay counts toward these limits.

Missing, warming, cleaning, invalid, or stale readings appear as unavailable. Unavailable readings are never replaced with zero. Readings missed during a connection outage are not added to the history later.

## Known limitations

- Only one Home Assistant instance can maintain an active connection to a sensor at a time.
- Device setup, Bluetooth onboarding, and firmware update checks can temporarily interrupt the local connection.
- This integration provides measurements only. It does not expose device settings, firmware update controls, website situation recognition, or Pro intelligence.
- Pairing with Home Assistant does not change the sensor's existing cloud-sharing settings.

## Troubleshooting

### Cannot connect

Check the sensor's address and Wi-Fi connection. If you are pairing, open a new pairing window and try again. Make sure your network allows the connections listed under [Prerequisites](#prerequisites).

### Pairing failed

Enter all eight digits of the current code, including any leading zeros. If the code has expired, select **Pair** on the sensor again to display a new code.

### Readings are unavailable

Allow sensor warm-up, fan cleaning, or maintenance to finish. If you reload the integration during a firmware update check, leave the sensor powered on and allow up to two minutes for reconnection before troubleshooting further. Repeated reloads can delay recovery.

If another Home Assistant instance is connected to the sensor, stop that instance, wait one minute, and reload this integration.

## Removing the integration

{% include integrations/remove_device_service.md %}

After removing the integration, open **Setup** > **Home Assistant** > **Disconnect** on the sensor and confirm. This revokes the pairing credentials while preserving Wi-Fi settings and the Terrestream account binding.

Home Assistant backups contain pairing credentials. Keep backups private. Removing an integration entry alone does not revoke credentials held in an old backup; use **Disconnect** on the sensor to revoke them.
