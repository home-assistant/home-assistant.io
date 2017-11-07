---
layout: page
title: "External device"
description: "How to map external device on Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---


### {% linkable_title ResinOS / Generic %}

Map the USB drive into add-on with `devices` options. If you need it on multiple add-ons, you can use the `/share` folder which is accessible from various add-ons.
It is also possible to create an add-on that only mounts stuff to `share`.

You can format the USB device with multiple volumes and map it to a specific add-on.

### {% linkable_title Generic %}

The `share` defaults to `/usr/share/hassio/share` so you can mount your volumes into this folder.
