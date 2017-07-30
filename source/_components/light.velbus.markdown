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

Configuration variables:
- **devices** array (*Required*): The array contains the lights to configure
  - **name** (*Required*): Name of the light.
  - **module** (*Required*): The hexadecimal module address
  - **channel** (*Required*): The channel number in the module.

For hub configuration, see [the Velbus component](/components/velbus/).
