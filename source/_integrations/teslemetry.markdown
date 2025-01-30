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
|Binary sensor|Automatic blind spot camera|No|
|Binary sensor|Automatic emergency braking off|No|
|Binary sensor|Battery heater|No|
|Binary sensor|Blind spot collision warning chime|No|
|Binary sensor|BMS full charge|No|
|Binary sensor|Brake pedal|No|
|Binary sensor|Cabin overheat protection actively cooling|No|
|Binary sensor|Charge cable|Yes|
|Binary sensor|Charge port cold weather mode|No|
|Binary sensor|Charger has multiple phases|No|
|Binary sensor|Dashcam|No|
|Binary sensor|DC DC|No|
|Binary sensor|Drive rail|No|
|Binary sensor|Driver seat belt|No|
|Binary sensor|Driver seat occupied|No|
|Binary sensor|Emergency lane departure avoidance|No|
|Binary sensor|Europe vehicle|No|
|Binary sensor|Fast charger present|No|
|Binary sensor|Front driver door|Yes|
|Binary sensor|Front driver window|Yes|
|Binary sensor|Front passenger door|Yes|
|Binary sensor|Front passenger window|Yes|
|Binary sensor|GPS state|No|
|Binary sensor|Guest mode enabled|No|
|Binary sensor|Homelink nearby|No|
|Binary sensor|Located at favorite|Yes|
|Binary sensor|Located at home|Yes|
|Binary sensor|Located at work|Yes|
|Binary sensor|Offroad lightbar|No|
|Binary sensor|Passenger seat belt|No|
|Binary sensor|Pin to drive enabled|No|
|Binary sensor|Preconditioning enabled|No|
|Binary sensor|Preconditioning|No|
|Binary sensor|Rear display HVAC|No|
|Binary sensor|Rear driver door|Yes|
|Binary sensor|Rear driver window|Yes|
|Binary sensor|Rear passenger door|Yes|
|Binary sensor|Rear passenger window|Yes|
|Binary sensor|Right hand drive|No|
|Binary sensor|Scheduled charging pending|No|
|Binary sensor|Service mode|No|
|Binary sensor|Status|Yes|
|Binary sensor|Supercharger session trip planner|No|
|Binary sensor|Tire pressure warning front left|No|
|Binary sensor|Tire pressure warning front right|No|
|Binary sensor|Tire pressure warning rear left|No|
|Binary sensor|Tire pressure warning rear right|No|
|Binary sensor|Trip charging|No|
|Binary sensor|User present|Yes|
|Binary sensor|Wiper heat|No|
|Button|Flash lights|Yes|
|Button|HomeLink|Yes|
|Button|Honk horn|Yes|
|Button|Keyless driving|Yes|
|Button|Play fart|Yes|
|Button|Wake|Yes|
|Climate|Cabin overheat protection|Yes|
|Climate|Climate|Yes|
|Cover|Charge port door|Yes|
|Cover|Frunk|Yes|
|Cover|Sunroof|No|
|Cover|Trunk|Yes|
|Cover|Vent windows|Yes|
|Device tracker|Location|Yes|
|Device tracker|Origin|No|
|Device tracker|Route|Yes|
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
|Binary sensor|Storm watch active|Yes|
|Number|Backup reserve|Yes|
|Number|Off grid reserve|Yes|
|Select|Allow export|Yes|
|Select|Operation mode|Yes|
|Sensor|Battery power|Yes|
|Sensor|Consumer imported from battery|No|
|Sensor|Consumer imported from generator|No|
|Sensor|Consumer imported from grid|No|
|Sensor|Consumer imported from solar|No|
|Sensor|Energy left|Yes|
|Sensor|Generator exported|Yes|
|Sensor|Generator power|No|
|Sensor|Grid exported|Yes|
|Sensor|Grid exported from battery|No|
|Sensor|Grid exported from generator|No|
|Sensor|Grid exported from solar|No|
|Sensor|Grid imported|No|
|Sensor|Grid power|Yes|
|Sensor|Grid services exported|No|
|Sensor|Grid services imported|No|
|Sensor|Grid services power|Yes|
|Sensor|Home usage|Yes|
|Sensor|Island status|Yes|
|Sensor|Load power|Yes|
|Sensor|Percentage charged|Yes|
|Sensor|Solar exported|No|
|Sensor|Solar generated|Yes|
|Sensor|Solar power|Yes|
|Sensor|Total pack energy|No|
|Sensor|Version|Yes|
|Sensor|VPP backup reserve|Yes|
|Switch|Allow charging from grid|Yes|
|Switch|Storm watch|Yes|

