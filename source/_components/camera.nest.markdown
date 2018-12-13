---
layout: page
title: "Nest Camera"
description: "Instructions on how to integrate Nest cameras into Home Assistant."
date: 2016-12-03 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Camera
ha_release: 0.34
ha_iot_class: "Cloud Poll"
---

The `nest` platform allows you to watch still frames from a video stream (not live stream) of your [Nest](https://nest.com/camera/meet-nest-cam/) camera in Home Assistant.

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use this camera.  The `nest` camera will automatically be setup when you do.
</p>

Nest Camera supports the `camera.turn_on` and `camera.turn_off` services since the 0.75 release.
