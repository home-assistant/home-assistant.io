---
title: "Mercedes me"
description: "Instructions on how to integrate Mercedes car with Mercedes me into Home Assistant."
logo: mercedesme.png
ha_category:
  - Car
  - Binary Sensor
  - Presence Detection
  - Sensor
ha_release: 0.63
ha_iot_class: Cloud Polling
redirect_from:
  - /components/binary_sensor.mercedesme/
  - /components/device_tracker.mercedesme/
  - /components/sensor.mercedesme/
---

The `mercedesme` integration offers integration with the [Mercedes me](https://www.mercedes-benz.com/de/mercedes-me/) cloud service and provides presence detection as well as sensors such as doors, tires, windows, and service interval.

This integration provides the following platforms:

- Binary Sensors: Windows, tires, doors and lock.
- Sensors:Fuel status, service interval, remaining km, etc.
- Device tracker: To track location of your car.

Platforms will be automatically configured if Mercedes me integration is configured.

<div class='note warning'>
  The integration was removed. The vendor disabled the API endpoint and a new API is not available currently.
</div>
