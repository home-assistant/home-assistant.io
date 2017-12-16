---
layout: page
title: "iGlo"
description: "Instructions how to integrate LIFX into Home Assistant."
date: 2017-12-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: iglo.png
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.60
---

The `iGlo` platform allows you to integrate your [iGlo Lights](https://www.youtube.com/watch?v=oHTS9ji_v-s) into Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  - platform: iglo
    host: "192.168.1.10"
    name: Kids Light
    port: 8080
```
Configuration variables:

{% configuration %}
  host:
    required: true
    description: The address for connecting to the light.
    type: string
  name:
    required: false
    description: The name for this light.
    default: iGlo Light
    type: string
  port:
    required: false
    description: The port used to connect to the light.
    default: 8080
    type: integer
{% endconfiguration %}