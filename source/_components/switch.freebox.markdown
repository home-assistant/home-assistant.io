---
layout: page
title: "Freebox Switches"
description: "Instructions on how to integrate some switches to control a Freebox router in Home Assistant."
date: 2018-05-16 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: freebox.svg
ha_category: Switch
ha_release: "0.87"
ha_iot_class: "Local Polling"
---

This platform offers a switch to control the WiFi access point of a [Freebox](http://www.free.fr/) router.

<p class='note warning'>
By default, the permissions granted to applications on the Freebox router are not correct to make this platform available. You will need to add the permission "Modification des réglages de la Freebox" in "Gestion des accès", "Applications".
</p>

This requires you to have set up the [Freebox component](/components/freebox/)
