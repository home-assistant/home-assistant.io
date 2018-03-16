---
layout: page
title: "Juicenet Sensor"
description: "Instructions on how to setup WiFi-equipped Juicenet charging stations with Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: juicenet.png
ha_category: Sensor
ha_release: 0.47
---


The `juicenet` sensor platform allows you to get data from your [JuiceNet](https://emotorwerks.com/products/juicenet/) sensors.

The requirement is that you have setup [Juicenet](/components/juicenet/).

### {% linkable_title Added sensors %}

These sensors will be added for each juicenet device in your account:

- Status
- Temperature (inside the device)
- Voltage
- Amps
- Watts
- Charge time of session
- Energy added this session
