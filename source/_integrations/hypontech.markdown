---
title: Hypontech Cloud
description: Instructions on how to integrate Hypontech Cloud solar inverters within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jcisio'
ha_domain: hypontech
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Hypontech Cloud** {% term integration %} allows you to monitor your Hypontech solar inverter system through the [Hypontech Cloud](https://www.hypon.cloud) platform and integrate the data into your Home Assistant installation.

## Supported devices

This integration supports all Hypontech inverters and micro inverters that are connected to the Hypontech Cloud platform.

## Prerequisites

To use this integration, you need:

- A Hypontech Cloud account with access to your solar inverter system
- Your Hypontech Cloud username and password

{% include integrations/config_flow.md %}

To set up the integration, you need the following information:

{% configuration_basic %}
Username:
  description: "Your Hypontech Cloud account username."
Password:
  description: "Your Hypontech Cloud account password."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides one **Plant** device for each location (for example: Balcony, Garden, Home, Office) and one **Overview** (aggregation) device. Each has the following sensors:

- **Power** (W): Current power production from your solar system
- **Today energy** (kWh): Total energy produced today
- **Lifetime energy** (kWh): Total energy produced since installation

All sensors are updated every minute.

## Data updates

The integration polls data from the Hypontech Cloud every 60 seconds.

## Actions

This integration provides no additional actions.

## Known limitations

- The integration currently displays aggregated data for all inverters in your account as a single "Overview" device.
- Individual inverter data is not yet available.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
