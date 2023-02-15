---
title: Waterkotte Heatpump
description: Integrate waterkotte heatpump sensors home Home Assistant.
ha_category:
  - Sensor
ha_release: '2023.2'
ha_iot_class: Local Polling
ha_domain: waterkotte_heatpump
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@chboland'
ha_integration_type: integration
---

The Waterkotte Heatpump integration allows you to monitor [Waterkotte Heatpumps](https://www.waterkotte.eu/heat-pumps) in Home Assistant. All EcoTouch devices should be supported.

Currently only sensors are supported. Other platforms will be supported in future releases.

{% include integrations/config_flow.md %}
