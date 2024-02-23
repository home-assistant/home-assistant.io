---
title: Digital Loggers
description: Connect and control your Digital Loggers devices using the Belkin WeMo integration
ha_category:
  - Binary sensor
  - Fan
  - Hub
  - Light
  - Switch
ha_domain: digital_loggers
ha_integration_type: virtual
ha_supporting_domain: wemo
ha_supporting_integration: Belkin WeMo
ha_release: pre 0.7
ha_codeowners:
  - '@esev'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - fan
  - light
  - sensor
  - switch
ha_iot_class: Local Push
ha_homekit: true
ha_ssdp: true
---

{% include integrations/supported_brand.md %}

The only tested working model is the Pro Switch.

Supported Digital Loggers models emulate the WeMo protocol but this is not automatically enabled.
To enable this, find the IP address of your device and log in. Click on External APIs, check the box to allow CoAP, and then click submit.
