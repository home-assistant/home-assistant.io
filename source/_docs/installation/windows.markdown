---
layout: page
title: "Installation on a Windows system"
description: "Instructions to install Home Assistant on a Microsoft Windows system."
date: 2017-02-23 11:00
sidebar: true
comments: false
sharing: true
footer: true
---

To run Home Assistant on Microsoft Windows installation you need to install Python first. Download Python for [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/) and follow the instructions of the installer.

Start 

```bash
C:\...\> pip3 install homeassistant
C:\...\> py -m homeassistant --open-ui
```

For autostarting Home Assistant please refer to this [guide](https://community.home-assistant.io/t/autostart-on-windows/3504).

Check this [video](https://www.youtube.com/watch?v=X27eVvuqwnY) for the installation on Windows 10.

<p class='note warning'>
The Microsoft Windows platform is not a primary target to install Home Assistant. Also, not all tools and third-party modules will work.
</p>
