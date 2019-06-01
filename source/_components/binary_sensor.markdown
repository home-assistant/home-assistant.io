---
layout: page
title: "Binary Sensor"
description: "Instructions on how-to setup binary sensors with Home Assistant."
date: 2015-11-20 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category:
  - Binary Sensor
ha_qa_scale: internal
ha_release: 0.9
---

Binary sensors gather information about the state of devices which have a "digital" return value (either 1 or 0). These can be switches, contacts, pins, etc. These sensors only have two states: **0/off/low/closed/false** and **1/on/high/open/true**.  Knowing that there are only two states allows Home Assistant to represent these sensors in a better way in the frontend according to their functionality.

<p class='img'>
<img src='/images/screenshots/binary_sensor_classes_icons.png' />
</p>
