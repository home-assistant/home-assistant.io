---
layout: page
title: "Lutron Caseta Light"
description: "Instructions how to setup the Lutron Caseta lights within Home Assistant."
date: 2017-04-30 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Light
ha_iot_class: "Local Polling"
---

To get Lutron Caseta lights working with Home Assistant, follow the instructions for the general [Lutron Caseta component](/components/lutron_caseta/).

After setup, dimmable lights including wall and plug-in dimmers will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a light called 'Bedroom Lamp' will appear in Home Assistant as `light.bedroom_lamp`.

For non-dimmable lights or switched loads, see [Lutron Caseta Switch](/components/switch.lutron_caseta/).

For more information on working with lights in Home Assistant, see the [Lights component](/components/light/).

Available services: `light.turn_on`, `light.turn_off` and `light.toggle`. The `light.turn_on` service supports attributes `brightness` and `brightness_pct`.