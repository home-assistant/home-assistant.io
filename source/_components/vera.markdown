---
layout: page
title: "Vera"
description: "Instructions how to setup Vera hubs within Home Assistant."
date: 2015-03-23 20:04
sidebar: true
comments: false
sharing: true
footer: true
logo: vera.png
ha_category: Hub
---


The [Vera](http://getvera.com) ecosystem is using Z-Wave for communication between the Vera controller and the devices.

```yaml
vera:
  vera_controller_url: http://192.168.1.161:3480/
  # Optional to exclude devices - this is a list of vera device ids
  exclude: [ 13, 14, 16, 20, 23, 72, 73, 74, 75, 76, 77, 78, 88, 89, 99]
  # Optional to import switches as lights - this is a list of vera device ids
  lights: [15, 17, 19, 21, 22, 24, 26, 43, 64, 70, 87]
```
