---
layout: page
title: "Abode Binary Sensor"
description: "Instructions on how to integrate Abode binary sensors into Home Assistant."
date: 2017-08-26 0:28
sidebar: true
comments: false
sharing: true
footer: true
logo: abode.jpg
ha_release: 0.52
ha_category: Binary Sensor
ha_iot_class: "Cloud Push"
---

The `abode` security control panel platform allows you to control your [Abode](https://goabode.com/) alarms.

This component will add `Door Contacts`, `Connectivity` sensors (remotes, keypads, and status indicators), `Moisture` sensors, and `Motion` or `Occupancy` sensors.

This component will also list all Abode `Quick Actions` that are set up. You can trigger these quick actions by passing the `entity_id` of your quick action binary sensor to the [trigger_quick_action service](/components/abode/#trigger_quick_action).

The requirement is that you have setup your [Abode hub](/components/abode/).
