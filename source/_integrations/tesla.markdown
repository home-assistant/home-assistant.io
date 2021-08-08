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

## Options

Tesla options are set via **Configuration** -> **Integrations** -> **Tesla** -> **Options**.

* Seconds between scans - referred to below as the `scan_interval`.

* Wake cars on start - Whether to wake sleeping cars on Home Assistant startup. This allows a user to choose whether cars should continue to sleep (and not update information) or to wake up the cars potentially interrupting long term hibernation and increasing vampire drain.

## Potential Battery impacts

Here are some things to consider and understand when implementing the Tesla component and its potential effect on your car's battery.

- The `scan_interval` determines when to check if the car is awake and new information is available, but the Tesla integration will not wake up a sleeping car during this polling.  By default, the polling will occur every 660 seconds. Polling a car too frequently can keep the car awake and drain the battery. Different firmware versions and measurements of Tesla cars can take from 11 to 15 minutes for sleep mode to occur. There is no official information on sleep mode timings so your mileage may vary and you should experiment with different polling times for an optimal experience.
- The car will, however, be woken up when a command is actively sent to the car, such as door unlock or turning on the HVAC. It will then also fetch updated information while the car is awake based on the `scan_interval`.
- The car can intentionally be woken up to fetch recent information by sending a harmless command, for example, a lock command. This can be used in an automation to, for example, ensure that updated information is available every morning. (Note that the command must be valid for that specific car model. So locking the frunk of a Model 3 will not wake up that car).
- You can also toggle the `Update switch` on/off to  disable polling of the vehicle completely via automations or the Lovelace UI.
