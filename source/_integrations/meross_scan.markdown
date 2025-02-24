 ---
title: Meross
description: Integrate Meross devices
ha_category:
  - Sensor
ha_release: 2025.3
ha_codeowners:
  - '@ashionky'
ha_iot_class: Local Polling
ha_domain: meross_scan
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrate Meross devices into Home Assistant.

{% include integrations/config_flow.md %}

## Prerequisites

- Devices need to be connected to the local network first.
- You need to know the IP address of the device.
- The host of the Home Assistant is not using port 9989.

## Supported device models

| Model                               | Version            |             
|-------------------------------------|--------------------|
| `Meross Smart Energy Monitor, EM06` | `v2.3.8 and above` |
| `Meross Smart Energy Monitor, EM16` | `v3.1.7 and above` |