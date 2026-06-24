---
title: CPU Speed
description: Monitor the CPU speed of the system running Home Assistant.
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

The **CPU Speed** {% term integration %} monitors the current CPU speed of the system running Home Assistant.

Use this integration when you want to see the processor speed reported by your Home Assistant system.

{% include integrations/config_flow.md %}

## Supported functionality

The CPU Speed integration provides one sensor that shows the current CPU speed in GHz.

The sensor can also include CPU details, such as the processor architecture, processor brand, and advertised CPU speed, when your system provides that information.

## Known limitations

Not all CPUs report the information this integration needs. For example, some [ARM CPUs](https://github.com/workhorsy/py-cpuinfo/#cpu-support) are known not to work with this integration.
