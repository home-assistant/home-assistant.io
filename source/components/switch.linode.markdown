---
layout: page
title: "Linode Switch"
description: "Instructions on how to set up Linode switch within Home Assistant."
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

The `linode` switch platform allows you to turn your Linode nodes on and off.

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: linode
    nodes:
      - 'myvpsname'
```

{% configuration linode %}
  nodes:
    description:  List of VPSs you want to control.
    required: true
    type: string
{% endconfiguration %}

