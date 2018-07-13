---
layout: page
title: "LifeSOS Switch"
description: "Instructions on how to setup the LifeSOS switch within Home Assistant."
date: 2018-07-03 22:15
sidebar: true
comments: false
sharing: true
footer: true
logo: lifesos.png
ha_release: 0.73
ha_category: Switch
ha_iot_class: "Local Push"
---

The `lifesos` switch platform allows you to control the state of your [LifeSOS](http://lifesos.com.tw/) switches.

The requirement is that you have setup [LifeSOS](/components/lifesos/).

<p class='note'>
  RF switches only communicate one-way, from base unit to switch. If you change the state via the power button on the switch, the state will not be accurately reflected in Home Assistant or on the base unit.
</p>
