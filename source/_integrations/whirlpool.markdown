---
title: Whirlpool Appliances
description: Instructions on how to integrate Whirlpool appliances with Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: '2022.10'
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@abmantis'
  - '@mkmer'
ha_domain: whirlpool
ha_platforms:
  - climate
  - diagnostics
  - sensor
ha_integration_type: hub
---

The **Whirlpool Appliances** {% term integration %} integrates Whirlpool 6th Sense Live, and Whirlpool/Maytag Washer and Dryer appliances into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Supported hardware](#supported-hardware)
- [Sensor](#sensor)
- [Climate](#climate)

## Supported hardware

The following appliances are confirmed to be working, but other models that use the 6th Sense Live application may also work:

Climate:

- Whirlpool SPIW309A2WF / SPIW312A2WF
- Whirlpool SPIW409A2WF

Washer:

- Whirlpool WTW6120HW2
- Whirlpool WTW8127LW1
- Maytag MHW8630HW0

Dryer:

- Whirlpool WGD8127LW3

{% include integrations/config_flow.md %}

## Sensor

The `whirlpool` sensor platform integrates Whirlpool Washer and Dryer systems into Home Assistant, allowing views of the machine state, time remaining and the "wash & go" tank fill status as sensors for each device.

## Climate

The `whirlpool` climate platform integrates Whirlpool air conditioning systems into Home Assistant, allowing control of the appliance trough the user interface. The current inside temperature is also displayed on the thermostat card.

The following actions are also available:

- [**set_hvac_mode**](/integrations/climate/#action-climateset_hvac_mode) (`off`, `heat`, `cool`, `fan_only`)
- [**target temperature**](/integrations/climate#action-climateset_temperature)
- [**turn on/off**](/integrations/climate#action-climateturn_on)
- [**fan mode**](/integrations/climate#action-climateset_fan_mode) (`low`, `medium`, `high`)
- [**swing mode**](/integrations/climate#action-climateset_swing_mode) (`off`, `horizontal`)
