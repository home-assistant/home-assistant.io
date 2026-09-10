---
title: Meater
description: Instructions on how to integrate the Meater Temperature Probe within Home Assistant.
ha_category:
  - Sensor
ha_release: 2022.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Sotolotl'
  - '@emontnemery'
ha_domain: meater
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
---

The **Meater** {% term integration %} allows for communicating with the [Meater Temperature Probe](https://meater.com/) from Apption Labs.

{% include integrations/config_flow.md %}

Once configuration is complete, probes will be added as soon as they're seen by Home Assistant. They will be marked unavailable when the probes are disconnected from Meater Cloud.

## Supported functionality

The **Meater** integration provides the following entities for each probe.

### Sensors

- **Ambient temperature**
  - **Description**: Ambient temperature reported by the probe.
  - **Device class**: temperature

- **Internal temperature**
  - **Description**: Temperature measured at the probe tip.
  - **Device class**: temperature

- **Cooking**
  - **Description**: Name of the selected meat, or the custom name set in the Meater app.
  - **Remarks**: Unavailable while no cook is in progress.

- **Cook state**
  - **Description**: State of the current cook, such as **Not started**, **Started**, **Resting**, or **Finished**.
  - **Device class**: enum
  - **Remarks**: Unavailable while no cook is in progress.

- **Target temperature**
  - **Description**: Target temperature of the current cook.
  - **Device class**: temperature
  - **Remarks**: Unavailable while no cook is in progress.

- **Peak temperature**
  - **Description**: Peak temperature of the current cook.
  - **Device class**: temperature
  - **Remarks**: Unavailable while no cook is in progress.

- **Time remaining**
  - **Description**: Timestamp at which the current cook is expected to finish, not the remaining duration.
  - **Device class**: timestamp
  - **Remarks**: Unavailable while no cook is in progress.

- **Time elapsed**
  - **Description**: Timestamp at which the current cook started, not the elapsed duration.
  - **Device class**: timestamp
  - **Remarks**: Unavailable while no cook is in progress.

## Troubleshooting

Devices will only be returned from the Meater Cloud API after the following criteria are met. There may be a delay between the Meater Cloud seeing your device and it being returned by the API.

- Device must be seen by the Meater Cloud. Ensure you've completed a cook while connected to Meater Cloud.
- The Meater app or Block must have an active Bluetooth connection with the device.
- The Meater app or Block must have an active Meater Cloud connection.
