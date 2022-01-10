---
title: Oncue by Kohler
description: Documentation about the oncue sensors.
ha_category:
  - Binary Sensor
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2022.2
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: oncue
ha_platforms:
  - binary_sensor
  - sensor
---

The Oncue by Kohler integration will allow you to monitor the state of your [Oncue enabled Kohler generator](https://api.kohler.com/oncueplus/#/auth).

## Supported Devices

- [38RCLB](https://kohlerpower.com/en/residential/generators/product/38rclb)
- [48RCLB](https://kohlerpower.com/en/residential/generators/product/48rclb)
- [60RCLA](https://kohlerpower.com/en/residential/generators/product/60rcla)
- [KG80R](https://kohlerpower.com/en/residential/generators/product/kg80r)

{% include integrations/config_flow.md %}
