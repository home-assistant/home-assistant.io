---
layout: page
title: "Mipow Color"
description: "Instructions how to setup Mipow color BT le bulb within Home Assistant."
date: 2015-10-25
sidebar: true
comments: false
sharing: true
footer: true
logo: mipow.png
ha_category: Light
ha_iot_class: "Local Polling"
featured: false
ha_release: xx
---

The `Mipow color` support is integrated into Home Assistant as a light platform. Please note that this will only work on linux and requires a bluetooth adapter with LE support!

Example of bulbs:

- [Mipow Bulb](https://www.amazon.com/Bluetooth-Controlled-Dimmable-Decorative-Christmas/dp/B014H9YRS0/ref=pd_sbs_107_2?ie=UTF8&psc=1&refRID=8VF91QP5SHY2SJ398RTW)


The bulb is controlled normally using Playbulb X app on smartphones

To enable mipow control add following to  `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: mipow
```

Configuration variables:

- **name** (*Required*): Name for the bulb
- **serial** (*Required*): Bluetooth address of bulb (ex:00:00:00:00:00:00)


### {% linkable_title Example configuration %}

Will connect to specifed bulb using Bluetooth le:

```yaml
# Example configuration.yaml entry
light:
  platform: mipow
  name: room
  serial: '55:37:4B:12:AC:E6'
```

Available effects: Colorloop
NOTE: 2 flash settings available, slow and little faster, you HAVE to supply either rgb_color or brightness together with flash or it wont work. also, while they are called long and short, neither one of them will stop until new setting is sent

Example: Flash red
```json
{
 "flash":"long",
 "rgb_color":[255,0,0]
 }
 ```
 
