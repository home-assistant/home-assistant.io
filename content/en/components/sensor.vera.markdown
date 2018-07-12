---
layout: page
title: "Vera Sensor"
description: "Instructions on how to integrate Vera sensors into Home Assistant."
date: 2015-10-20 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: vera.png
ha_category: Sensor
ha_iot_class: "Local Push"
ha_release: pre 0.7
---

The `vera` platform allows you to get data from your [Vera](http://getvera.com/) sensors from within Home Assistant.
  
They will be automatically discovered if the vera component is loaded.

Please note that some vera sensors (such as _motion_ and _flood_  sensors) are _armable_ which means that vera will send alerts (email messages to txts) when they are _armed_ and change state.

Home Assistant will display the state of these sensors regardless of the _armed_ state.

To allow you to change the _armed state_ - Home Assistant will create a switch as well as a sensor for each _Armable_ sensor. You can hide these switches using customization if you wish.
