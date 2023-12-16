---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Tessie integration displays various sensors from the vehicles in your [Tessie](https://my.tessie.com/) account.

## Prerequisites

You must have a [Tessie](https://my.tessie.com/) account and [access token](https://my.tessie.com/settings/api).

{% include integrations/config_flow.md %}

## Entities

### Binary Sensor

The integration will create binary sensor entities for a variety of metrics that relate to your vehicles: 

#### Charge State
- Battery Heater
- Battery Charing
- Preconditioning Enabled
- Scheduled Charging Enabled
- Trip Charging Enabled

#### Climate State
- Auto Seat Climate Left
- Auto Seat Climate Right
- Auto Steering Wheel Climate
- Overheat Protection Enabled
- Overheat Protection Running

#### Vehicle State
- Dashcam Recording
- User Present
- Tyre Preasure Warning Front Left
- Tyre Preasure Warning Front Right
- Tyre Preasure Warning Rear Left
- Tyre Preasure Warning Rear Right

### Sensor

The integration will create sensor entities for a variety of metrics that relate to your vehicles:

#### Vehicle State
- Online
- Odometer
- Tyre Pressure Front Left
- Tyre Pressure Front Right
- Tyre Pressure Rear Left
- Tyre Pressure Rear Right

#### Charge State
- Battery Level
- Change Energy Added
- Change Power
- Charge Voltage
- Charger Current
- Change Rate
- Battery Range

#### Drive State
- Speed
- Power
- Shift State

### Climate State
- Inside Temperature
- Outside Temperature
- Driver Temperature Setting
- Passenger Temperature Setting
