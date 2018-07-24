---
layout: page
title: "P5 FutureNow Lights"
description: "Instructions on how to set up P5 FutureNow relay/dimmer units as lights within Home Assistant."
date: 2018-07-24 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: p5.png
ha_category: Light
---

Using [P5](http://www.p5.hu) FutureNow relay/dimmer units as Lights. Currently supports: 
* [FutureNow FNIP-6x2AD](http://www.p5.hu/index.php/products/ethernet-modules/265-fnip-6x2ad) dimmer unit (outputs only)
* [FutureNow FNIP-8x10A](http://www.p5.hu/index.php/products/ethernet-modules/263-fnip-8x10a) relay unit (outputs only)

To use your FutureNow units, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: futurenow
    driver: FNIP6x10ad
    host: 192.168.1.101
    port: 7078
    devices:
      5:
        name: Dimmer Channel 5
        dimmable: 1
      6:
        name: Dimmer Channel 6
        dimmable: 1

  - platform: futurenow
    driver: FNIP8x10a
    host: 192.168.1.102
    port: 7078
    devices:
      1:
        name: Relay Channel 1
      2:
        name: Relay Channel 2
```

Configuration variables, all required:

- **driver**: Type of the device. Currently `FNIP6x10ad` or `FNIP8x10a`.
- **host**: Network host/ip of the device (static IP required).
- **port**: TCP communication port (default is 7078).
- **devices**: List of devices, organised by their channel number, specified by `name`. Optionally set `dimmable: 1` to channel to enable dimming (only FNIP6x10ad unit).
