---
layout: page
title: "AVM FRITZBOX (Guest) WIFI Switch"
description: "Instructions on how to integrate your AVM FRITZBOX (Guest) WIFI as switches into Home Assistant."
date: 2018-12-23 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Switch
ha_iot_class: "Local Polling"
---


The `fritzbox_wifi` switch allows you to switch on/off your AVM FRITZBOX 2,4GHz/5GHz/Guest-WiFi.

If you have more then one Fritzbox, multiple Fritzboxes ar supported.
If you want to controll 2,4GHz an Guest-Wifi setup 2 switches (and so on)...


To use your AVM FRITZBOX WiFi switch(es) in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: fritzbox_wifi
    host: 192.168.XXX.XXX
    password: "YOURPASSWORD"
    name: "NAME-OF-THE-SWITCH-SHOW-UP-IN-HA"
    interface: 3
```

{% configuration %}
host:
  description: The IP for your Fritz!Box.
  required: false
  type: string
  default: fritz.box
password:
  description: The password for your Fritz!Box.
  required: true
  type: string
name:
  description: The switch name in your HA installtion.
  required: false
  type: string
  default: "Guest WiFi"
username:
  description: The username of your Fritzbox Login of you have.
  required: false
  type: string
interface:
  description: The WiFi interface you want to control. Most modern Fritzboxes have 3 Network-Interfaces:
  2,4GHz -> 1, 5GHz -> 2, Guest Wifi -> 3. If you have no 5GHz, Guest Wifi should be interface:2.
  required: false
  type: integer
  default: 3
{% endconfiguration %}
