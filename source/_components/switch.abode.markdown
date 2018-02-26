---
layout: page
title: "Abode Switch"
description: "Instructions how to integrate Abode switches into Home Assistant."
date: 2017-08-26 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: abode.jpg
ha_release: 0.52
ha_category: Switch
ha_iot_class: "Cloud Push"
---

The `abode` security control panel platform allows you to control your [Abode](https://goabode.com/) alarms.

This component will automatically add `Power Switches` configured in your Abode account. You can reclassify switches to show up within Home Assistant as `Lights` by listing the Abode device ID in your [configuration](/components/abode/#configuration).

This component will also list all Abode `Automations` that are set up within the Abode system, allowing you to activate and deactivate the automations.

The requirement is that you have setup your [Abode hub](/components/abode/).
