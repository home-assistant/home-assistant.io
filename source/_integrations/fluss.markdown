---
title: Fluss+
description: Instructions on how to integrate Fluss+ devices within Home Assistant.
ha_category:
  - Button
  - Cover
ha_release: 2026.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@Marcello17'
ha_domain: fluss
ha_config_flow: true
ha_platforms:
  - button
  - cover
ha_integration_type: integration
ha_quality_scale: silver
---

The **Fluss+** {% term integration %} allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant. Fluss turns your phone into a remote key that can open your garage, your gate, your door or even the parking at your office - giving you complete control. The Home Assistant integration allows you to trigger Fluss+ devices via Wi-Fi to open or close a connected motor device.

## Prerequisites

- A Fluss+ device (Can order here: https://fluss.io/flussplus).
- A Fluss+ account.
- The Fluss+ app installed on your smart phone.
- A Fluss+ device physically connected to your device (for example, a garage door opener).
- Fluss+ device connected to your Wi-Fi network and has internet access.
- During setup of the integration in Home Assistant, you will be prompted to input your API key.
  - You can request an API key in the Fluss+ app under your profile settings.
  - The API key will allow you to access your Fluss+ devices and trigger them through Home Assistant.

{% include integrations/config_flow.md %}

## Configuration options

The Fluss+ integration provides the following configuration option:

{% configuration_basic %}
Device icon style:
  description: Choose the icon that best represents your Fluss+ device. Options are **Gate**, **Garage**, **Door**, **Boom gate**, and **Barrier**. This changes the icon displayed for your Fluss+ entities in the dashboard. Defaults to **Garage**.
{% endconfiguration_basic %}

## Supported devices

The integration supports any Fluss+ device that has Wi-Fi capability enabled. Devices are automatically detected from your Fluss+ account. Only devices where your account has the **canUseWiFi** permission will appear in Home Assistant.

## Cover

If your Fluss+ device reports an open/close status, it will appear as a **cover** entity. You can open and close the device from the Home Assistant dashboard. The cover state (open/closed) is updated automatically via polling.

## Button

If your Fluss+ device does not report an open/close status, it will appear as a **button** entity. Pressing the button sends a trigger command to the Fluss+ device.

## Data updates

The integration polls the Fluss+ cloud API every 30 seconds to update device status.

## Known limitations

- Only devices with Wi-Fi capability enabled in the Fluss+ app are supported.
- Devices that do not report an open/close status are limited to a trigger button without state feedback.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

## Troubleshooting

### Invalid authentication

If you receive an "invalid authentication" error, verify that your API key is correct. You can regenerate your API key in the Fluss+ app under your profile settings. If your API key has been revoked or changed, Home Assistant will prompt you to re-authenticate.

### Device not appearing

Ensure that Wi-Fi is enabled for the device in the Fluss+ app and that your account has the **canUseWiFi** permission for that device.
