---
title: Hayward Omnilogic
description: Instructions on how to configure Hayward OmniLogic integration.
ha_category:
  - Sensor
ha_release: 0.116
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@oliver84'
  - '@djtimca'
  - '@gentoosu'
ha_domain: omnilogic
---

[Hayward OmniLogic](https://www.hayward-pool.com/shop/en/pools/omnilogic-i-auomni--1) smart pool and spa technology control.

There is currently support for the following device types within Home Assistant:

- **Sensor** - Air Temperature, Water Temperature, Variable Pump Speeds, Chlorinator Setting, Salt Levels, pH Levels, ORP Levels
- **Lights** - Colorlogic version 1 and version 2 lighting systems
- **Switch** - Relays, Pumps (Single, Dual, and Variable Speed)
- **Water Heater** - Pool heaters

## Configuration

Home Assistant offers Hayward OmniLogic integration through **Configuration** -> **Integrations** -> **Hayward OmniLogic**. Enter your `username` and `password` when prompted. Use your registered email address as the username.

## Known limitations

- The platform does not support alarms from the Omnilogic system.

## Options

Within the **Configuration** -> **Integrations** -> **Hayward OmniLogic** options screen you can set your polling interval (6 seconds recommended) and correct any pH Sensor offsets by adding a +/- float number to correct the pH sensor readings.

## Services

These services are available for the Hayward OmniLogic Component:

### omnilogic.set_pump_speed

|**Parameter**|**Description**|**Example**|
|-|-|-|
|entity_id|The entity_id of the target variable speed pump.|switch.pool_pump|
|speed|The target speed for the variable speed pump.|85|

### omnilogic.set_v2_lights

|**Parameter**|**Description**|**Example**|
|-|-|-|
|entity_id|The entity_id of the lights (must be V2).|light.pool_lights|
|speed (Optional)|The effect speed you would like to set (0-8).|4|
|brightness (Optional)|The effect brightness you would like to set (0-4).|4|

