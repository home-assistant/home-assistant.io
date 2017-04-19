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

You may wish to modify the zwave settings ozw*.xml file in your .homeassistant root folder, or certain situations/devices may require it (i.e. Aeon Multisensor 6). To do this, utilize [Open-Zwave Control Panel](https://github.com/OpenZWave/open-zwave-control-panel). Alternatively, use [Domoticz](https://www.domoticz.com/), which incorporates the Open-Zwave Control Panel project into an easy to use Raspberry Pi image.

The reasoning for using these tools is that your Zwave controller stores the values and data that are used to control the network. The XML file in the .homeassistant folder acts as a settings/values cache for the zwave network, so modifying it directly won't change the network values. The Open-Zwave Control Panel writes values directly to the network, and will provide you with an updated .xml file to overwrite in your .homeassistant folder. This is the most foolproof way to make modifications to your zwave devices.
