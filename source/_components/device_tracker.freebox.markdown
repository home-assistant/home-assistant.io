---
layout: page
title: "Freebox Device Tracker"
description: "Instructions on how to track devices connected to a Freebox router in Home Assistant."
date: 2018-05-16 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: freebox.svg
ha_category: Presence Detection
ha_release: "0.70"
ha_iot_class: "Local Polling"
---


This platform offers presence detection by keeping track of the
devices connected to a [Freebox](http://www.free.fr/) router.

This requires you to have set up the [Freebox component](/components/freebox/)

### {% linkable_title Notes %}

Note that the Freebox waits for some time before marking a device as
inactive, meaning that there will be a small delay (1 or 2 minutes)
between the time you disconnect a device and the time it will appear
as "away" in Home Assistant. You should take this into account when specifying
the `consider_home` parameter.
On the contrary, the Freebox immediately reports devices newly connected, so
they should appear as "home" almost instantly, as soon as Home Assistant
refreshes the devices states.

See the [device tracker component page](/components/device_tracker/) for
instructions how to configure the devices to be tracked.

