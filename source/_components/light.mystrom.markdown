---
layout: page
title: "myStrom WiFi Bulb"
description: "Instructions on how to integrate myStrom WiFi Bulbs into Home Assistant."
date: 2017-04-18 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mystrom.png
ha_category: Light
ha_release: 0.43
ha_iot_class: "Local Polling"
---


The `mystrom` light platform allows you to control your [myStrom](https://mystrom.ch/en/) WiFi Bulbs. 

To use your myStrom WiFi Bulb in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mystrom
    host: IP_ADDRESS
    mac: MAC_ADDRESS
```

{% configuration %}
host:
  description: "The IP address of your myStrom WiFi Bulb, e.g., `192.168.1.32`."
  required: true
  type: string
mac:
  description: "The MAC address of your myStrom WiFi Bulb, e.g., `5AAC8CA542F3`."
  required: true
  type: string
name:
  description: The name to use when displaying this bulb.
  required: false
  type: string
  default: myStrom Bulb
{% endconfiguration %}

Check if you are able to access the light located at `IP_ADRRESS`. The details about your light is provided as a JSON response.

```bash
$ curl http://[IP_ADDRESS]/api/v1/device/[MAC_ADDRESS]

{
  "MAC_ADDRESS": {
    "type": "rgblamp",
    "battery": false,
    "reachable": true,
    "meshroot": false,
    "on": true,
    "color": "0;0;100",
    "mode": "hsv",
    "ramp": 409,
    "power": 5.1,
    "fw_version": "2.25"
  }
}
```

