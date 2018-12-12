---
layout: page
title: "Velbus Fans"
description: "Access and control your Velbus fans."
date: 2017-06-17 16.58
sidebar: true
comments: false
sharing: true
footer: true
logo: velbus.png
ha_category: Fan
ha_iot_class: "Local Push"
ha_release: "0.50"
---

The `velbus` fan allows you to control [Velbus](http://www.velbus.eu) connected fans.

## {% linkable_title Configuration %}

To use your Velbus fans in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fan:
  - platform: velbus
    devices:
      - name: Fan 1
        module: 0xda
        channel_low: 4
        channel_medium: 3
        channel_high: 2
```

{% configuration %}
devices:
  description: The list contains the fans to configure.
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
    channel_low:
      description: The channel number in the module for low-speed.
      required: true
      type: string
    channel_medium:
      description: The channel number in the module for medium-speed.
      required: true
      type: string
    channel_high:
      description: The channel number in the module for high-speed.
      required: true
      type: string
{% endconfiguration %}

For hub configuration, see [the Velbus component](/components/velbus/).
