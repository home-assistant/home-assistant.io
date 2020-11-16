---
title: Advantage Air
description: Instructions on how to integrate Advantage Air A/C controller into Home Assistant.
ha_category: Climate
ha_release: 0.117
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: advantage_air
ha_quality_scale: platinum
---

The Advantage Air integration allows you to control [Advantage Air](https://www.advantageair.com.au/) Air Conditioning controllers into Home Assistant.

## Configuration

The wall-mounted Android table running the [MyPlace](https://play.google.com/store/apps/details?id=com.air.advantage.myair5), [e-zone](https://play.google.com/store/apps/details?id=com.air.advantage.ezone), or [zone10e](https://play.google.com/store/apps/details?id=com.air.advantage.zone10) must have a static IP, which you will enter on the integrations page in Home Assistant.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Advantage Air** (use typeahead if necessary).
Enter the IP address, and leave the port as the default value.
After completing the configuration flow, the Advantage Air integration will dynamically add relevant entities for each Air Conditioning system and controlled zones.

## Entities

### Climate

The integration will create a climate entity for each air conditioning system found and for each zone that is temperature-controlled.

### Cover

The integration will create a cover entity for each zone that is not temperature controlled, allowing you to adjust the opening level manually from 0% to 100% in 5% increments.

### Sensor

The integration will create sensor entities for a variety of aspects:

- The air filter sensor shows if it needs to be replaced.
- Two sensor entities will be created for the 'time to on' and 'time to off' features. Use the `advantage_air.set_time_to` service to change these.
- Each zone that is temperature-controlled will have a sensor to show how open the damper is.
- Each zone with a wireless temperature or motion sensor will have a sensor that reports its wireless RSSI.

### Binary Sensor

The `advantage_air` binary sensor platform will create a binary sensor for each zone that has a motion sensor.

### Switch

The `advantage_air` switch platform will create a switch entity to toggle fresh air mode, if it is supported.

## Services

### Service `advantage_air.set_time_to`

Set the On/Off Timer using the relevant sensor entity.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | `sensor.[name]_time_to_on` or `sensor.[name]_time_to_off`
| `minutes` | no | Number of minutes between `0` and `720`.
