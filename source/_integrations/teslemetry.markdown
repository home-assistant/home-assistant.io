---
title: Teslemetry
description: Instructions on how to integrate Teslemetry within Home Assistant.
ha_category:
  - Climate
  - Sensor
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: teslemetry
ha_platforms:
  - climate
  - sensor
ha_integration_type: integration
---

The Teslemetry integration exposes various commands and sensors from the Tesla vehicles connected to a [Teslemetry](https://teslemetry.com/) subscription.

## Prerequisites

You must have a [Teslemetry](https://teslemetry.com/) account and [access token](https://teslemetry.com/console).

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity to control the vehicle's climate control system. This entity can:

- Turn on and off
- Change the set temperature
- Change to one of the four modes: Off, Keep mode, Dog mode, and Camp mode 

### Sensor

The integration will create sensor entities for a variety of metrics that relate to your vehicles, energy sites, and Wall Connectors:

#### Energy sites
- Battery power
- Energy left
- Generator power (disabled by default)
- Grid power
- Grid services power
- Load power
- Percentage charged
- Solar power
- Total pack energy (disabled by default)

#### Vehicles
- Battery level
- Battery power
- Battery range
- Charge cable
- Charge energy added
- Charge rate (disabled by default)
- Charging
- Charger power
- Charger voltage
- Charger current
- Destination
- Distance to arrival
- Driver temperature setting (disabled by default)
- Estimate battery range (disabled by default)
- Fast charger type
- Ideal battery range (disabled by default)
- Inside temperature
- Odometer (disabled by default)
- Online
- Outside temperature
- Passenger temperature setting (disabled by default)
- Power (disabled by default)
- Shift state (disabled by default)
- Speed (disabled by default)
- State of charge at arrival (disabled by default)
- Time to arrival
- Time to full charge
- Tire pressure front left (disabled by default)
- Tire pressure front right (disabled by default)
- Tire pressure rear left (disabled by default)
- Tire pressure rear right (disabled by default)
- Traffic delay (disabled by default)
- Usable battery level (disabled by default)

#### Wall connectors
- Fault state code (disabled by default)
- Power
- State code (disabled by default)
- Vehicle
