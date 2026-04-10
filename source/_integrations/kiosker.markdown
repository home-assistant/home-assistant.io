---
title: Kiosker
description: Instructions on how to integrate Kiosker with Home Assistant
ha_category:
  - Sensor
ha_release: 2026.4.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@claeysson'
ha_domain: kiosker
ha_platforms:
  - sensor
ha_integration_type: integration
ha_dhcp: true
ha_quality_scale: bronze
---

[Kiosker](https://kiosker.io) is a powerful yet easy-to-use web kiosk for iPad and iPhone. This integration gives you control over your Kiosker app via the Kiosker API.

## Requirements

This integration requires that you have bought Kiosker Pro or have a valid Kiosker subscription. You can try Kiosker, including this integration for free for 7 days.

You need to enable the API server in Kiosker settings. You also need to generate an access token, and find the IP address of the device. Please refer to the [Kiosker documentation](https://docs.kiosker.io/#/api) for further information on how to configure the Kiosker App.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of the device.
API Token:
  description: The generated API token from the Kiosker App.
Use SSL:
  description: Connect to the Kiosker App using HTTPS. The Kiosker API has to be configured for SSL.
Verify certificate:
  description: Verify SSL certificate. Enable for valid certificates only.
{% endconfiguration_basic %}

## Capabilities

{% note %}
Due to Apple's restrictive approach to device control, it's not possible to control any physical features like the screen or device sleep through this integration.
{% endnote %}

Available sensors:

- Battery level
- Last interaction
- Last motion (available if a screensaver with motion detection is scheduled or if the camera sensor is enabled)
- Ambient light (available if a screensaver with motion detection is scheduled or if the camera sensor is enabled)

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}