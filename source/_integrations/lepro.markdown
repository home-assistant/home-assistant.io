---
title: Lepro
description: Instructions on how to integrate Lepro smart lighting into Home Assistant.
ha_category:
  - Light
ha_release: 2025.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@lepro'
ha_domain: lepro
ha_platforms:
  - light
ha_integration_type: device
related:
  - url: https://www.lepro.com
    title: Lepro
---

The **Lepro** {% term integration %} connects your [Lepro](https://www.lepro.com) smart lighting devices to Home Assistant, letting you control brightness, color temperature, and color from a single place.

## Prerequisites

Before setting up the integration, make sure you have:

1. A Lepro account. You can create one at Lepro app.
2. The Lepro app installed on your mobile device, with at least one device added to your account.

{% include integrations/config_flow.md %}

## Configuration

To add the Lepro integration to your Home Assistant instance:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Add integration** and search for **Lepro**.
3. Enter your Lepro account email address and select **Submit**.
4. You will be redirected to the Lepro authorization page. Sign in with your Lepro account credentials and grant access to Home Assistant.
5. After authorization, you are returned to Home Assistant and your Lepro devices are added automatically.

### Lights

- **On/off**: Turn lights on or off.
- **Brightness**: Adjust the brightness level.
- **Color temperature**: Adjust the color temperature for white-tunable lights.
- **Color**: Change the color for RGB and RGBW lights.

## Troubleshooting

### Devices are not discovered after setup

Make sure your Lepro devices are powered on and visible in the Lepro app. If devices still do not appear, try reloading the integration.

### Authorization fails or redirects back with an error

Make sure you are using the correct Lepro account credentials on the authorization page. If the issue persists, check that your Lepro account is active and that you have at least one device added in the app.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
