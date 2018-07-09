---
layout: page
title: "Velbus lights"
description: "Access and control your Velbus lights."
date: 2017-06-17 16.58
sidebar: true
comments: false
sharing: true
footer: true
logo: velbus.png
ha_category: Light
ha_iot_class: "Local Push"
ha_release: "0.50"
---

The `velbus` light allows you to control [Velbus](http://www.velbus.eu) lights.

## {% linkable_title Configuration %}

To use your Velbus lights in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: velbus
    devices:
      - name: Light 1
        module: 0xda
        channel: 4
      - name: Light 2
        module: 0xbc
        channel: 1
```

{% configuration %}
devices:
  description: The list contains the lights to configure.
  required: true
  type: map
  keys:
    name:
      description: Name to use in the frontend.
      required: true
      type: string
    module:
      description: The hexadecimal module address.
      required: true
      type: string
    channel:
      description: The channel number in the module.
      required: true
      type: string
{% endconfiguration %}

For hub configuration, see [the Velbus component](/components/velbus/).
