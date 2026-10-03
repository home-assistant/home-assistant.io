---
title: Netis Router
description: Instructions on how to integrate a Netis router into Home Assistant.
ha_category:
  - Hub
  - Presence detection
  - Sensor
ha_release: 2026.9
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@netis-systems-app'
ha_domain: netis
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - select
  - sensor
  - switch
ha_integration_type: hub
---

The **Netis Router** {% term integration %} connects Home Assistant to a Netis router (such as the MW5630 LTE model) via the router's built-in `ubus` JSON-RPC endpoint over HTTP. It lets you monitor connected devices, traffic, LTE signal and WAN/LTE connectivity, and control WiFi, the indicator LED and reboot the router.

There is currently support for the following device types within Home Assistant:

- **Presence Detection** - The Netis Router platform offers presence detection by looking at connected devices to the router.
- **Sensor** - Exposes traffic counters and speeds, online device count, LTE signal (RSRP/RSRQ/RSSI), operator, mode, IP, firmware and IMEI.
- **Binary Sensor** - Reports WAN and LTE connectivity state.
- **Switch** - Toggles WiFi (2.4 GHz / 5 GHz) and the front-panel indicator LED.
- **Select** - Adjusts WiFi transmit power (low / middle / high) per band.
- **Button** - Reboots the router.

{% include integrations/config_flow.md %}

## Authentication

The integration authenticates using the router's web UI password (the same password you use for the Wi-Fi). On factory-default routers with no password set, leave the password field empty.

The password is encrypted with AES-128-CBC using a server-provided random key before being sent to the router, matching the firmware's login flow.

## Configuration options

{% configuration_basic %}
Host:
  description: The IP address of your Netis router (default `192.168.1.1`).
Password:
  description: The router login password. Same as the Wi-Fi password. Leave empty on factory-default routers.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
Polling interval:
  description: How often to poll the router, in seconds (10-300, default 30).
{% endconfiguration_basic %}

## Services

### Service: `send_sms`

Send an SMS message through the router's LTE/4G modem. Only available on LTE-capable router models with a SIM card inserted and LTE connected.

### Service: `set_speed_limit`

Set a per-device download/upload speed limit (in Kbps). Set both values to `0` to remove the limit. Useful for parental control or bandwidth management.

## Troubleshooting

If the integration fails to set up, verify that:

- The host IP is correct and the router is reachable from Home Assistant.
- The password matches the router's web UI / Wi-Fi password.
- The router firmware exposes the `ubus` endpoint (most Netis firmwares based on OpenWrt do).
