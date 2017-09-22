---
layout: page
title: "Z-Wave Controllers"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

## {% linkable_title Supported Z-Wave USB Sticks & Hardware Modules %}

[supported Z-Wave USB stick or module](https://github.com/OpenZWave/open-zwave/wiki/Controller-Compatibility-List)

| Device                  | Works on Linux | Works on Windows | Works on OSX |
|-------------------------|----------------|------------------|--------------|
| Aeotec Z-Stick Series 2 |   &#10003;     |                  |              |
| Aeotec Z-Stick Series 5 |   &#10003;     |                  |   &#10003;   |
| Pine64 Z-Wave Module    |   &#10003;     |                  |              |
| Razberry GPIO Module    |   &#10003;     |                  |              |
| ZWave.me UZB1           |   &#10003;     |                  |              |

## {% linkable_title Stick Alternatives %}

The alternative to a stick is a hub that supports Z-Wave. Home Assistant supports the following hubs with Z-Wave support:

 - [Vera](/components/vera/)
 - [Wink](/components/wink/)

## {% linkable_title Controller Notes }

### {% linkable_title Aoetec Stick }

By default this will turn on "disco lights", which you can turn off by following the details in the [settings page](z-wave/settings)

### {% linkable_title Razberry Board }

You need to disable the on-board Bluetooth since the board requires the use of the hardware UART (and there's only one on the Pi3). You do this by adding the following to the end of `/boot/config.txt`, then rebooting:

```
dtoverlay=pi3-disable-bt
```
