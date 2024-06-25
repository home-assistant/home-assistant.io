---
title: IoTMeter
description: Instructions on how to integrate IoTMeter within Home Assistant.
ha_category:
  - Energy
ha_release: 2024.6
ha_iot_class: Cloud Polling
ha_domain: iotmeter
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@lipic'
ha_integration_type: integration
---

The **IoTMeter** {% term integration %} allows you to monitor and manage your IoT meters within Home Assistant. This integration provides real-time data and control over your connected devices.

{% include integrations/config_flow.md %}

## Sensors

The {% term integration %} adds the following sensors:

- Total power
- Total consumption energy
- Total generation energy
- EVSE status

## Number

The {% term integration %} adds the following number entities:

- Max charging current (Only for SmartModule)
