---
layout: page
title: "Lutron Caseta Switch"
description: "Instructions on how to setup the Lutron Caseta switches within Home Assistant."
date: 2017-04-30 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Switch
ha_iot_class: "Local Polling"
---

To get Lutron Caseta switches working with Home Assistant, follow the instructions for the general [Lutron Caseta component](/components/lutron_caseta/).

After setup, switches will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a light switch called 'Master Bathroom Vanity' will appear in Home Assistant as `switch.master_bathroom_vanity`.

For dimmable lights including wall and plug-in dimmers, see [Lutron Caseta Light](/components/light.lutron_caseta/).

For more information on working with switches in Home Assistant, see the [Switches component](/components/switch/).

Available services: `switch.turn_on` and `switch.turn_off`.