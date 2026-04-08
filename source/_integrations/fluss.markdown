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

The **Fluss+** {% term integration %} allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant. Fluss turns your phone into a remote key that can open your garage, your gate, your door or even the parking at your office - giving you complete control. The Home Assistant integration allows you to open and close Fluss+ devices directly from your dashboard, automations, or voice assistants - without relying solely on the Fluss+ mobile app.

## Prerequisites

- A [Fluss+ device](https://fluss.io/flussplus) physically connected to your appliance (for example, a garage door opener). See the [Fluss+ installation guide](https://support.fluss.io/support/solutions/articles/73000716043-fluss-installation-guide) for details.
- The Fluss+ app installed on your smartphone with your device claimed and connected to Wi-Fi. See the [Fluss+ app setup guide](https://support.fluss.io/support/solutions/articles/73000716042-fluss-app-setup-guide) for details.
- An API key for your Fluss+ account. See [how to get an API key](https://support.fluss.io/support/solutions/articles/73000723498-how-to-get-an-api-key-on-fluss-) for instructions.
- A Home Assistant instance set up and running.

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

If you receive an "invalid authentication" error, verify that your API key is correct. You can regenerate your API key in the Fluss+ app under your profile settings. If your API key has been revoked or changed, Home Assistant will prompt you to re-authenticate. See [how to get an API key](https://support.fluss.io/support/solutions/articles/73000723498-how-to-get-an-api-key-on-fluss-) for instructions.

### Device not appearing

Ensure that Wi-Fi is enabled for the device in the Fluss+ app and that your account has the **canUseWiFi** permission for that device. See the [Fluss+ app setup guide](https://support.fluss.io/support/solutions/articles/73000716042-fluss-app-setup-guide) for help connecting your device.
