---
layout: page
title: "Velbus Switches"
description: "Access and control your Velbus Switches."
date: 2017-06-17 16.58
sidebar: true
comments: false
sharing: true
footer: true
logo: velbus.png
ha_category: Switch
ha_iot_class: "Local Push"
ha_release: "0.50"
---

The `velbus` switch allows you to control [Velbus](http://www.velbus.eu) connected switches.

## {% linkable_title Configuration %}

To use your Velbus switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

light:
  - platform: velbus
    devices:
      - name: Switch 1
        type: single
        module: 0xda
        channel: 4
      - name: Switch 2
        type: double
        module: 0xbc
        open_channel: 1
        close_channel: 2
```

{% configuration %}
devices:
  description: The list contains the switches to configure.
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
    type:
      description: "Either `single` or `double`. If single, only `channel` attribute is required. If `double`, both `open_channel:` and `close_channel:` keys are required."
      required: true
      type: string
{% endconfiguration %}

For hub configuration, see [the Velbus component](/components/velbus/).
