---
title: CPU Speed
description: Monitor the CPU speed of the device running Home Assistant.
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

The **CPU Speed** {% term integration %} lets you monitor the current CPU speed of the device running Home Assistant. It creates a sensor that reports the current CPU frequency in gigahertz.

{% include integrations/config_flow.md %}

## Supported functionality

The integration provides one sensor for the current CPU speed. The sensor can also include the CPU architecture, CPU brand, and advertised CPU speed as attributes when this information is available from the system.

## Known limitations

Not all CPUs provide speed information in a way that this integration can read. For example, some [ARM CPUs](https://github.com/workhorsy/py-cpuinfo/#cpu-support) are not supported by the library used by this integration.
