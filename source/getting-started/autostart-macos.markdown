---
layout: page
title: "Autostart on macOS boot"
description: "Instructions how to setup Home Assistant to launch on macOS boot."
date: 2015-9-1 22:57
sidebar: true
comments: false
sharing: true
footer: true
---

Setting up Home Assistant to run as a background service is simple. OS X will start it on boot and make sure it's always running.

To get Home Assistant installed as a background service, run:


```bash
$ hass --install-osx

Home Assistant has been installed.         Open it here: http://localhost:8123
```

Home Assistant will log to `~/Library/Logs/homeassistant.log`

To uninstall the service, run:

```bash
$ hass --uninstall-osx

Home Assistant has been uninstalled.
```
