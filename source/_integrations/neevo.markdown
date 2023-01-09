---
title: "OTODATA Nee-Vo Tank Monitoring"
description: "Integration for OTODATA Nee-Vo Tank Monitoring system"
ha_release: "2023.1.3"
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_config_flow: true
ha_platforms:
  - sensor
ha_codeowners:
  - '@davidflypei'
ha_domain: neevo
---

The OTODATA Nee-Vo Tank Monitoring integration gets data from [OTODATA tank monitors](https://www.otodatatankmonitors.com/) linked to a Nee-Vo account. 

{% include integrations/config_flow.md %}

## Sensors

Sensors available in this integration.

### Tank Monitor

| Name | Unit | Description |
| ---- | ---- | ----------- |
| Tank Level | % | Tank level in percent |
| Tank Last Pressure | kPa (default) | Tank pressure. Unit defaults to kPa unless the monitor is configured with something else |
