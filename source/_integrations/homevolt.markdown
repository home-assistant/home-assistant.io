---
title: Homevolt
description: Connect Homevolt batteries locally to expose sensors in Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_domain: homevolt
ha_platforms:
  - diagnostics
  - sensor
  - switch
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
  - '@liudger'
ha_integration_type: device
ha_release: 2026.3
ha_quality_scale: silver
ha_zeroconf: true
---

The **Homevolt** {% term integration %} lets Home Assistant read local data from your Homevolt battery over your network, no cloud required.

{% include integrations/config_flow.md %}

API access must be explicitly enabled on the Homevolt device; contact Tibber Customer Support to activate the API.
Configuration needs the device IP address and, if set on the device, a password. 

{% configuration_basic %}
Host:
 description: "The IP address or hostname of your Homevolt device. You can find it in your router or via the device's discovery."
Password:
 description: "The password for your Homevolt device, if it is password protected. Leave empty if no password is set."
{% endconfiguration_basic %}

## Sensors

The {% term integration %} creates sensors reported by the device, including:

- Power (W) and energy (Wh/kWh)
- Voltage (V) and current (A)
- Temperature (°C) and frequency (Hz)
- Battery/percentage (%)
- Signal strength (dB)
- Text, count, or schedule status values

## Swtiches

The {% term integration %} creates switches reported by the device, including:

- Local mode, enable or disable loacal control mode

## Troubleshooting

- `Failed to connect`: confirm the IP address, device is powered, and reachable on your network.
- `Invalid authentication`: verify the device password or remove it if none is set.

## Removing the integration

{% include integrations/remove_device_service.md %}
