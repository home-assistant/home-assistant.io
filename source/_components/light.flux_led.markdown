---
layout: page
title: "Flux Led/MagicLight"
description: "Instructions how to setup Flux led/MagicLight within Home Assistant."
date: 2015-07-17 20:09
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
featured: true
ha_release: 0.25
---

Flux Led support is integrated into Home Assistant as a light platform. Several brands use the same protocol and they have the HF-LPB100 chipset in common.
Example of bulbs:
- http://www.fluxsmartlighting.com/
- [MagicLight® Plus - WiFi Smart LED Light Bulb4](https://www.amazon.com/gp/product/B00NOC93NG)
- [Flux WiFi Smart LED Light Bulb4](http://smile.amazon.com/Flux-WiFi-Smart-Light-Bulb/dp/B01A6GHHTE)
- [WIFI smart LED light Bulb1](http://smile.amazon.com/gp/product/B01CS1EZYK)

Configuration:

```yaml
light:
 - platform: flux_led
   automatic_add: BOOLEAN
   devices:
     IP_ADDR_1:
       name: CUSTOM_NAME_1
     IP_ADDR_2:
       name: CUSTOM_NAME_2
```

Configuration variables:

- **automatic_add** (*Optional*): To enable the automatic addition of lights on startup.
- **devices** (*Optional*): A list of devices with their ip address and a custom name to use in the frontend.

Example configuration:

Will automatically search and add all lights on start up:

```yaml
light:
 - platform: flux_led
   automatic_add: True
```

Will add two lights with given name:

```yaml
light:
 - platform: flux_led
   devices:
     192.168.0.106:
       name: flux_lamppost
     192.168.0.109:
       name: flux_living_room_lamp
```

