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
ha_platforms:
  - sensor
---

The `cpuspeed` sensor platform to allow you to monitor the current CPU speed.

<div class='note warning'>

  You can't use this sensor in a container (only Home Assistant Core is supported) as it requires access to the physical CPU. Also, not all [ARM CPUs](https://github.com/workhorsy/py-cpuinfo/#cpu-support) are supported.

</div>

## Configuration

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: cpuspeed
```

{% configuration %}
name:
  description: Name to use in the frontend.
  required: false
  type: string
  default: CPU speed
{% endconfiguration %}
