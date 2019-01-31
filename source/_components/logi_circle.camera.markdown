---
layout: page
title: "Logi Circle Camera"
description: "Instructions on how to integrate your Logi Circle cameras within Home Assistant."
date: 2018-09-08 11:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logi_circle.png
ha_category: Camera
ha_release: 0.79
ha_iot_class: "Cloud Polling"
---

The `logi_circle` camera platform allows you to watch the still frames of your [Logi Circle](https://circle.logi.com/) camera's live stream in Home Assistant.

<p class='note'>
You must have the [Logi Circle component](/components/logi_circle/) configured to use this camera platform. The `logi_circle` camera will be automatically setup when you do.
</p>

Logi Circle cameras support the `camera.turn_on` and `camera.turn_off` services. This will set the streaming mode property of your camera accordingly, controlling whether the live stream is available and activity recordings are captured.