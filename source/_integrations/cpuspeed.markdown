---
title: CPU Speed
description: Instructions on how to integrate CPU speed within Home Assistant.
logo: cpu.png
ha_category:
  - System Monitor
ha_release: pre 0.7
ha_iot_class: Local Push
ha_codeowners:
  - '@fabaff'
ha_domain: cpuspeed
ha_config_flow: true
ha_platforms:
  - sensor
---

The CPU Speed integration allows you to monitor the current CPU speed.

<div class='note warning'>

  You can't use this sensor in a container (only Home Assistant Core is supported) as it requires access to the physical CPU. Also, not all [ARM CPUs](https://github.com/workhorsy/py-cpuinfo/#cpu-support) are supported.

</div>

{% include integrations/config_flow.md %}
