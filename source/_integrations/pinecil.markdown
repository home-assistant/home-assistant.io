---
title: Pinecil
description: Instructions on how to integrate Pinecil devices with Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 2024.8
ha_config_flow: true
ha_codeowners:
  - '@tr4nt0r'
ha_domain: pinecil
ha_integration_type: integration
ha_platforms:
  - sensor
---

The **Pinecil** {% term integration %} seamlessly connects Home Assistant to Pinecil V2 soldering irons, allowing for remote monitoring and control. This integration provides real-time updates on temperature, power, and various other settings and diagnostic information.

{% include integrations/config_flow.md %}
