---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Number
  - Sensor
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
  - binary_sensor
  - climate
  - number
  - sensor
ha_integration_type: integration
---

The Tessie integration exposes various commands and sensors from the Tesla vehicles connected to your [Tessie](https://my.tessie.com/) account.

## Prerequisites

You must have a [Tessie](https://my.tessie.com/) account and [access token](https://my.tessie.com/settings/api).

{% include integrations/config_flow.md %}

## Entities

### Select

The integration will create a select entity to control each of the seat heaters. It allows you to set each seat heater to Off, Low, Medium, or High.

- Front Left
- Front Right
- Rear Left (if installed)
- Rear Center (if installed)
- Rear Right (if installed)
- Third Row Left (if installed)
- Third Row Right (if installed)

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
- Tire Pressure Warning Front Left
- Tire Pressure Warning Front Right
- Tire Pressure Warning Rear Left
- Tire Pressure Warning Rear Right

### Climate

The integration will create a climate entity to control the vehicles climate control system. This entity can:

- Turn on and off
- Change the drivers set temperature
- Change to one of the three keep modes: Keep, Dog, and Climate

The passenger set temperature is shown as a sensor but cannot be changed by Tessie.

### Sensor

The integration will create sensor entities for a variety of metrics that relate to your vehicles:

#### Vehicle State

- Online
- Odometer
- Tire Pressure Front Left
- Tire Pressure Front Right
- Tire Pressure Rear Left
- Tire Pressure Rear Right

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

### Number

The integration will create number entities to control:

- Charge current
- Charge limit
- Speed limit

### Switch

The integration will create switch entities to control various aspects of your vehicles:

- Charge
- Defrost mode
- Sentry mode
- Valet mode
- Steering wheel heater
