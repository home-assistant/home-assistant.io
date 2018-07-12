---
layout: page
title: "Velbus sensors"
description: "Access and control your Velbus sensors."
date: 2017-06-17 16.58
sidebar: true
comments: false
sharing: true
footer: true
logo: velbus.png
ha_category: Binary Sensor
ha_iot_class: "Local Push"
ha_release: "0.50"
---

The `velbus` binary_sensor allows you to control [Velbus](http://www.velbus.eu) connected wall switches.

## {% linkable_title Configuration %}

To use your Velbus wall switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: velbus
    devices:
      - name: Wall Switch 1
        module: 0xda
        channel: 4
      - name: Wall Switch 2
        module: 0xbc
        channel: 1
        is_pushbutton: true
```

{% configuration %}
devices:
  description: The list contains the binary sensors to configure.
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
    is_pushbutton:
      description: Set to indicate if a wall switch is a push button or not.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

For hub configuration, see [the Velbus component](/components/velbus/).
