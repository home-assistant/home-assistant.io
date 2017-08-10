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

Configuration variables:
- **devices** array (*Required*): The array contains the switches to configure
  - **name** (*Required*): Name of the switch.
  - **module** (*Required*): The hexadecimal module address
  - **type** (*Required*): Either `single` or `double`. If single, only `channel` attribute is required. If double, both `open_channel` and `close_channel` attributes are required
  - **channel** (*Required*): The channel number in the module.

For hub configuration, see [the Velbus component](/components/velbus/).
