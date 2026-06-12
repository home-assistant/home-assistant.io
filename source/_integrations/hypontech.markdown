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

This integration supports all inverters and microinverters connected to the Hypontech Cloud platform, including devices from Hypontech as well as third-party manufacturers like Nexen.

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
Manufacturer:
  description: "The manufacturer (OEM), Hypontech by default."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

The integration provides one **Plant** device for each location (e.g., Balcony, Garden, Home, Office) and one **Overview** (aggregation) device. It is recommended to avoid using the Overview device, as plants can be shared between accounts or temporarily added to your profile, which may lead to inaccurate data aggregation.

Plant and Overview has the following sensors:

- **Total power** (W): Current power production from your solar systems and batteries
- **Today energy** (kWh): Total energy produced today
- **Lifetime energy** (kWh): Total energy produced since installation

Plant also have other sensors:

- **PV power** (W): Current power production from solar system
- **Load power** (W): Current power used by your home, if there is a sensor in your installation
- **Grid power** (W): Current power load from grid (can be negative), if there is a sensor in your installation

If a plant has batteries, it also have other sensors:

- **Battery power** (W): Current discharging power, if negative, the batteries are charging
- **Battery state of charge** (percentage): Current state of charge of the batteries

All sensors are updated every minute.

## Data updates

The integration polls data from the Hypontech Cloud every 60 seconds.

## Actions

This integration provides no additional actions.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
