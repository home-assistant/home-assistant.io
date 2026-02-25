---
title: Zinvolt
description: Instructions on how to integrate Zinvolt batteries with Home Assistant.
ha_category:
  - Energy
  - Binary Sensor
  - Sensor
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: zinvolt
ha_platforms:
  - binary_sensor
  - number
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Zinvolt** {% term integration %} allows you to monitor your [Zinvolt](https://zinvolt.com/) batteries in Home Assistant.

## Prerequisites

- A migrated Zinvolt account

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The email of your Zinvolt account"
Password:
    description: "The password of your Zinvolt account"
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Zinvolt** integration provides the following entities.

#### Binary sensors

- **Connected to grid**: Whether the battery is connected to the grid.

#### Numbers

- **Minimum charge level**: The minimum charge level of the battery in percentage.
- **Maximum charge level**: The maximum charge level of the battery in percentage.
- **Standby time**: The time in minutes that the battery remains inactive before it is automatically turned off.
- **Maximum output**: The maximum output of the battery in watts.

#### Sensors

- **State of charge**: The current state of charge of the battery in percentage.

## Data updates

The integration {% term polling polls %} the Zinvolt servers every 5 minutes to update sensor data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
