---
layout: page
title: "Abode Camera"
description: "Instructions on how to integrate Abode cameras into Home Assistant."
date: 2017-08-26 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: abode.jpg
ha_release: 0.54
ha_category: Camera
ha_iot_class: "Cloud Push"
---

The `abode` security control panel platform allows you to control your [Abode](https://goabode.com/) alarms.

This component will automatically add `Cameras` configured in your Abode account. You can request a new still image capture by passing the `entity_id` of your cameras to the [capture_image service](/components/abode/#capture_image).

The requirement is that you have setup your [Abode hub](/components/abode/).
