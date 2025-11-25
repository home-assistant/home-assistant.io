---
title: Salda Smarty
description: Instructions on how to integrate Salda Smarty 2X/3X/4X P/V ventilation systems into Home Assistant.
ha_category:
  - Button
  - Fan
  - Hub
  - Sensor
  - Switch
ha_config_flow: true
ha_iot_class: Local Polling
ha_release: 0.95
ha_codeowners:
  - '@z0mbieprocess'
ha_domain: smarty
ha_platforms:
  - binary_sensor
  - button
  - fan
  - sensor
  - switch
ha_integration_type: hub
---

The `smarty` integration lets you control Salda [Smarty](http://www.salda.lt/en/products/category/compact-counter-flow-units) ventilation units from Home Assistant. You need a [MB-GATEWAY](http://www.salda.lt/en/products/item/5637227077) or something similar to connect to your local network.

There is currently support for the following device types within Home Assistant:

- Button
- Fan
- Sensor
- Switch

The integration has a fan platform to view and control the ventilation speed, a switch platform to control the Boost state (which temporarily increases the fan speed to maximum for 10 minutes before returning to the previous speed), a button platform to reset the filters' timer, and a sensors platform to read:

- Outdoor air temperature
- Extract air temperature
- Supply air temperature
- Extract fan speed rpm
- Supply fan speed rpm
- Alarm
- Warning
- Filter Change Timer

{% include integrations/config_flow.md %}
