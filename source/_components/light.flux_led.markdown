---
layout: page
title: "Flux Led/MagicLight"
description: "Instructions how to setup Flux led/MagicLight within Home Assistant."
date: 2015-07-17 20:09
sidebar: true
comments: false
sharing: true
footer: true
logo: magic_light.png
ha_category: Light
ha_iot_class: "Local Polling"
featured: false
ha_release: 0.25
---

The `flux_led` support is integrated into Home Assistant as a light platform. Several brands use the same protocol and they have the HF-LPB100 chipset in common.

Example of bulbs:

- [Flux Smart Lighting](http://www.fluxsmartlighting.com/)
- [MagicLight® Plus - WiFi Smart LED Light Bulb4](https://www.amazon.com/gp/product/B00NOC93NG)
- [Flux WiFi Smart LED Light Bulb4](http://smile.amazon.com/Flux-WiFi-Smart-Light-Bulb/dp/B01A6GHHTE)
- [WIFI smart LED light Bulb1](http://smile.amazon.com/gp/product/B01CS1EZYK)

The chances are high that you bulb or controller (eg. WiFi LED CONTROLLER) will work if you can control the device with the MagicHome app.

To enable those lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: flux_led
```

Configuration variables:

- **automatic_add** (*Optional*): To enable the automatic addition of lights on startup.
- **devices** (*Optional*): A list of devices with their ip address and a custom name to use in the frontend.


### {% linkable_title Example configuration %}

Will automatically search and add all lights on start up:

```yaml
# Example configuration.yaml entry
light:
  - platform: flux_led
    automatic_add: True
```

Will add two lights with given name and create an automation rule to randomly set color each 45 seconds:

```yaml
light:
# Example configuration.yaml entry
  - platform: flux_led
    devices:
      192.168.0.106:
        name: flux_lamppost
      192.168.0.109:
        name: flux_living_room_lamp

automation:
  random_flux_living_room_lamp:
  trigger:
    platform: time
    seconds: '/45'
  action:
    service: light.turn_on
    data:
      entity_id: light.flux_living_room_lamp
      effect: random
```
