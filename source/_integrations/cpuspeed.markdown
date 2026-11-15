---
description: Instructions on how to integrate CPU speed within Home Assistant.
ha_release: pre 0.7
ha_domain: cpuspeed
---

The **CPU Speed** {% term integration %} allows you to monitor the current CPU speed.

{% include integrations/config_flow.md %}

## Known issues and limitations

Not all CPUs are supported. For example, some [ARM CPUs](https://github.com/workhorsy/py-cpuinfo/#cpu-support)
are known not to work with this integration.
