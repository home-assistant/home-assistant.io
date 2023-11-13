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

- charge_power: Current power charging your vehicle.
- charge_energy: Energy transferred to your car during the current charging session.
- charge_time: Time spent in the current charging session.
- house_power: Power consumed by your household. This data is available if you installed and configured the settings in the V2C app for the <abbr title="current transformer">CT</abbr> clamp that was supplied with your <abbr title="electric vehicle support equipment">EVSE</abbr>).
- fv_power: Power produced by your photovoltaic system. This data is available if you installed and configured the settings in the V2C app for the <abbr title="current transformer">CT</abbr> clamp that was supplied with your <abbr title="electric vehicle support equipment">EVSE</abbr>).
