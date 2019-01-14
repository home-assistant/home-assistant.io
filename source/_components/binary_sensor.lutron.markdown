---
layout: page
title: "Lutron Binary Sensor"
description: "Description of Lutron binary sensor component in Home Assistant."
date: 2019-01-22 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Binary Sensor
ha_iot_class: "Local Polling"
ha_release: 0.86
---

The Lutron binary sensor component adds binary sensors for buttons on Lutron RadioRA2 keypads so you can trigger Home Assistant actions when keypad buttons are pressed.

To use this component, follow the instructions for the general [Lutron component](/components/lutron/). The binary sensors will be added automatically.

This component supports two kinds of buttons on Lutron keypads: raise/lower buttons (which control shades or dimmable lights) and single-action buttons such as scene selectors.

Raise/lower buttons are represented as simple binary sensors whose state changes from `off` to `on` when they're pressed, and back to `off` when they're released.

The sensors for single-action buttons go from `off` to `on` and then immediately back to `off` again, regardless of how long the physical button is held down. This is a limitation of the Lutron controller, which doesn't give Home Assistant any way of knowing how long the button was pressed.
