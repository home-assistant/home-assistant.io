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

Configuration variables:
- **devices** array (*Required*): The array contains the fans to configure
  - **name** (*Required*): Name of the fan.
  - **module** (*Required*): The hexadecimal module address
  - **channel_low** (*Required*): The channel number in the module for low-speed.
  - **channel_medium** (*Required*): The channel number in the module for medium-speed.
  - **channel_high** (*Required*): The channel number in the module for high-speed.

For hub configuration, see [the Velbus component](/components/velbus/).
