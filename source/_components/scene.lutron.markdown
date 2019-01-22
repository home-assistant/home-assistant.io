---
layout: page
title: "Lutron Scene"
description: "Instructions on how to set up the Lutron scenes within Home Assistant."
date: 2018-10-09 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Scene
ha_iot_class: "Local Polling"
ha_release: 0.85
---

To get your Lutron scenes working with Home Assistant, follow the instructions for the general [Lutron component](/components/lutron/).

This component uses keypad programming to identify scenes.  Currently, it only works with SeeTouch keypads.
The Lutron scene platform allows you to control scenes programmed into your SeeTouch keypads.

After setup, scenes will appear in Home Assistant using the area, keypad, and button name.
