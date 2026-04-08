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

The **Fluss+** {% term integration %} allows you to control [Fluss+](https://fluss.io/) devices through Home Assistant. Fluss turns your phone into a remote key that can open your garage, your gate, your door, or even the parking at your office — giving you complete control. The Home Assistant integration allows you to open and close Fluss+ devices directly from your dashboard, automations, or voice assistants, without relying solely on the Fluss+ mobile app.

This integration only works with Fluss+ devices connected via Wi-Fi. Devices using other connection types are not supported.

## Prerequisites

- A [Fluss+ account](https://support.fluss.io/portal/en/kb/articles/sign). See the Fluss+ sign-up guide for instructions on creating your account.
- A Fluss+ device [claimed and connected to Wi-Fi](https://support.fluss.io/portal/en/kb/articles/claiming-a-fluss) using the Fluss+ app.
- An API key for your Fluss+ account. See [Fluss+ API guide](https://support.fluss.io/portal/en/kb/articles/how-to-get-an-api-key-on-fluss-plus) for instructions.

{% include integrations/config_flow.md %}

## Configuration options

The Fluss+ integration provides the following configuration option:

{% configuration_basic %}
Device icon style:
  description: Choose the icon that best represents your Fluss+ device. Options are **Gate**, **Garage**, **Door**, **Boom gate**, and **Barrier**. This changes the icon displayed for your Fluss+ entities in the dashboard. Default: **Garage**.
{% endconfiguration_basic %}

## Supported devices

The integration supports any Fluss+ device that has Wi-Fi capability enabled. Devices are automatically detected from your Fluss+ account. Only devices where your account has the Wi-Fi permission will appear in Home Assistant.

## Button

By default, your Fluss+ device will appear as a **button** entity. Pressing the button sends a trigger command to the Fluss+ device. If you set up a sensor cable, the device will instead appear as a **cover** entity with open/close status.

## Cover

If your Fluss+ device reports an open/close status, it will appear as a **cover** entity. You can open and close the device from the Home Assistant dashboard. The cover state (open/closed) is updated automatically via polling.

To get open/close status from your Fluss+ device, you need to have a sensor cable set up. Without it, the device will not be able to report its state to Home Assistant. See the [Fluss+ sensor setup instructions](https://support.fluss.io/portal/en/kb/articles/sensor-set-up-instructions) for more information.

## Data updates

The integration polls the Fluss+ cloud API every 30 seconds to update device status.

## Known limitations

- Only devices with Wi-Fi capability enabled in the Fluss+ app are supported.
- Devices that do not report an open/close status are limited to a trigger button without state feedback.

## Troubleshooting

### Invalid authentication

If you receive an "invalid authentication" error, verify that your API key is correct. You can regenerate your API key in the Fluss+ app under your profile settings. If your API key has been revoked or changed, Home Assistant will prompt you to re-authenticate. See [Fluss+ API guide](https://support.fluss.io/portal/en/kb/articles/how-to-get-an-api-key-on-fluss-plus) for instructions.

### Device not appearing

If your Fluss+ device is not showing up in Home Assistant, the first thing to check is what type of access your account has to that device. Fluss+ supports different access types, and only accounts with Wi-Fi access permissions to the device will be able to use it in Home Assistant. See the [Fluss+ access types guide](https://support.fluss.io/portal/en/kb/articles/various-access-types) to understand which access type your account has and whether you have the right permissions for that device.

If your access type is correct but the device still does not appear, make sure the device is connected to Wi-Fi and reachable through the Fluss+ app before trying to add it to Home Assistant.

### Device losing internet connectivity

If your Fluss+ device is intermittently going unavailable in Home Assistant, it may be dropping its internet connection. See the [Fluss+ Wi-Fi disconnection troubleshooting guide](https://support.fluss.io/portal/en/kb/articles/solutions-for-wi-fi-disconnection-problems) for steps to resolve common connectivity issues.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
