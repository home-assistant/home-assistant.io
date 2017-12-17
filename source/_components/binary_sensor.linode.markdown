---
layout: page
title: "Linode Binary Sensor"
description: "Instructions on how to set up Linode binary sensors within Home Assistant."
date: 2017-10-20 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: linode.png
ha_release: 0.57
ha_iot_class: "Cloud Polling"
---

The `linode` binary sensor platform allows you to monitor your Linode nodes.

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: linode
    nodes:
      - 'myvpsname'
```

{% configuration %}
  nodes:
    description:  List of VPSs you want to control.
    required: true
    type: string
{% endconfiguration %}

