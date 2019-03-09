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

To run Home Assistant on Microsoft Windows installation you need to install Python first. Download Python (the latest version of Python 3.6 is recommended) for [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/) and follow the instructions of the installer.

<p class='note'>
There may be alpha or beta releases of Python listed on that download page (marked by the letters `a` or `b` in the version number. Do not use these versions.
</p>

If you use your machine for something other than Home Assistant, you should install it in a [Python virtual environment](#installing-in-a-python-virtual-environment).

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

## {% linkable_title Updating %}

To update Home Assistant, stop it and then run:

```bash
C:\...\> pip3 install --upgrade homeassistant
```

Then start Home Assistant.

## {% linkable_title Installing in a Python virtual environment %}

Open `cmd.exe` and paste the following commands (one at the time):

```bash
C:\...\> py -m venv homeassistant
C:\...\> cd homeassistant
C:\...\> Scripts\activate.bat
C:\...\> py -m pip install wheel setuptools pip
C:\...\> py -m pip install homeassistant
C:\...\> hass
```

## {% linkable_title Upgrading in a Python virtual environment %}

To update Home Assistant, stop it and then open `cmd.exe` and paste the following commands (one at the time):

```bash
C:\...\> cd homeassistant
C:\...\> Scripts\activate.bat
C:\...\> py -m pip install --upgrade homeassistant
```
Then start Home Assistant.
