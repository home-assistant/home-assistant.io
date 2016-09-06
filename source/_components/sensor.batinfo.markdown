---
layout: page
title: "BatInfo"
description: "Instructions how to integrate Battery information into Home Assistant."
date: 2016-09-06 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_release: 0.28
ha_iot_class: "Local Polling"
---

The `batinfo` sensor platform is using the information stored in `/sys/class/power_supply/` on your local Linux system. 

To setup a battery sensor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
senosr:
  - platform: batinfo
    name: House
```

Configuration variables:

- **name** (*Optional*): Friendly name to use for the frontend. Default to GPS.
