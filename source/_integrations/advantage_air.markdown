---
title: Advantage Air
description: Instructions on how to integrate Advantage Air A/C controller into Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Light
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 0.117
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: advantage_air
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - diagnostics
  - light
  - select
  - sensor
  - switch
  - update
ha_integration_type: integration
---

The **Advantage Air** {% term integration %} allows you to control [Advantage Air](https://www.advantageair.com.au/) Air Conditioning controllers into Home Assistant.

## Prerequisites

The wall-mounted Android tablet running the [MyPlace](https://play.google.com/store/apps/details?id=com.air.advantage.myair5), [e-zone](https://play.google.com/store/apps/details?id=com.air.advantage.ezone), or [zone10e](https://play.google.com/store/apps/details?id=com.air.advantage.zone10) must have a static IP, which you will enter on the integrations page in Home Assistant.

{% include integrations/config_flow.md %}

## Entities

### Climate

The integration will create a climate entity for each air conditioning system found and for each zone that is temperature-controlled. The main climate entity will have a preset for each [MyComfort](https://www.advantageair.com.au/wp-content/uploads/2019/10/MyComfort.pdf) temperature mode it supports.

- MyZone (default) - Use the MyZone select platform to pick which zone will be used for temperature control. Setting this to "Inactive" will use the return air vent temperature. e-zone systems do not support any MyComfort temperature modes, so will always be in the MyZone preset with MyZone set as "Inactive".
- MyTemp - Use the main climate entity to change between cool, heat, and off. Use the zone climate entities to set the desired temperature in each zone.
- MyAuto - Uses the average temperature of all zones for temperature control. When set to the Heat/Cool mode, you can adjust the heating and cooling target temperatures separately, and the MyAir system will automatically switch between heating and cooling as required.

### Cover

The integration will create a cover entity for each air conditioning zone that is not temperature controlled, allowing you to adjust the opening level manually from 0% to 100% in 5% increments.

With MyPlace, any blinds and/or garage doors will be created as cover entities.

### Sensor

The integration will create sensor entities for a variety of aspects:

- The air filter sensor shows if it needs to be replaced.
- Two sensor entities will be created for the 'time to on' and 'time to off' features. Use the `advantage_air.set_time_to` action to change these.
- Each zone that is temperature-controlled will have a sensor to show the temperature (disabled by default), and how open the damper is.
- Each zone with a wireless temperature or motion sensor will have a sensor that reports its wireless RSSI.

### Binary sensor

The integration will create a binary sensor for each zone that has a motion sensor.

### Switch

The integration will create switch entities to toggle the MyFan/ezFan setting, and to toggle air conditioning fresh air mode, if they are supported by your hardware.

With MyPlace, any relays will be created as switch entities.

### Select

The MyZone select entity that allows you to change the zone used for the "MyZone" feature. Set this to "Inactive" to use the return air vent temperature.

### Update

The update platform shows if the controller app requires an update.

### Light

With MyLights or MyPlace, light entities will be created for each light.

## Actions

### Action `advantage_air.set_time_to`

Set the On/Off Timer using the relevant sensor entity.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | `sensor.[name]_time_to_on` or `sensor.[name]_time_to_off`
| `minutes` | no | Number of minutes between `0` and `720`.
