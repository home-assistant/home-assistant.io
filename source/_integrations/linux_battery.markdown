---
title: Linux Battery
description: Instructions on how to integrate Linux Battery information into Home Assistant.
ha_category:
  - System monitor
ha_release: 0.28
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: linux_battery
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `linux_battery` sensor {% term integration %} is using the information stored in `/sys/class/power_supply/` on your local Linux system to display details about the current state of your battery.

To setup a battery sensor to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: linux_battery
```

{% configuration %}
name:
  description: Friendly name to use for the frontend.
  required: false
  default: Battery
  type: string
battery:
  description: Number of the battery.
  required: false
  default: 1
  type: integer
system:
  description: "The local system type. Support `linux` and `android`."
  required: false
  default: "`linux`"
  type: string
{% endconfiguration %}
