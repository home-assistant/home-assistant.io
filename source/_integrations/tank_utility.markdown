---
title: Tank Utility
description: How to integrate Tank Utility propane tank monitors within Home Assistant.
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.53
ha_codeowners:
  - '@krismolendyke'
ha_domain: tank_utility
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: hub
ha_quality_scale: legacy
---

The **Tank Utility** {% term integration %} integrates [Tank Utility](https://www.tankutility.com/) propane tank monitors into Home Assistant, allowing you to track tank levels and monitor fuel usage.

## Prerequisites

You need a Tank Utility account with your propane tank monitors already set up in the [Tank Utility app](https://app.tankutility.com).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: "The email address for your [Tank Utility](https://app.tankutility.com) account."
Password:
  description: "The password for your [Tank Utility](https://app.tankutility.com) account."
{% endconfiguration_basic %}

## Supported functionality

The **Tank Utility** integration automatically discovers all monitors registered to your account and provides a device for each monitor.

### Sensors

Each monitor provides a sensor {% term entity %} that reports the current tank level as a percentage (`%`), rounded to 1 decimal place.

The sensor also includes the following extra state attributes when provided by the API:

- `name`: The name of the tank monitor.
- `address`: The service address associated with the monitor.
- `capacity`: The capacity of the tank.
- `fuelType`: The type of fuel in the tank (for example, `propane`).
- `orientation`: The orientation of the tank (for example, `horizontal` or `vertical`).
- `status`: The current status of the monitor.
- `time`: The timestamp of the last reading (Unix epoch in milliseconds).
- `time_iso`: The ISO 8601 formatted timestamp of the last reading.

## Data updates

The **Tank Utility** integration {% term polling polls %} data from the Tank Utility cloud service once every hour.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
