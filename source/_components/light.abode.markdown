---
layout: page
title: "Abode Light"
description: "Instructions how to integrate Abode lights into Home Assistant."
date: 2017-08-26 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: abode.jpg
ha_release: 0.54
ha_category: Light
ha_iot_class: "Cloud Push"
---

The `abode` security control panel platform allows you to control your [Abode](https://goabode.com/) alarms.

This component will automatically add `Lights` configured in your Abode account. You can reclassify `Switches` to show up within Home Assistant as lights by listing the Abode device ID in your [configuration](/components/abode/#configuration).

The requirement is that you have setup your [Abode hub](/components/abode/).
