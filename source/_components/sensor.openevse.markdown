---
layout: page
title: "OpenEVSE Sensor"
description: "Instructions on how to integrate a WiFi-equipped OpenEVSE Charging station with Home Assistant"
date: 2017-02-02 22:09
sidebar: true
comments: false
sharing: true
footer: true
logo: openevse.png
ha_category: Sensor
ha_release: "0.38"
ha_iot_class: "Local Polling"
---


This `openevse` sensor platform pulls data from an [OpenEVSE](https://www.openevse.com/) Charging station equipped with an ESP8266-based wifi connection.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
sensor:
  - platform: openevse
    host: IP_ADDRESS
    monitored_variables:
      - status
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of your charger
- **monitored_variables** array (*Required*): Conditions to display on the frontend.
  - **status**: The status of the charger (i.e., "Connected", "Charging", etc.)
  - **charge_time**: The number of minutes the charging has been charging, or 0 if it is not charging.
  - **rtc_temp**: The temperature reported by the real time clock sensor, or 0 if the sensor is not installed.
  - **ir_temp**: The temperature reported by the IR remote sensor, or 0 if the sensor is not installed.
  - **ambient_temp**: The temperature reported by the ambient sensor, or 0 if the sensor is not installed.
  - **usage_session**: The energy usage for the current charging session.
  - **usage_total**: The total energy usage for the device.
