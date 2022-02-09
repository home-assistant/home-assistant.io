---
title: GE Home Appliances (SmartHQ)
description: Instructions on how to integrate your GE Home appliances (SmartHQ) into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
  - Switch
  - Water Heater
ha_release: 0.5.0
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@kevchu3'
  - '@simbaja'
ha_domain: ge_home
ha_platforms:
  - binary_sensor
  - sensor
  - switch
  - water_heater
ha_zeroconf: true
---

The `ge_home` implementation allows you to integrate your [GE Home Appliances](https://www.geappliances.com/) using the [SmartHQ API](https://smarthqsolutions.com/smarthq-platform-api) in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Fridge
- Oven
- Dishwasher
- Laundry (Washer/Dryer)
- Whole Home Water Filter
- A/C (Portable, Split, Window)
- Range Hoods
- Advantium

{% include integrations/config_flow.md %}

