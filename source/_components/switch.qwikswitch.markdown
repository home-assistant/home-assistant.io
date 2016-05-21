---
layout: page
title: "QwikSwitch Switch"
description: "Instructions how to integrate QwikSwitch Relays into Home Assistant."
date: 2016-05-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: qwikswitch.png
ha_category: Switch
ha_iot_class: "Local Push"
ha_release: 0.19
---


The `qwikswitch` platform allows you to control your [QwikSwitch](http://www.qwikswitch.co.za/) Relays as Switches from within Home Assistant.

QwikSwitch Relay devices can be Switches or [Lights](/components/qwikswitch/lights/) in Home-Assistant. If the device name in the QSUSB app ends with ` Switch` it will be created as a Switch, otherwise a Light.

They will be automatically discovered from the QSUSB API if the discovery component is enabled.

For more configuration information see the [QwikSwitch component](/components/qwikswitch/) documentation.
