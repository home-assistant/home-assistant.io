---
title: Ohme
description: Instructions to configure the Ohme integration into Home Assistant.
ha_category:
  - Sensor
  - Car
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@dan-r'
ha_config_flow: true
ha_domain: ohme
ha_platforms:
  - sensor
  - button
---

The **Ohme** {% term integration %} allows you to connect your [Ohme](https://ohme-ev.com/) EV charger to Home Assistant.


## Prerequisites

- A compatible charger. This integration has been tested with:
  - Ohme Home Pro
  - Ohme Home
  - Ohme Go
  - Ohme ePod

{% include integrations/config_flow.md %}
{% configuration_basic %}
Email:
    description: "Email to log in to your Ohme account."
    required: true
    type: string
Password:
    description: "Password to log in to your Ohme account."
    required: true
    type: string
{% endconfiguration_basic %}

## Third party accounts
If you signed up to Ohme with a third party account like Google, you will need to [reset your password](https://api.ohme.io/fleet/index.html#/authentication/forgotten-password) before configuring this integration.


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Sensor

The {% term integration %} provides the following sensors:

- **Status** - Current status of the charger. Possible states: `Unplugged`, `Pending approval`, `Plugged in`, `Charging`
- **Power**
- **Current**
- **Energy**
- **CT current** - If a current transformer (CT) was installed with your charger, this will show the current used by your whole home

## Button

The {% term integration %} provides the following button:

- **Approve charge** - If sensor **Status** is `Pending approval`, this will approve the charge
