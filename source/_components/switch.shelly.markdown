---
layout: page
title: "Shelly Wifi Switch"
description: "Instructions for the Shelly.cloud Wifi switch"
date: 2018-08-28 11:42
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.76
ha_iot_class: "Local Polling"
---


The `shelly` switch platform allows you to toggle the [Shelly.cloud](https://shelly.cloud) Shelly1 and Shelly2 switches using the HTTP API.

Before enabling the component on Home Assistant, be sure to have configured the Switches to access your Wifi Network first.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: shelly
  switches:
    living_room_light:
      host: hostname_or_ipaddr
```

Configuration variables:

- **switches** (*Required*): The array that contains all Shelly switches.
  - **identifier** (*Required*): Name of the Shelly switch as slug. Multiple entries are possible.
    - **host** (*Required*): Hostname or IP address of the switch on the local network.
    - **name** (*Optional*): Friendly name of the switch.
    - **path** (*Optional*): Path of the desired relay. Defaults `/relay/0`. For the second relay of Shelly 2 use '/relay/1'
    - **username** (*Optional*): Username for basic authentication.
    - **password** (*Optional*): Password for basic authentication.
