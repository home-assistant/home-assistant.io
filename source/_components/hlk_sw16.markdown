---
layout: page
title: "HLK-SW16 Relay Module"
description: "Instructions on how to integrate HLK-SW16 relay into Home Assistant."
date: 2018-10-29 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hlktech.jpg
ha_category: DIY
ha_release: 0.XX
ha_iot_class: "Local Push"
---

The [HLK-SW16](http://www.hlktech.net/product_detail.php?ProId=48) by [Hi-Link](http://www.hlktech.net/) is a simple networkable 16 port relay device.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
hlk_sw16:
  host: 10.225.225.53
  port: 8080
  switches:
    0:
      name: relay0
    1:
      name: relay1
    2:
      name: relay2
    3:
      name: relay3
    4:
      name: relay4
    5:
      name: relay5
    6:
      name: relay6
    7:
      name: relay7
    8:
      name: relay8
    9:
      name: relay9
    a:
      name: relaya
    b:
      name: relayb
    c:
      name: relayc
    d:
      name: relayd
    e:
      name: relaye
    f:
      name: relayf
```

{% configuration %}
host:
  description: The IP address or hostname of the HLK-SW16.
  required: true
  type: string
port:
  description: The control port for the relays.
  required: false
  type: integer
  default: 8080
switches:
  description: The array that contains the relays, each must be a number between 0 and 9 or letter between a and f which each corresponds to a labled relay switch on the HLK-SW16.
  required: true
  type: map
  keys:
    name:
      description: The name used to display the switch in the frontend.
      required: false
      type: string
      default: switch id
{% endconfiguration %}