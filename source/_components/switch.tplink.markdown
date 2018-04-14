---
layout: page
title: "TP-Link Switch"
description: "Instructions on how to integrate TP-Link switches into Home Assistant."
date: 2016-07-13 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tp-link.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: "0.24"
---


The `tplink` switch platform allows you to control the state of your [TP-Link smart switch](http://www.tp-link.com/en/products/list-5258.html).

Supported units:

- HS100
- HS105
- HS110
- HS200

To use your TP-Link switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: tplink
    host: IP_ADDRESS
    name: switch
  - platform: tplink
    host: IP_ADDRESS
    name: another switch
```

{% configuration %}
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: TP-Link Switch
host:
  description: "The IP address of your TP-Link switch, eg. `192.168.1.32`."
  required: true
  type: string
enable_leds:
  description: If the LEDs on the switch (WiFi and power) should be lit.
  required: false
  type: boolean
{% endconfiguration %}

