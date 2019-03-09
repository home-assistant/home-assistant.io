---
layout: page
title: "Autostart on macOS"
description: "Instructions on how to setup Home Assistant to launch on Apple macOS."
date: 2015-9-1 22:57
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/autostart-macos/
---

Setting up Home Assistant to run as a background service is simple; macOS will start Home Assistant after the system has booted, the user has logged in, and make sure it's always running.

To get Home Assistant installed as a background service, run:


```bash
$ hass --script macos install

Home Assistant has been installed.         Open it here: http://localhost:8123
```

Home Assistant will log to `~/Library/Logs/homeassistant.log`

To uninstall the service, run:

```bash
$ hass --script macos uninstall

Home Assistant has been uninstalled.
```
