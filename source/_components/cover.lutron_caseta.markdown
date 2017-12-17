---
layout: page
title: "Lutron Caseta Cover"
description: "Instructions how to setup the Lutron Caseta covers within Home Assistant."
date: 2017-05-20 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Cover
ha_iot_class: "Local Polling"
ha_release: 0.45
---

To get Lutron Caseta roller and honeycomb shades working with Home Assistant, first follow the instructions for the general [Lutron Caseta component](/components/lutron_caseta/).

After setup, shades will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a shade called 'Living Room Window' will appear in Home Assistant as `cover.living_room_window`.

For more information on working with shades in Home Assistant, see the [Covers component](/components/cover/).

Available services: `cover.open_cover`, `cover.close_cover` and `cover.set_cover_position`. Cover `position` ranges from `0` for fully closed to `100` for fully open.