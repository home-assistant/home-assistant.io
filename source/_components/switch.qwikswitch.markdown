---
layout: page
title: "QwikSwitch Switch"
description: "Instructions on how to integrate QwikSwitch relays into Home Assistant."
date: 2016-05-04 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: qwikswitch.png
ha_category: Switch
ha_iot_class: "Local Push"
ha_release: "0.20"
---


The `qwikswitch` platform allows you to control your [QwikSwitch](http://www.qwikswitch.co.za/) relays as switches from within Home Assistant.

If the device name in the QS Mobile application ends with `Switch` it will be created as a switch, otherwise as a [light](/components/light.qwikswitch/).

The platform is configured through the [QwikSwitch component](/components/qwikswitch/).
