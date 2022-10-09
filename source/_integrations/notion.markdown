---
title: Notion
description: How to integrate Notion kits within Home Assistant.
ha_category:
  - Binary Sensor
  - Hub
  - Sensor
ha_release: 0.96
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bachya'
ha_domain: notion
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: integration
---

The `Notion` component retrieves data from [Notion](https://getnotion.com) wireless
home monitoring sensor kits.

{% include integrations/config_flow.md %}
