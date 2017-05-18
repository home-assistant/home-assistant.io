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

Map the usb drive into add-on with `devices` options. If you need it on multible add-ons you can use the `/share` folder which is accessable from multibe add-ons.
It is also possible to create a add-on that only mount stuff to `share`.

You can format the usb device with multible volumes and map it to the specific add-on.

### {% linkable_title Generic %}

The `share` is default on `/usr/share/hassio/share` so you can mount your volumes into this folder.

