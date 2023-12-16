---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
ha_platforms:
  - climate
  - sensor
ha_integration_type: integration
---

The Tessie integration exposes various commands and sensors from the Tesla vehicles connected to your [Tessie](https://my.tessie.com/) account.

## Prerequisites

You must have a [Tessie](https://my.tessie.com/) account and [access token](https://my.tessie.com/settings/api).

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity to control the vehicles climate control system. This entity can:

- Turn on and off
- Change the drivers set temperature
- Change to one of the three keep modes: Keep, Dog, and Climate

The passengers set temp is shown as a sensor, but cannot be changed by Tessie.

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
