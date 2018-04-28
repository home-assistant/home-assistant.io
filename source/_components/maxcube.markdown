---
layout: page
title: "eQ-3 MAX! Cube"
description: "Instructions on how to integrate eQ-3 MAX! components with Home Assistant via eQ-3 MAX! Cube."
date: 2017-02-04 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: maxcube.png
ha_category: Climate
ha_release: "0.40"
ha_iot_class: "Local Polling"
---

[eQ-3 MAX!](http://www.eq-3.com/products/max.html) integration for Home Assistant allows you to connect eQ-3 MAX! components via the eQ-3 MAX! Cube. The components connects to the eQ-3 MAX! Cube via TCP and automatically makes all supported components available in Home Assistant. The name for each device is created by concatenating the MAX! room and device names.

Limitations:
- Configuring weekly schedules is not possible.
- Implementation is based on the reverse engineered [MAX! protocol](https://github.com/Bouni/max-cube-protocol).

Supported Devices:
- MAX! Radiator Thermostat (tested)
- MAX! Radiator Thermostat+
- MAX! Window Sensor (tested)
- MAX! Wall Thermostat (tested)

### {% linkable_title One Gateway %}

A `maxcube` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
maxcube:
  gateways:
    - host: 192.168.0.20
```

### {% linkable_title Multiple Gateways %}

```yaml
# Example configuration.yaml entry
maxcube:
  gateways:
    - host: 192.168.0.20
      port: 62910
    - host: 192.168.0.21
      port: 62910
```

{% configuration %}
  host:
    description: The IP address of the eQ-3 MAX! Cube to use.
    required: true
    type: string
  port:
    description: The UDP port number.
    required: false
    type: int
    default: 62910
{% endconfiguration %}
