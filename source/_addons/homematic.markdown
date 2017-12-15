---
layout: page
title: "HomeMatic"
description: "HomeMatic hardware support to turn you Home-Assistant into a CCU."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Set up a [HomeMatic](https://github.com/eq-3/occu) hardware layer. At the moment we don't support hmIP but that is in progress. For learning and handling devices use our internal homematic panel and services (in progress) or use [Homematic-Manager](https://github.com/hobbyquaker/homematic-manager) > 2.0.

The logic layer will be Home-Assistant. There is no ReGa or other logic layer installed. You can't import exists configuration, you need new learn it into Home-Assistant.

Follow devices will be supported and tested:
- [HM-MOD-RPI-PCB](https://www.elv.ch/homematic-funkmodul-fuer-raspberry-pi-bausatz.html)

```json
{
  "type": "CCU2",
  "device": "/dev/ttyAMA0"
}
```

Configuration variables:

- **type** (*Require*): Device type for RFD service. Look into handbook of your device.
- **device** (*Require*): Device on host.

## {% linkable_title Home Assistant configuration %}

Use the following configuration in Home Assistant to use it:

```yaml
homematic:
  interfaces
    BidCoS-RF:
      host: core-homematic
      port: 2001
```

## {% linkable_title Raspberry Pi3 %}

With HM-MOD-PRI-PCB you need add follow into your `config.txt` on boot partition:
```
dtoverlay=pi3-miniuart-bt
```
