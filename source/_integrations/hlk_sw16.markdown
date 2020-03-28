---
title: Hi-Link HLK-SW16
description: Instructions on how to integrate HLK-SW16 relay into Home Assistant.
logo: hlktech.jpg
ha_category:
  - DIY
  - Switch
ha_release: 0.84
ha_iot_class: Local Push
ha_domain: hlk_sw16
---

The [HLK-SW16](http://www.hlktech.net/product_detail.php?ProId=48) by [Hi-Link](http://www.hlktech.net/) is a simple networkable 16 port relay device.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
hlk_sw16:
  relay1:
    host: 10.225.225.53
    switches:
      0:
        name: relay1-0
      1:
        name: relay1-1
      2:
        name: relay1-2
      3:
        name: relay1-3
      4:
        name: relay1-4
      5:
        name: relay1-5
      6:
        name: relay1-6
      7:
        name: relay1-7
      8:
        name: relay1-8
      9:
        name: relay1-9
      a:
        name: relay1-a
      b:
        name: relay1-b
      c:
        name: relay1-c
      d:
        name: relay1-d
      e:
        name: relay1-e
      f:
        name: relay1-f
```

{% configuration %}
deviceid:
  description: The array that contains the HLK-SW16 devices.
  required: true
  type: map
  keys:
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
      description: The array that contains the relays.
      required: true
      type: map
      keys:
        relayid:
          description: The array that contains the HLK-SW16 relays, each must be a number between 0 and 9 or letter between a and f which each corresponds to a labeled relay switch on the HLK-SW16.
          required: false
          type: map
          keys:
            name:
              description: The name used to display the switch in the frontend.
              required: false
              type: string
              default: relayid
{% endconfiguration %}
