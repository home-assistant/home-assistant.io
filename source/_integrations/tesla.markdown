---
title: Tesla
description: Instructions on how to integrate Tesla car into Home Assistant.
ha_category:
  - Car
  - Binary Sensor
  - Climate
  - Presence Detection
  - Lock
  - Sensor
  - Switch
ha_release: 0.53
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@zabuldon'
  - '@alandtse'
ha_domain: tesla
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - climate
  - device_tracker
  - lock
  - sensor
  - switch
---

The `Tesla` integration offers integration with the [Tesla](https://auth.tesla.com/login) cloud service and provides presence detection as well as sensors such as charger state and temperature.


This integration provides the following platforms:

- Binary sensors - such as update available, parking, and charger connection.
- Sensors - such as Battery level, Inside/Outside temperature, odometer, estimated range, and charging rate.
- Device tracker - to track location of your car
- Lock - Door lock, rear trunk lock, front trunk (frunk) lock and charger door lock. Enables you to control Tesla's door, trunks and charger door lock
- Climate - HVAC control. Allow you to control (turn on/off, set target temperature) your Tesla's HVAC system. Also enables preset modes to enable or disable max defrost mode `defrost` or `normal` operation mode.
- Switch - Charger and max range switch to allow you to start/stop charging and set max range charging. Update switch to allow you to disable polling of vehicles to conserve battery. Sentry mode switch to enable or disable Sentry mode.

{% include integrations/config_flow.md %}

<div class='note warning'>
  
  Note: MFA on your Tesla Account is not supported at this time.

</div>

## Options

Tesla options are set via **Configuration** -> **Integrations** -> **Tesla** -> **Options**.

* Wake cars on start - Whether to wake sleeping cars on Home Assistant startup. This allows a user to choose whether cars should continue to sleep (and not update information) or to wake up the cars potentially interrupting long term hibernation and increasing vampire drain.
