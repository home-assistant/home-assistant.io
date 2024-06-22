---
title: Teslemetry
description: Instructions on how to integrate Teslemetry within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device tracker
  - Lock
  - Media player
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: teslemetry
ha_quality_scale: platinum
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - update
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
|Binary sensor|Battery heater|No|
|Binary sensor|Cabin overheat protection actively cooling|No|
|Binary sensor|Charge cable|Yes|
|Binary sensor|Charger has multiple phases|No|
|Binary sensor|Dashcam|No|
|Binary sensor|Front driver door|Yes|
|Binary sensor|Front driver window|Yes|
|Binary sensor|Front passenger door|Yes|
|Binary sensor|Front passenger window|Yes|
|Binary sensor|Preconditioning enabled|No|
|Binary sensor|Preconditioning|No|
|Binary sensor|Rear driver door|Yes|
|Binary sensor|Rear driver window|Yes|
|Binary sensor|Rear passenger door|Yes|
|Binary sensor|Rear passenger window|Yes|
|Binary sensor|Scheduled charging pending|No|
|Binary sensor|Status|Yes|
|Binary sensor|Tire pressure warning front left|No|
|Binary sensor|Tire pressure warning front right|No|
|Binary sensor|Tire pressure warning rear left|No|
|Binary sensor|Tire pressure warning rear right|No|
|Binary sensor|Trip charging|No|
|Binary sensor|User present|Yes|
|Button|Flash lights|Yes|
|Button|Homelink|Yes|
|Button|Honk horn|Yes|
|Button|Keyless driving|Yes|
|Button|Play fart|Yes|
|Button|Wake|Yes|
|Climate|Cabin overheat protection|Yes|
|Climate|Climate|Yes|
|Device tracker|Location|Yes|
|Device tracker|Route|Yes|
|Cover|Charge port door|Yes|
|Cover|Frunk|Yes|
|Cover|Trunk|Yes|
|Cover|Vent windows|Yes|
|Lock|Charge cable lock|Yes|
|Lock|Lock|Yes|
|Lock|Speed limit|Yes|
|Media player|Media player|Yes|
|Number|Charge current|Yes|
|Number|Charge limit|Yes|
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
|Switch|Auto seat climate left|Yes|
|Switch|Auto seat climate right|Yes|
|Switch|Auto steering wheel heater|Yes|
|Switch|Charge|Yes|
|Switch|Defrost|Yes|
|Switch|Sentry mode|Yes|
|Update|Update|Yes|

### Energy sites

|Domain|Name|Enabled|
|---|---|---|
|Binary sensor|Backup capable|Yes|
|Binary sensor|Grid services active|Yes|
|Binary sensor|Grid services enabled|Yes|
|Number|Backup reserve|Yes|
|Number|Off grid reserve|Yes|
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
|Switch|Allow charging from grid|Yes|
|Switch|Storm watch|Yes|

### Wall connector

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Fault state|No|
|Sensor|Power|Yes|
|Sensor|State|Yes|
|Sensor|Vehicle|Yes|

## Vehicle sleep

Constant API polling will prevent most Model S and Model X vehicles manufactured before 2021 from sleeping, so the Teslemetry integration will stop polling these vehicles for 15 minutes, after 15 minutes of inactivity. You can call the `homeassistant.update_entity` service to force polling the API, which will reset the timer.
