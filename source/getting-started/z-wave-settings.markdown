---
layout: page
title: "Z-Wave Settings"
description: "Extended instructions how to setup Z-Wave."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
---

You may wish to modify the Z-Wave settings in your `ozw*.xml` file (stored in the `.homeassistant` configuration directory), or certain situations/devices may require it (i.e. Aeon Multisensor 6). To do this, utilize [Open-Zwave Control Panel](https://github.com/OpenZWave/open-zwave-control-panel). Alternatively, use [Domoticz](https://www.domoticz.com/), which incorporates the Open-Zwave Control Panel project into an easy to use Raspberry Pi image.

The reasoning for using these tools is that your Z-Wave controller stores the values and data that are used to control the network. The XML file in the `.homeassistant` configuration directory acts as a settings/values cache for the Z-Wave network, so modifying it directly won't change the network values. The [Open-Zwave Control Panel](https://github.com/OpenZWave/open-zwave-control-panel) writes values directly to the network and will provide you with an updated `.xml` file to overwrite in your `.homeassistant` configuration directory. This is the most foolproof way to make modifications to your Z-Wave devices.

It's totally normal for your Z-Wave stick (Aeon Aeotec Z-Stick Gen5 for example) to cycle through its LEDs (Yellow, Blue and Red) while plugged into your system. If you don't like this behaviour it can be turned off.

Use the following example commands from a terminal session on your Pi where your Z-Wave stick is connected.

Turn off "Disco lights":

```bash
$ echo -e -n "\x01\x08\x00\xF2\x51\x01\x00\x05\x01\x51" > /dev/serial/by-id/usb-0658_0200-if00
```

Turn on "Disco lights":

```bash
$ echo -e -n "\x01\x08\x00\xF2\x51\x01\x01\x05\x01\x50" > /dev/serial/by-id/usb-0658_0200-if00
```
