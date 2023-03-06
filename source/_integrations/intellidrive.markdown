---
title: IntelliDrive
description: Instructions on how to integrate Reisinger sliding doors within Home Assistant by using an intellidrive adapter.
ha_category:
  - Cover
ha_iot_class: Local Polling
ha_release: 2023.4
ha_domain: intellidrive
ha_config_flow: true
ha_codeowners:
  - '@sreisi'
ha_platforms:
  - cover
ha_integration_type: integration
---

The IntelliDrive integration lets you control the Reisinger Sliding door drive system [Reisinger.de](https://reisinger.de/) device through Home Assistant.

The Intellidrive devices are integrated into Home Assistant via WLAN. All that is required for configuration is the IP address of the Intellidrive device; optionally, a device key can be stored to secure communication. This data can be managed on the internal administration interface.

{% include integrations/config_flow.md %}
