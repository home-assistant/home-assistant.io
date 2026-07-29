---
title: Beatbot
description: Instructions on how to integrate Beatbot pool cleaning devices with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 2026.8
ha_config_flow: true
ha_codeowners:
  - '@dddddl'
ha_domain: beatbot
ha_platforms:
  - vacuum
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Beatbot** {% term integration %} connects supported Beatbot pool cleaning devices to Home Assistant by using the Beatbot cloud service. You can view the cleaning state and control supported cleaning actions.

## Supported devices

This integration supports verified Beatbot pool cleaner models. Support is limited to models whose product identifier is included in the integration's built-in allowlist. A device being available in the Beatbot app does not necessarily mean that its model is supported by Home Assistant.

## Prerequisites

1. Add your pool cleaner to the Beatbot app.
2. Make sure you can sign in to the Beatbot account that owns the device.

The integration supports Beatbot accounts worldwide. Home Assistant automatically connects to the regional Beatbot cloud service for your account.

{% include integrations/config_flow.md %}

During setup, Home Assistant opens the Beatbot authorization page. Sign in with your Beatbot account and authorize Home Assistant to access your devices.

## Supported functionality

The features available for a device depend on the capabilities reported by that device.

- **Vacuum**: Start or pause cleaning and return the cleaner to its base.

The device firmware version is shown on the device page.

## Data updates

The integration receives device state changes from the Beatbot cloud service. It also refreshes data every 10 minutes to discover device changes and recover updates that might have been missed.

## Troubleshooting

### The device is not shown

Confirm that the device is available in the Beatbot app and belongs to the account used during authorization. Home Assistant does not add devices whose product category or product identifier is not on the verified support list.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
