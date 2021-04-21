---
title: Linux Battery
description: Instructions on how to integrate Linux Battery information into Home Assistant.
logo: linux_battery.png
ha_category:
  - System Monitor
ha_release: 0.28
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: linux_battery
ha_platforms:
  - sensor
---

The `linux_battery` sensor platform is using the information stored in `/sys/class/power_supply/` on your local Linux system to display details about the current state of your battery.

To setup a battery sensor to your installation, add the following to your `configuration.yaml` file:

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
  default: linux
  type: string
{% endconfiguration %}
