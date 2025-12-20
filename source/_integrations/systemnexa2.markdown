---
title: System Nexa 2
description: How to integrate System Nexa 2 devices within Home Assistant.
ha_category:
  - Light
  - Switch
ha_config_flow: true
ha_platforms:
  - light
  - switch
ha_release: 2026.1
ha_iot_class: Local Push
ha_codeowners:
  - '@konsulten'
ha_domain: nexa
ha_dhcp: true
ha_zeroconf: true
ha_quality_scale: bronze
integration_type: device
---

The **System Nexa 2** {% term integration %} allows you to integrate with the **System Nexa 2** devices from [Nexa](https://nexa.se/smarta-hem/system-nexa-2).

## Supported devices

The following devices are known to be supported by the integration:

- WBR-01 On/off in-wall switch/relay
- WPO-01 Outdoor Smart Plug
- WPR-01 Indoor Smart Plug

## Prerequisites

1. Open the app store and install the **Nexa Hem** app.
2. Create an account.
3. Add the device by onboarding it to your Wi-Fi, making sure it's on a network reachable from Home Assistant.

{% include integrations/config_flow.md %}

## Supported functionality

### Switches

- **Relay**
  - **Description**: Turn on or off switch relay
  - **Available for devices**: all
- **433Mhz**
  - **Description**: Controls whether device should use 433Mhz communication
  - **Available for devices**: all
- **Cloud Access**
  - **Description**: Controls whether to allow cloud access for device
  - **Available for devices**: all
- **Physical Button**
  - **Description**: Controls whether the onboard button should have any effect on the device
  - **Available for devices**: all
- **LED**
  - **Description**: Controls whether the onboard LED should be lit at any time
  - **Available for devices**: all

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
