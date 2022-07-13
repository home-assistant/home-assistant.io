---
title: Pylontech US
description: Integration for 48V Pylontech US batteries.
ha_category:
  - Other
ha_release: 2022.9
ha_quality_scale: internal
ha_codeowners:
  - '@danielschramm'
ha_domain: pylontech_us
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The `Pylontech US` platform allows you to read data from a low voltage Pylontech
battery stack via RS485 USB adapter.
Supported batteries are:
- US5000
- US3000
- US3000C
- US2000
- US2000C

High voltage Pylontech batteries are not supported!

The Integration can be activated via the configuration wizard.
