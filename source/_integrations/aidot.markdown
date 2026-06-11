---
title: AiDot
description: Instructions on integrating AiDot Wi-Fi lights with Home Assistant.
ha_category:
  - Light
ha_release: 2026.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@s1eedz'
  - '@HongBryan'
ha_domain: aidot
ha_platforms:
  - light
ha_integration_type: hub
ha_quality_scale: bronze
---

The [AiDot](https://www.aidot.com/) {% term integration %} allows you to control Wi-Fi lights with Home Assistant.

## Supported devices

- A19
- BR30

## Prerequisites

- Your devices need to be added to your account using the official AiDot app first.
- Only login with username and password is supported.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Country:
  description: "The country you use to log into the AiDot app."
Username:
  description: "The username you use to log into the AiDot app."
Password:
  description: "The password you use to log into the AiDot app."
{% endconfiguration_basic %}

## Supported functionality

The integration adds a light entity for each device.

### Lights

All lights support turning on and off, as well as adjusting brightness.

Depending on the device, the following features may also be available:

- **Color temperature**: Adjusts the white light warmth in Kelvin. The supported range varies per device (for example, 2700 K to 6500 K).
- **RGBW color**: Adjusts the color using red, green, blue, and white channels. Devices with RGBW support also support color temperature control.

## Data updates

- After you sign in successfully, the integration retrieves the device list from AiDot Cloud.
- After the initial device list is retrieved, the integration checks the cloud every 6 hours and processes any additions or deletions.
- The integration maintains a persistent TCP connection to each device and receives real-time status updates when the device state changes.

## Removing the integration

{% include integrations/remove_device_service.md %}
