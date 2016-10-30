---
layout: page
title: "Pi-Hole Sensor"
description: "Instructions how to integrate REST sensors into Home Assistant."
date: 2016-09-03 16:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_iot_class: "Local Polling"
logo: pi_hole.png
ha_release: 0.28
---


The `pi_hole` sensor platform is displaying the statistical summary of a [Pi-Hole](https://pi-hole.net/) system.

To enable this sensor, add the following lines to your `configuration.yaml` file for a GET request:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pi_hole
```

Configuration variables:

- **host** (*Optional*): The IP address of the Pi-Hole system. Defaults to `localhost`.
- **ssl** (*Optional*): If `true`, use SSL/TLS to connect to the Pi-Hole system. Defaults to `False`.
- **verify_ssl** (*Optional*): Verify the certification of the system. Default to `True`.

