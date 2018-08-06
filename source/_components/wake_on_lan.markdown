---
layout: page
title: "Wake on LAN"
description: "Instructions on how to setup the Wake on LAN component in Home Assistant."
date: 2017-07-8 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ethernet.png
ha_category: Utility
ha_release: "0.49"
ha_iot_class: "Local Push"
---

The `wake_on_lan` component enables the ability to send _magic packets_ to [Wake on LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) capable devices, to turn them on.

To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
wake_on_lan:
```

### {% linkable_title Component services %}

Available services: `send_magic_packet`.

#### {% linkable_title Service `wake_on_lan/send_magic_packet` %}

Send a _magic packet_ to wake up a device with 'Wake-On-LAN' capabilities.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `mac`                     |       no | MAC address of the device to wake up.                 |
| `broadcast_address`       |      yes | Optional broadcast IP where to send the magic packet. |
