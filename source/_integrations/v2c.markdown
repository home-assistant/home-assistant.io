---
title: V2C 
description: Instructions on how to integrate V2C Trydan EVSE with Home Assistant.
ha_category:
  - Car
ha_release: '2023.12'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@dgomes'
ha_domain: v2c
ha_platforms:
  - sensor
ha_integration_type: integration
---

The V2C integration allows monitoring of local [V2C](https://v2c.com) Trydan EVSE in Home Assistant.

There is currently support for the following device platforms within Home Assistant:

- [Sensor](#sensor)

## Prerequisites

To configure the V2C integration you will need to enter the IP address of your Trydan EVSE.

{% include integrations/config_flow.md %}

## Sensor

The V2C integration currently exposes the follow sensors:

- charge_power: current power charging your vehicle
- charge_energy: energy transfered to your car during the current charging session
- charge_time: time spent in the current charging session
- house_power: power consumed by your household (you need to install and configure through the V2C App the CT supplied with your EVSE)
- house_power: power produced by your photovoltaic system (you need to install and configure through the V2C App the CT supplied with your EVSE)