---
title: Tessie
description: Instructions on how to integrate Tessie within Home Assistant.
ha_category:
  - Binary Sensor
  - Button
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
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: integration
---

The Tessie integration exposes various commands and sensors from the Tesla vehicles connected to your [Tessie](https://my.tessie.com/) account.

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
- Tire Pressure Warning Front Left
- Tire Pressure Warning Front Right
- Tire Pressure Warning Rear Left
- Tire Pressure Warning Rear Right
- Front driver window
- Front passenger window
- Rear driver window
- Rear passenger window


### Button

The integration will create button entities to control various aspects of the vehicle.

- Wake
- Flash lights
- Honk horn
- Homelink
- Keyless driving
- Play fart

### Climate

The integration will create a climate entity to control the vehicle's climate control system. This entity can:

- Turn on and off
- Change the drivers set temperature
- Change to one of the three keep modes: Keep, Dog, and Climate

The passenger set temperature is shown as a sensor but cannot be changed by Tessie.

### Cover

The integration will create a cover entity to control various aspects of your vehicles:

- Vent/Closing windows
- Open/Closing charge port
- Open frunk
- Open/Close trunk

### Device Tracker

The integration will create device tracker entities for the vehicles current location, and navigation destination.

### Lock

The integration will create lock entities to lock and unlock the vehicle, and to control:

- Charge cable
- Speed limit

### Media Player

The integration will create media player entities to show what each vehicles is currently playing.

### Number

The integration will create number entities to control:

- Charge current
- Charge limit
- Speed limit

### Select

The integration will create a select entity to control each of the seat heaters. It allows you to set each seat heater to Off, Low, Medium, or High.

- Front Left
- Front Right
- Rear Left (if installed)
- Rear Center (if installed)
- Rear Right (if installed)
- Third Row Left (if installed)
- Third Row Right (if installed)

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
- Traffic delay
- State of charge at arrival
- Distance to arrival
- Time to arrival
- Destination

#### Climate State

- Inside Temperature
- Outside Temperature
- Driver Temperature Setting
- Passenger Temperature Setting

### Switch

The integration will create switch entities to control various aspects of your vehicles:

- Charge
- Defrost mode
- Sentry mode
- Valet mode
- Steering wheel heater

### Update

The integration will show vehicle software updates and their installation progress.
