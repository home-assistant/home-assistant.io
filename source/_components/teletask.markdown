---
layout: page
title: "Teletask"
description: "Instructions on how to integrate Teletask components with Home Assistant."
date: 2019-02-06 20:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.87
ha_iot_class: "Local Polling"
---


The [Teletask](http://www.teletask.be) integration for Home Assistant allows you to connect to a Teletask DoIP devices.

<p class='note warning'>
  Please note, the `teletask` platform does not support Windows and needs at least python version 3.5. Teletask Micros+/Picos should be enabled with the TDS15132 module.
</p>

There is currently support for the following device types within Home Assistant:

- [Switch](/components/switch.teletask)
- [Light](/components/light.teletask)

## {% linkable_title Configuration %}

To use your Teletask in your installation, add the following lines to your `configuration.yaml` file:

```yaml
teletask:
  host: 192.168.1.100
  port: 55957
```


{% configuration %}
host:
  description: Host of the Teletask Controller device.
  type: string
port:
  description: Port of the Teletask Controller device.
  type: integer
{% endconfiguration %}