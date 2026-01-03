---
title: CPU Speed
description: Instructions on how to integrate CPU speed within Home Assistant.
ha_category:
  - System monitor
ha_release: pre 0.7
ha_iot_class: Local Push
ha_codeowners:
  - '@fabaff'
ha_domain: cpuspeed
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
---

The CPU Speed integration allows you to monitor the current CPU speed.

{% include integrations/config_flow.md %}

## Known issues and limitations

Not all CPUs are supported. For example, some [ARM CPUs](https://github.com/workhorsy/py-cpuinfo/#cpu-support)
are known not to work with this integration.
