---
title: ESPHome
description: Support for ESPHome devices using the native ESPHome API.
featured: true
ha_category:
  - DIY
ha_release: 0.85
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@OttoWinter'
ha_domain: esphome
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - camera
  - climate
  - cover
  - fan
  - light
  - sensor
  - switch
---

This integration allows [ESPHome](https://esphome.io) devices to connect directly to Home Assistant with the [native ESPHome API](https://esphome.io/components/api.html).

{% include integrations/config_flow.md %}
