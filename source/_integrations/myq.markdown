---
title: MyQ
description: Instructions on how to integrate MyQ-Enabled garage door covers into Home Assistant.
ha_category:
  - Cover
  - Binary Sensor
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: myq
ha_homekit: true
ha_platforms:
  - binary_sensor
  - cover
---

The `myq` cover platform lets you control MyQ-Enabled garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your MyQ Device mobile app.

{% include integrations/config_flow.md %}

## Binary Sensor

Your MyQ gateway will appear as a binary sensor that shows if the device is connected.

## Cover

Garage doors and gates linked to your `MyQ` account will appear as covers.
