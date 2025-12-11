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
  - binary_sensor
  - diagnostics
  - number
  - sensor
  - switch
ha_integration_type: integration
---

The V2C integration allows monitoring and control of a local [V2C](https://v2charge.com/trydan/) Trydan EVSE in Home Assistant.

There is currently support for the following platforms within Home Assistant:

- [Sensor](#sensor)
- [Binary sensor](#binary-sensor)
- [Number](#number)
- [Switch](#switch)

## Prerequisites

To configure the V2C integration you will need to enter the IP address of your Trydan EVSE.

{% include integrations/config_flow.md %}

## Binary Sensor

The V2C integration currently exposes the following binary sensors:

- connected: indicates if the EVSE is connected to the car
- charging: indicates an ongoing charging session
- ready: indicates you may disconnect from the car

## Sensor

The V2C integration currently exposes the following sensors:

- charge_power: Current power charging your vehicle.
- charge_energy: Energy transferred to your car during the current charging session.
- charge_time: Time spent in the current charging session.
- meter_error: Information from the EVSE on errors associated with the dynamic power control mode. It can be ignored when this mode is not used.
- house_power: Power consumed by your household. This data is available if you installed and configured the settings in the V2C app for the <abbr title="current transformer">CT</abbr> clamp that was supplied with your <abbr title="electric vehicle supply equipment">EVSE</abbr>).
- fv_power: Power produced by your photovoltaic system. This data is available if you installed and configured the settings in the V2C app for the <abbr title="current transformer">CT</abbr> clamp that was supplied with your <abbr title="electric vehicle supply equipment">EVSE</abbr>).
- battery_power: Power directed to a home battery. This data is available if you installed and configured the settings in the V2C app for the <abbr title="current transformer">CT</abbr> clamp that was supplied with your <abbr title="electric vehicle supply equipment">EVSE</abbr>).

## Number

The V2C integration currently exposes the following number entity:

- intensity: current used to charge your vehicle

## Switch

The V2C integration currently exposes the following switches:

- pause session: pause the charging session
- lock EVSE: disables the EVSE
- charge point timer: only allow charging during predefined period (set on the mobile application)
- dynamic intensity modulation: enable dynamic intensity modulation
- pause dynamic control modulation: paused the dynamic control modulation
