---
title: Aseko Pool Live
description: Instructions on how to integrate Aseko ASIN AQUA dosing systems within Home Assistant.
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2022.2
ha_category:
  - Sensor
ha_codeowners:
  - '@milanmeu'
ha_domain: aseko_pool_live
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Aseko Pool Live integration allows you to monitor your Aseko ASIN Aqua dosing systems and Aseko ASIN Pool controllers.

The integration is fully compatible with ASIN AQUA Net and ASIN AQUA Home.

If you have an ASIN AQUA Oxygen, Home, Salt or Profi dosing system and not all probes are listed in Home Assistant, [open an issue on GitHub](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&title=Add%20support%20for%20ASIN%20AQUA%20[your%20device%20model]) and include the first 8 digits of your serial number so that your device model can be made fully compatible with Home Assistant.

{% include integrations/config_flow.md %}
