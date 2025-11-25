---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device Tracker
  - Lock
  - Media Player
  - Number
  - Sensor
  - Update
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tessie
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

The Tessie integration exposes various commands and sensors from the Tesla vehicles and energy products connected to your [Tessie](https://tessie.com/) subscription.

## Prerequisites

You must have an active [Tessie](https://my.tessie.com/) subscription, generate a [Tessie Access Token](https://my.tessie.com/settings/api) and grant Tessie access to your Tesla vehicle by generating a [Tesla Virtual Key](https://www.tesla.com/_ak/tessie.com).

{% include integrations/config_flow.md %}

## Troubleshooting

If a vehicle action returns an error in Home Assistant, you should first try to perform the same action in the Tessie app. The app will guide you through the steps to fix common issues like command signing or scopes.

## Vehicle entities

### Binary sensor

The integration will create binary sensor entities for a variety of metrics related to your vehicles:

#### Charge state

- Battery charging
- Battery heater
- Preconditioning enabled
- Scheduled charging enabled
- Trip charging enabled

#### Climate state

- Auto seat climate left
- Auto seat climate right
- Auto steering Wheel climate
- Overheat protection enabled
- Overheat protection running

#### Vehicle state

- Dashcam recording
- Front driver window
- Front passenger door
- Front passenger window
- Rear driver door
- Rear driver window
- Rear passenger door
- Rear passenger window
- Tire pressure warning front left
- Tire pressure warning front right
- Tire pressure warning rear left
- Tire pressure warning rear right
- User present

### Button

The integration will create button entities to control various aspects of the vehicle:

- Flash lights
- HomeLink
- Honk horn
- Keyless driving
- Play fart
- Wake

### Climate

The integration will create a climate entity to control the vehicle's climate control system. This entity can:

- Change the driver's set temperature
- Change to one of the three keep modes: Keep, Dog, and Camp
- Turn on and off

The passenger set temperature is shown as a sensor but cannot be changed by Tessie.

### Cover

The integration will create a cover entity to control various aspects of your vehicles:

- Open/Close trunk
- Open/Close charge port
- Open frunk
- Vent/Close windows
- Vent/Close sunroof

### Device tracker

The integration will create device tracker entities for the vehicle's current location and navigation destination.

### Lock

The integration will create lock entities to lock and unlock the vehicle, and to control:

- Charge cable
- Speed limit

### Media Player

The integration will create media player entities to show what each vehicle is currently playing.

### Number

The integration will create number entities to control:

- Charge current
- Charge limit
- Speed limit

### Select

The integration will create a select entity to control each of the seat heaters. It allows you to set each seat heater to Off, Low, Medium, or High.

For vehicles equipped with cooled (ventilated) seats, a select entity will also be added to control each cooled seat.

Heated seats:

- Front left
- Front right
- Rear center (if installed)
- Rear left (if installed)
- Rear right (if installed)
- Third row left (if installed)
- Third row right (if installed)

Cooled seats:

- Front left
- Front right

### Sensor

The integration will create sensor entities for a variety of metrics related to your vehicles:

#### Charge state

- Battery charging
- Battery level
- Battery range
- Battery range estimate (disabled)
- Battery range ideal (disabled)
- Charge energy added
- Charge rate
- Charger current
- Charger power
- Charger voltage

#### Climate state

- Driver temperature setting
- Inside temperature
- Outside temperature
- Passenger temperature setting

#### Drive state

- Destination
- Distance to arrival
- Power
- Shift state
- Speed
- State of charge at arrival
- Time to arrival
- Traffic delay

#### Vehicle state

- Odometer
- Online
- Tire pressure front left
- Tire pressure front right
- Tire pressure rear left
- Tire pressure rear right

### Switch

The integration will create switch entities to control various aspects of your vehicles:

- Charge
- Defrost mode
- Sentry mode
- Steering wheel heater
- Valet mode

### Update

The integration will show vehicle software updates and their installation progress. Updates can only be installed from Home Assistant after they have finished downloading.

## Energy entities

### Binary sensor

- Backup capable
- Grid services enabled
- Grid services active
- Storm watch active

### Number

- Backup reserve
- Off grid reserve

### Select

- Allow export
- Operation mode

### Sensor

- Battery power
- Energy left
- Generator power
- Grid power
- Grid services power
- Load power
- Percentage charged
- Solar power
- Total pack energy
- Version
- Vehicle
- <abbr title="Virtual power plant">VPP</abbr> backup reserve
- Fault state code
- Power
- State code

### Switch

- Allow charging from grid
- Storm watch

## Energy dashboard

The Tesla Fleet API only provides power data for Powerwall and Solar products. This means they cannot be used on the energy dashboard directly.

Energy flows can be calculated from `Battery power` and `Grid power` sensors using a [Template Sensor](/integrations/template/) to separate the positive and negative values into positive import and export values.
The `Load power`, `Solar power`, and the templated sensors can then use a [Riemann Sum](/integrations/integration/) to convert their instant power (kW) values into cumulative energy values (kWh),
which then can be used within the energy dashboard.
