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
  - sensor
ha_integration_type: hub
---

The `whirlpool` integration integrates Whirlpool 6th Sense Live, and Whirlpool/Maytag Washer and Dryer appliances into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Supported hardware](#supported-hardware)
- [Sensor](#sensor)
- [Climate](#climate)

## Supported hardware

The following air conditioners are confirmed to be working, but other models that use the 6th Sense Live application may also work:

Climate:

- SPIW309A2WF/SPIW312A2WF
- SPIW409A2WF

Washer:

- WTW6120HW2

Dryer:

- Not confirmed

{% include integrations/config_flow.md %}

## Sensor

The `whirlpool` sensor platform integrates Whirlpool Washer and Dryer systems into Home Assistant, allowing views of the machine state, time remaining and the "wash & go" tank fill status as sensors for each device.

## Climate

The `whirlpool` climate platform integrates Whirlpool air conditioning systems into Home Assistant, allowing control of the appliance trough the user interface. The current inside temperature is also displayed on the thermostat card.

The following services are also available:

- [**set_hvac_mode**](/integrations/climate/#service-climateset_hvac_mode) (`off`, `heat`, `cool`, `fan_only`)
- [**target temperature**](/integrations/climate#service-climateset_temperature)
- [**turn on/off**](/integrations/climate#service-climateturn_on)
- [**fan mode**](/integrations/climate#service-climateset_fan_mode) (`low`, `medium`, `high`)
- [**swing mode**](/integrations/climate#service-climateset_swing_mode) (`off`, `horizontal`)
