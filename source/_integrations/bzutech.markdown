---
title: Bzu Tech
description: Instructions on how to setup BzuTech devices within Home Assistant.
ha_category:
  - Sensors
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@enioo22'
ha_domain: bzutech
ha_quality_scale: platinum
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **Bzu Tech** {% term integration %} allows you to integrate your [BzuCloud](https://cloud.bzutech.com.br) sensors and devices in Home Assistant. It provides a sensor {% term entity %} that can be used in automations, dashboards and more.

{% include integrations/config_flow.md %}

*To use this integration you need a BzuCloud account with registered devices.
