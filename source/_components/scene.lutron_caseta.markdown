---
layout: page
title: "Lutron Caseta Scene"
description: "Instructions on how to setup Lutron Caseta Scenes within Home Assistant."
date: 2017-07-28 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Scene
ha_release: 0.49.2
ha_iot_class: "Cloud Polling"
---

To get Lutron Caseta Scenes working with Home Assistant, follow the instructions for the general [Lutron Caseta component](/components/lutron_caseta/).

The Lutron Caseta scene platform allows you to control your Smart Bridge Scenes that are created in the Lutron mobile app.

After setup, scenes will appear in Home Assistant using an `entity_id` based on the name used in the Lutron mobile app. For example, a scene called 'Entertain' will appear in Home Assistant as `scene.entertain`.

For more information on working with scenes in Home Assistant, see the [Scenes component](/components/scene/).

Available services: `scene.turn_on`.
