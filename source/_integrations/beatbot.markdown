---
title: Beatbot
description: Instructions on how to integrate Beatbot pool cleaning devices with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Push
ha_release: 2026.8
ha_config_flow: true
ha_codeowners:
  - '@dddddl'
ha_domain: beatbot
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Beatbot** {% term integration %} connects supported Beatbot pool cleaning devices to Home Assistant by using the Beatbot cloud service. You can view the cleaning status, battery level, and active error.

## Supported devices

This integration supports Beatbot pool cleaner devices linked to your Beatbot account. The initial Home Assistant integration does not expose cleaning base stations or other device categories.

## Prerequisites

1. Add your pool cleaner to the Beatbot app.
2. Make sure you can sign in to the Beatbot account that owns the device.

The integration supports Beatbot accounts worldwide. Home Assistant automatically connects to the regional Beatbot cloud service for your account.

{% include integrations/config_flow.md %}

During setup, Home Assistant opens the Beatbot authorization page. Sign in with your Beatbot account and authorize Home Assistant to access your devices.

## Supported functionality

The integration provides these diagnostic sensors for each supported pool cleaner:

- **Status**: The cleaner's current operating state.
- **Battery**: The cleaner's current battery level.
- **Error**: The cleaner's current error, or none when there is no active error.

Cleaning controls are not exposed in the initial integration because supported capabilities vary by model.

The device firmware version is shown on the device page.

## Data updates

The integration receives device state changes from the Beatbot cloud service. It also refreshes data every 10 minutes to discover device changes and recover updates that might have been missed.

## Troubleshooting

### The device is not shown

Confirm that the device is available in the Beatbot app, belongs to the account used during authorization, and is reported as a pool cleaner.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
