---
title: Nintendo Switch Parental Controls
description: The Nintendo Switch Parental Controls integration allows you to monitor and control screentime for children via the Nintendo Switch Parental Controls service.
ha_release: 2025.11
ha_iot_class: cloud_polling
ha_codeowners:
  - '@pantherale0'
ha_domain: nintendo_parental
ha_integration_type: integration
ha_platforms:
  - sensor
---


The **Nintendo Switch Parental Controls** {% term integration %} integrates with the Nintendo Switch Parental Controls service, allowing parents to monitor and control screentime for their children.

## Supported devices

Devices supported by the Nintendo Switch Parental Controls mobile app are supported by this integration.

## Prerequisites

To use the Nintendo Switch Parental Controls integration, you must access your Nintendo account's authentication tokens. This process must be performed on a device **without** the official Nintendo Switch Parental Controls mobile app installed. The integration needs to intercept the authentication flow, which the app typically handles automatically.

You will need:
- Your Nintendo account credentials.
- A computer or mobile device without the official app installed.

## Configuration

{% include integrations/config_flow.md %}

## Supported functionality

### Entities

The **Nintendo Switch Parental Controls** integration provides the following entities.

#### Sensors

- **Used screen time**
  - **Description**: The current used screen time for a given device.
  - **Unit of measurement**: `minutes`
  - **Device class**: `duration`
- **Time remaining**
  - **Description**: The amount total amount of time remaining for a device.
  - **Unit of measurement**: `minutes`
  - **Device class**: `duration`

## Known limitations

The integration currently does not provide all the functionality found in the mobile app. Future updates will see this extended.

Further, this integration relies on the cloud and cannot make a local connection to your Switch.

## Troubleshooting

### Data is not updating in Home Assistant

Make sure the Switch has access to the internet, without this, usage data is not being sent to Nintendo.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
