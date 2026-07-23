---
title: Beatbot
description: Instructions on how to integrate Beatbot pool cleaning devices with Home Assistant.
ha_category:
  - Binary sensor
  - Select
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Cloud Push
ha_release: 2026.8
ha_config_flow: true
ha_codeowners:
  - '@dddddl'
ha_domain: beatbot
ha_platforms:
  - binary_sensor
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Beatbot** {% term integration %} connects supported Beatbot pool cleaning devices to Home Assistant by using the Beatbot cloud service. You can monitor the device, select a cleaning mode, and control supported cleaning actions.

## Supported devices

This integration supports Beatbot pool cleaners and cleaning base stations that you can add to the Beatbot app.

## Prerequisites

1. Add your pool cleaner or cleaning base station to the Beatbot app.
2. Make sure you can sign in to the Beatbot account that owns the device.

The integration supports Beatbot accounts worldwide. Home Assistant automatically connects to the regional Beatbot cloud service for your account.

{% include integrations/config_flow.md %}

During setup, Home Assistant opens the Beatbot authorization page. Sign in with your Beatbot account and authorize Home Assistant to access your devices.

## Supported functionality

The entities available for a device depend on the capabilities reported by that device.

- **Vacuum**: Start or pause cleaning and return the cleaner to its base.
- **Binary sensor**: View the device connection and charging states.
- **Sensor**: View the battery level, work status, and active error.
- **Select**: Select a supported cleaning mode.
- **Switch**: Control supported settings, such as child lock and voice do-not-disturb mode.

The device firmware version is shown on the device page.

## Data updates

The integration receives device state changes from the Beatbot cloud service. It also refreshes data every 10 minutes to discover device changes and recover updates that might have been missed.

## Troubleshooting

### The device is not shown

Confirm that the device is available in the Beatbot app and belongs to the account used during authorization. Devices that do not report a supported product type are not added to Home Assistant.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
