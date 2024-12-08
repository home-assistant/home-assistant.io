---
title: Autarco
description: Instructions on how to integrate Autarco solar system within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: autarco
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

The **Autarco** {% term integration %} allows you to gather data from the cloud API of [Autarco](https://www.autarco.com) and use it in Home Assistant.

Autarco is a Dutch company that provides solar panels, inverters and batteries. They have their own cloud platform where you can monitor the performance of your system.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address of your Autarco account.
Password:
  description: The password of your Autarco account.
{% endconfiguration_basic %}

## Data updates

The integration will poll the Autarco API every 5 minutes to update the data in Home Assistant.

## Sensors

The Autarco platform mainly provides sensors that you can use in your [energy dashboard](/energy).

### Solar

Gain insight into how much solar energy your site produces.

- Power production (W)
- Energy production today (kWh)
- Energy production this month (kWh)
- Energy production total (kWh)

### Inverters

Gain insight into how much energy an inverter produces. The integration will create a device for each inverter linked to your account.

- AC output power (W)
- AC output energy total (kWh)

### Battery

If you have a battery connected to your system, you can monitor the battery status and see how much energy it charges or discharges.

- Power flow (W) - Positive values indicate charging, negative values indicate discharging
- State of charge (%)
- Discharged energy today (kWh)
- Discharged energy this month (kWh)
- Discharged energy total (kWh)
- Charged energy today (kWh)
- Charged energy this month (kWh)
- Charged energy total (kWh)

## Remove integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
