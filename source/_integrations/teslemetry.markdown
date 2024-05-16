---
title: Teslemetry
description: Instructions on how to integrate Teslemetry within Home Assistant.
ha_category:
  - Car
  - Climate
  - Media player
  - Sensor
  - Select
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: teslemetry
ha_platforms:
  - climate
  - diagnostics
  - media_player
  - select
  - sensor
ha_integration_type: integration
---

The Teslemetry integration exposes various commands and sensors from the Tesla vehicles and energy sites connected to a [Teslemetry](https://teslemetry.com/) subscription.

## Prerequisites

You must have a [Teslemetry](https://teslemetry.com) account, active subscription, and [access token](https://teslemetry.com/console).

Vehicles delivered in 2024 and later will require a [virtual key](https://teslemetry.com/docs/topics/virtualkey) to be configured in order to run certain commands.

{% include integrations/config_flow.md %}

## Entities

These are the entities available in the Teslemetry integration. Not all entities are enabled by default, and not all values are always available.

### Vehicles

|Domain|Name|Enabled|
|---|---|---|
|Climate|Cabin overheat protection|Yes|
|Climate|Climate|Yes|
|Media player|Media player|Yes|
|Select|Seat heater front left|Yes|
|Select|Seat heater front right|Yes|
|Select|Seat heater rear center|No|
|Select|Seat heater rear left|No|
|Select|Seat heater rear right|No|
|Select|Seat heater third row left|No|
|Select|Seat heater third row right|No|
|Select|Steering wheel heater|Yes|
|Sensor|Battery level|Yes|
|Sensor|Battery range|Yes|
|Sensor|Charge cable|No|
|Sensor|Charge energy added|Yes|
|Sensor|Charge rate|Yes|
|Sensor|Charger current|Yes|
|Sensor|Charger power|Yes|
|Sensor|Charger voltage|Yes|
|Sensor|Charging|Yes|
|Sensor|Distance to arrival|Yes|
|Sensor|Driver temperature setting|No|
|Sensor|Estimate battery range|No|
|Sensor|Exterior color|No|
|Sensor|Fast charger type|No|
|Sensor|Ideal battery range|No|
|Sensor|Inside temperature|Yes|
|Sensor|Odometer|No|
|Sensor|Outside temperature|Yes|
|Sensor|Passenger temperature setting|No|
|Sensor|Power|No|
|Sensor|Roof color|No|
|Sensor|Scheduled charging mode|No|
|Sensor|Scheduled charging start time|No|
|Sensor|Scheduled departure time|No|
|Sensor|Shift state|No|
|Sensor|Speed|No|
|Sensor|State of charge at arrival|No|
|Sensor|Time at arrival|Yes|
|Sensor|Time at full charge|Yes|
|Sensor|Time to arrival|Yes|
|Sensor|Time to arrival|Yes|
|Sensor|Time to full charge|Yes|
|Sensor|Time to full charge|Yes|
|Sensor|Tire pressure front left|No|
|Sensor|Tire pressure front right|No|
|Sensor|Tire pressure last measured front left|No|
|Sensor|Tire pressure last measured front right|No|
|Sensor|Tire pressure last measured rear left|No|
|Sensor|Tire pressure last measured rear right|No|
|Sensor|Tire pressure rear left|No|
|Sensor|Tire pressure rear right|No|
|Sensor|Traffic delay|No|
|Sensor|Usable Battery level|No|

### Energy sites

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Battery power|Yes|
|Sensor|Energy left|Yes|
|Sensor|Generator power|No|
|Sensor|Grid power|Yes|
|Sensor|Grid services power|Yes|
|Sensor|Island status|Yes|
|Sensor|Load power|Yes|
|Sensor|Percentage charged|Yes|
|Sensor|Solar power|Yes|
|Sensor|Total pack energy|No|
|Sensor|VPP backup reserve|Yes|
|Sensor|Version|Yes|

### Wall connector

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Fault state|No|
|Sensor|Power|Yes|
|Sensor|State|Yes|
|Sensor|Vehicle|Yes|