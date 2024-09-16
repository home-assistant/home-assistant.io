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
