---
title: MyNeomitis
description: Connect the MyNeomitis devices (radiators, towel rails, relays, underfloor heating) to Home Assistant using the cloud API.
ha_category:
  - Climate
  - Select
  - Sensor
ha_release: 2025.8.3
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@leo.periou"
ha_domain: myneomitis
ha_platforms:
  - climate
  - select
  - sensor
ha_integration_type: cloud
---

This Home Assistant integration has been developed specifically to enable management of connected devices from the MyNeomitis application.

It provides complete control over temperature and operating modes, as well as access to weekly device programming via the Home Assistant interface.

## Radiators (Climate)

### Compatible models:

- Myneo Fluid
- Efluid
- Myneo stats
- Ebath
- Myneo Link

## Energy consumption (Sensor)

Allows you to monitor the energy consumption of compatible products.
