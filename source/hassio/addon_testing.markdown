---
layout: page
title: "Local add-on testing"
description: "Instructions how to test your add-on locally."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

The fastest way to develop add-ons is by adding them to your local add-on repository. To access your local add-on repository, install either the [Samba add-on] or [SSH add-on].

Right now add-ons will only work with images that are stored on Dockerhub (using `image` from add-on config). We're working on enabling local add-ons to be built on the device.

## {% linkable_title Logs %}

All stdout and stderr is redirected to the Docker logs. The logs can be fetched from the add-on page inside the Hass.io panel in Home Assistant.

[Samba add-on]: /addons/samba/
[SSH add-on]: /addons/ssh/
