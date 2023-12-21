---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
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

- Front left
- Front right
- Rear left (if installed)
- Rear center (if installed)
- Rear right (if installed)
- Third row left (if installed)
- Third row right (if installed)

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