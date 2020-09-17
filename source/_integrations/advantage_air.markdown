---
title: Advantage Air
description: Instructions on how to integrate Advantage Air A/C controller into Home Assistant.
ha_category: Climate
ha_release: 0.115
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: advantage_air
---

The `Advantage Air` integration allows you to control you [Advantage Air](https://www.advantageair.com.au/) Air Conditioning controllers into Home Assistant.

## Configuration

The wall mounted Android table running the [MyPlace](https://play.google.com/store/apps/details?id=com.air.advantage.myair5), [e-zone](https://play.google.com/store/apps/details?id=com.air.advantage.ezone), or [zone10e](https://play.google.com/store/apps/details?id=com.air.advantage.zone10) must have a static IP, which you will enter on the integrations page in Home Assistant.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Advantage Air** (use typeahead if necessary).
Enter the IP address, and leave the port as the default value.
After completing the configuration flow, the Advantage Air integration will dynamically add relevant entities for each Air Conditioning system and controlled zones.

## Entities

### Climate

The `advantage_air` climate platform will create a climate entity for each Air Conditioning system found, and for each zone only if they are temperature controlled.


### Cover

The `advantage_air` cover platform will create a cover entity for each zone that is not temperature controlled, allowing you to adjust the opening level manually from 0% to 100% in 5% increments.

### Sensor

The `advantage_air` sensor platform will create sensor entities for a variety of aspects.

- The Air Filter sensor shows if it needs to be replaced.
- Two sensor entity will be created for the 'time to on' and 'time to off' features. Use the `myair.set_time_to` service to change these.
- Each zone that is temperature controlled will have a sensor to show how open the damper is.
- A sensor entity will be created for each zone that has a wireless temperature/motion sensors that reports its wireless RSSI.

### Binary Sensor

The `advantage_air` binary sensor platform will create a binary sensor for each zone that has a motion sensor.

## Component services

Set the On/Off Timer:

`advantage_air.set_time_to`

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | sensor.[name]_time_to_on or sensor.[name]_time_to_off
| `entity_id` | no | Number of minutes between 0 and 720.

