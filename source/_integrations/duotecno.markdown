---
title: Duotecno
description: Access and control your Duotecno nodes.
ha_category:
  - Climate
  - Cover
  - Light
  - Switch
ha_iot_class: Local Push
ha_release: '2023.8'
ha_config_flow: true
ha_codeowners:
  - '@cereal2nd'
ha_domain: duotecno
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - switch
ha_integration_type: integration
---

The **Duotecno** {% term integration %} can be used to control [Duotecno](https://www.duotecno.be/) nodes in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Climate
- Cover
- Light
- Switch

{% include integrations/config_flow.md %}

The information needed is the connection info to your Smart Box.
