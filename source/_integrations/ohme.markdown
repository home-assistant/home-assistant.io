---
title: Ohme
description: Instructions to configure the Ohme integration into Home Assistant.
ha_category:
  - Car
  - Sensor
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@dan-r'
ha_config_flow: true
ha_domain: ohme
ha_platforms:
  - button
  - sensor
ha_quality_scale: silver
ha_integration_type: device
---

The **Ohme** {% term integration %} allows you to connect your [Ohme](https://ohme-ev.com/) EV charger to Home Assistant.


## Prerequisites

- Ah Ohme account. If you signed up to Ohme with a third party account like Google, you will need to [reset your password](https://api.ohme.io/fleet/index.html#/authentication/forgotten-password) before configuring this integration.


## Supported devices

The following devices are known to be supported by the integration:
- Ohme Home Pro
- Ohme Home
- Ohme Go
- Ohme ePod


{% include integrations/config_flow.md %}
{% configuration_basic %}
Email:
    description: "Email to log in to your Ohme account."
Password:
    description: "Password to log in to your Ohme account."
{% endconfiguration_basic %}


## Supported functionality

### Entities

The Ohme integration provides the following entities.

#### Buttons

- **Approve charge**
  - **Description**: If sensor **Status** is `Pending approval`, this will approve the charge.
  - **Available for devices**: all

#### Sensors

- **Status**
  - **Description**: Current status of the charger. Possible states: `Unplugged`, `Pending approval`, `Plugged in`, `Charging`.
  - **Available for devices**: all
- **Power**
  - **Description**: Power draw from the charger in kW.
  - **Available for devices**: all
- **Current**
  - **Description**: Current draw from the charger in amperes.
  - **Available for devices**: all
- **Energy**
  - **Description**: Energy consumption of the charger in kWh.
  - **Available for devices**: all
- **CT current**
  - **Description**: If a current transformer (CT) was installed with your charger, this will show the current used by your whole home.
  - **Available for devices**: Home Pro, ePod


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
