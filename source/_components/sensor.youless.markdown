---
layout: page
title: "Youless Sensor"
description: "Instructions on how to integrate the Youless sensor within Home Assistant."
date: 2018-10-31 20:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
ha_release: 0.82
ha_iot_class: "Local Polling"
---


The `youless` sensor platform allows getting various statistics from your [YouLess Device](http://youless.nl/).

## {% linkable_title Configuration %}

To use the `yoyless` sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: youless
    host: IP_ADDRESS_OF_YOULESS
    monitored_conditions:
      - pwr
      - gas
      - net
```

{% configuration %}
host:
  description: The IP address of the YouLess device to monitor.
  required: true
  type: string
monitored_conditions:
  description: Defines which measurements from the YouLess device to monitor
  required: true
  type: list
  keys:
    pwr:
      description: Displays the current power consumption.
    net:
      description: Displays the total power usage.
    p1:
      description: Displays the total power usage during low hours.
    p2:
      description: Displays the total power usage during high hours.
    n1:
      description: Displays the total power delivery low.
    n2:
      description: Displays the total power delivery high.
    cs0:
      description: Displays the total power for extra power meter connected.
    ps0:
      description: Displays the current power usage for extra power meter connected.
    gas:
      description: Displays the total gas usage.
{% endconfiguration %}
