---
layout: page
title: "Linux Battery"
description: "Instructions how to integrate Linux Battery information into Home Assistant."
date: 2016-09-06 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: linux_battery.png
ha_category: System Monitor
ha_release: 0.28
ha_iot_class: "Local Polling"
---

The `linux_battery` sensor platform is using the information stored in `/sys/class/power_supply/` on your local Linux system to display details about the current state of your battery.

To setup a battery sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: linux_battery
```

Configuration variables:

- **name** (*Optional*): Friendly name to use for the frontend. Default to "Battery".
- **battery** (*Optional*): Number of the battery. Default to `1`.
- **system** (*Optional*): Your local system name. Support `android`. Default to `linux`.
