---
title: StarLine
description: Instructions on how to setup your StarLine account with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Car
  - Lock
  - Presence detection
  - Sensor
  - Switch
ha_release: 0.103
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@anonym-tsk'
ha_domain: starline
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - lock
  - sensor
  - switch
ha_integration_type: integration
---

The `starline` integration lets you retrieve data of your [StarLine](https://www.alarmstarline.com/) security system from the [StarLine portal](https://my.starline.ru/). You will need a working StarLine account.

This integration provides the following platforms:

- Binary sensors: Hand brake, hood, trunk, alarm status, doors lock state, handsfree, neutral, moving ban status, ignition state, and autostart state.
- Device tracker: The location of your car.
- Lock: Control the lock of your car.
- Sensors: Battery level, SIM card balance, GSM signal level, GPS satellites count, fuel volume, mileage, OBD errors, interior temperature and engine temperature.
- Switches: Start/stop engine, heater (webasto), additional channel, and service mode.
- Buttons: Sound the horn, flex logic, and panic mode.
- Actions: Update the state, set update frequency. More details can be found [here](#actions).

## Prerequisites

Create a new application in the [StarLine developer profile](https://my.starline.ru/developer).

{% note %}
The integration makes API calls to StarLine servers to retrieve data. It gets only the latest set of values that are valid for the moment of the API call. This means that the integration does not retrieve or store values, StarLine events, or parameters between the API calls.
You can make up to 1000 API calls per day, which means you could make one approximately every 86 seconds.
By default, the state of integration will be updated every 3 minutes and OBD information will be updated every 3 hours, making 488 calls per day.
It is not recommended to set an update interval of less than 90 seconds.
{% endnote %}

{% include integrations/config_flow.md %}

## Actions

### Update the state

The `starline.update_state` action fetches the last state of the device from the StarLine server.

This action does not require any attributes.

### Set scan interval

The `starline.set_scan_interval` action sets update frequency for entities.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `scan_interval` | no | Update frequency in seconds.

### Set scan OBD interval

The `starline.set_scan_obd_interval` action sets update frequency for OBD information.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `scan_interval` | no | Update frequency in seconds.

## Disclaimer

This software is not affiliated with or endorsed by ScPA StarLine Ltd.
