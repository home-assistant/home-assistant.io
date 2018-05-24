---
layout: page
title: "Netdata"
description: "Instructions on how to integrate Netdata within Home Assistant."
date: 2016-12-05 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netdata.png
ha_category: System Monitor
ha_release: 0.35
ha_iot_class: "Local Polling"
---


The `netdata` sensor platform allows you to display information collected by [Netdata](http://my-netdata.io/).

## {% linkable_title Configuration %}



To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netdata
    resources:
      system.load:
        element: load15
      system.cpu:
        element: system
```

{% configuration %}
host:
  description: The IP address or hostname of your Netdata instance.
  required: false
  type: string
  default: localhost
port:
  description: The port that the Netdata instance is running on.
  required: false
  type: int
  default: 19999
name:
  description: Name of the monitored Netdata instance.
  required: false
  type: number
  default: Netdata
resources:
  description: List of details to monitor.
  required: true
  type: map
  keys:
    data_group:
      description: "Name of the data group to monitor, e.g., `system.cpu`." 
      required: true
      keys:
        element:
          description: The element of the group to monitor.
          required: true
          type: string
        name:
          description: Name to use for the sensor in the frontend.
          required: false
          type: string
          default: element name
        icon:
          description: Icon to use for the sensor.
          required: false
          type: string
          default: "mdi:desktop-classic"
{% endconfiguration %}