### Wall connector

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Fault state|No|
|Sensor|Power|Yes|
|Sensor|State|Yes|
|Sensor|Vehicle|Yes|

## Actions

Teslemetry provides various custom actions to interact with the Tesla Fleet API directly.

### Navigate to coordinates

`teslemetry.navigation_gps_request`

| Field         | Description                | Example                          |
|---------------|----------------------------|----------------------------------|
| device_id     | The vehicle's device ID    | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| gps           | Dictionary of coordinates  |                                  |
| gps.latitude  | Latitude in degrees        | -27.9699373                      |
| gps.longitude | Longitude in degrees       | 153.4081865                      |
| order         | Order for this destination | 1                                |

### Set scheduled charging

`teslemetry.set_scheduled_charging`

| Field     | Description                           | Example                          |
|-----------|---------------------------------------|----------------------------------|
| device_id | The vehicle's device ID              | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable    | Enable or disable scheduled charging | true                             |
| time      | Time to start charging in HH:MM       | 6:00                             |

### Set scheduled departure

`teslemetry.set_scheduled_departure`

| Field                           | Description                               | Example                          |
|---------------------------------|-------------------------------------------|----------------------------------|
| device_id                       | The vehicle's device ID                  | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable                          | Enable or disable scheduled departure     | true                             |
| preconditioning_enabled         | Enable preconditioning                    | true                             |
| preconditioning_weekdays_only   | Enable preconditioning on weekdays only   | false                            |
| departure_time                  | Planned departure time (HH:MM)         | 6:00                             |
| off_peak_charging_enabled       | Enable off-peak charging                  | false                            |
| off_peak_charging_weekdays_only | Enable off-peak charging on weekdays only | false                            |
| end_off_peak_time               | Time to complete charging by (HH:MM)      | 5:00                             |

### Valet Mode

`teslemetry.valet_mode`

| Field         | Description                  | Example                          |
|---------------|------------------------------|----------------------------------|
| device_id     | The vehicle's device ID      | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable        | Enable or disable valet mode | true                             |
| pin           | 4-digit pin                  | 1234                             |

### Speed Limit

`teslemetry.speed_limit`

| Field         | Description                   | Example                          |
|---------------|-------------------------------|----------------------------------|
| device_id     | The vehicle's device ID       | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable        | Enable or disable speed limit | true                             |
| pin           | 4-digit pin                   | 1234                             |

### Time of use

`teslemetry.time_of_use`

| Field         | Description                  | Example                                                                                                          |
|---------------|------------------------------|------------------------------------------------------------------------------------------------------------------|
| device_id     | The energy site's device ID  | 0d462c0c4c0b064b1a91cdbd1ffcbd31                                                                                 |
| tou_settings  | Time of use settings         | See [Tesla Fleet API documentation](https://developer.tesla.com/docs/fleet-api#time_of_use_settings) for details |

## Energy dashboard

The Tesla Fleet API only provides power data for Powerwall and Solar products. This means they cannot be used on the energy dashboard directly.

Energy flows can be calculated from `Battery power` and `Grid power` sensors using a [Template Sensor](/integrations/template/) to separate the positive and negative values into positive import and export values.
The `Load power`, `Solar power`, and the templated sensors can then use a [Riemann Sum](/integrations/integration/) to convert their instant power (kW) values into cumulative energy values (kWh),
which then can be used within the energy dashboard.
