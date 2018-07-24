---
layout: page
title: "FutureNow Relay/Dimmer Lights"
description: "Instructions on how to set up FutureNow lights within Home Assistant."
date: 2018-07-24 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: p5.png
ha_category: Light
---

Using [P5](http://www.p5.hu) FutureNow relay/dimmer units' outputs as Lights. Currently supports: 
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
        name: Relay Channel 2```

Configuration variables:

- **driver** (*Required*): The type of the device. Currently either FNIP6x10ad or FNIP8x10a.
- **host** (*Required*): The network host of the device (static IP required).
- **port** (*Required*): TCP communication port. 7078 is the default configured in the units.
- **devices** (*Required*): Array of devices, organised by their channel number, specified by name.
- **dimmable** (*Optional*): Specify which channels are dimmable (only FNIP6x10ad unit).
