---
title: Vogel's MotionMount
description: Instructions on how to integrate Vogel's MotionMount into Home Assistant.
ha_category:
  - Number
  - Select
  - Binary sensor
  - Sensor
ha_release: 2024.1
ha_iot_class: Local Push
ha_config_flow: true
ha_platforms:
  - number
  - select
  - binary_sensor
  - sensor
ha_codeowners:
  - '@RJPoelstra'
ha_domain: motionmount
---

The Vogel's MotionMount integration allows you to control the position of your [TVM 7675 Pro](https://www.vogels.com/p/tvm-7675-pro-motorized-tv-wall-mount-black) Signature MotionMount.

This integration uses the Ethernet (IP) connection of your MotionMount. It's not possible to connect using the RS-232 connection.

It provides information about the current position of the mount and allows setting a new position.

{% include integrations/config_flow.md %}
