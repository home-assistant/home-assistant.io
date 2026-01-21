---
title: Cync
description: Instructions on how to integrate Cync devices into Home Assistant.
ha_release: '2025.10'
ha_iot_class: Cloud Push
ha_category:
  - light
ha_codeowners:
  - '@Kinachi249'
ha_domain: cync
ha_integration_type: hub
ha_platforms:
  - light
ha_quality_scale: bronze
ha_config_flow: true
---

The **Cync** {% term integration %} is used to integrate with smart devices sold by [GE Lighting](https://www.gelighting.com/). Cync, formerly known as "C by GE", is the name given to GE Lighting's line of smart devices.

## Prerequisites

- A Cync account is required to use this integration.
- Any device you wish to add to Home Assistant must first be set up via the Cync app.
- At least one Wi-Fi connected device is required to be set up in your Cync account.
  - Older, Bluetooth-only Cync devices may not be recognized by the integration without a Cync bridge device.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: Your Cync account's email address
Password:
    description: Your Cync account's password
{% endconfiguration_basic %}

## Supported functionality

The **Cync** integration provides the following entities.

### Lights

- Supported operations:
  - On/Off
  - Brightness*
  - Color temperature*
  - RGB color*

*If supported by device.

## Known limitations

- The following lighting features are not yet supported:
  - Dynamic effects
  - Light shows
  - Music shows
  - LED strip segment control
- Cync servers only allow one instance of your account to connect at a time. If you open the Cync app while Home Assistant is running, the integration will briefly lose its connection. It will automatically reconnect after a 10 second waiting period.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
