---
title: Tesla Wall Connector
description: Instructions on how to integrate Tesla Wall Connector (Gen 3) into Home Assistant.
ha_category:
  - Binary Sensor
  - Energy
  - Sensor
ha_release: 2021.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@einarhauks'
ha_domain: tesla_wall_connector
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Tesla Wall Connector integration allows you to integrate your Gen 3 [Tesla Wall Connector](https://www.tesla.com/support/home-charging-installation/wall-connector) with Wi-Fi into Home Assistant.

{% include integrations/config_flow.md %}
