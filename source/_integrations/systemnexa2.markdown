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

- WBD-01
- WBR-01
- WPD-01
- WPO-01
- WPR-01

## Prerequisites

1. Open the app store and install the **Nexa Hem** app.
2. Create an account.
3. Add the device by onboarding it to your Wi-Fi, making sure it's on a network reachable from Home Assistant.

{% include integrations/config_flow.md %}

### Key supported features

#### Control

- On
- Off

#### Configuration

- 433Mhz enable/disable
- Cloud connection enable/disable
- LED enable/disable
- Button enable/disable

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
