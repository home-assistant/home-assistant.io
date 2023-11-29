---
title: Oncue by Kohler
description: Documentation about the oncue sensors.
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2022.2
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@peterager'
ha_dhcp: true
ha_domain: oncue
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Oncue by Kohler integration will allow you to monitor the state of your [Oncue enabled Kohler generator](https://api.kohler.com/oncueplus/#/auth).

## Tested devices

- 20RESA
- [24RCL](https://kohlerpower.com/en/residential/generators/product/24rcl)
- [38RCLB](https://kohlerpower.com/en/residential/generators/product/38rclb)
- [48RCLB](https://kohlerpower.com/en/residential/generators/product/48rclb)
- [60RCLA](https://kohlerpower.com/en/residential/generators/product/60rcla)
- [KG80R](https://kohlerpower.com/en/residential/generators/product/kg80r)

{% include integrations/config_flow.md %}
