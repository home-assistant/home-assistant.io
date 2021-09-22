---
title: "OS-Agent issues"
description: "More information on why missing OS-Agent marks the installation as unsupported."
---

## The issue

OS-Agent is how the Supervisor does handle additional tasks on the host,
without this, multiple things that the Supervisor needs to do will fail.

## The solution

Home Assistant Operating-System have this preinstall since Vesion 6.0 - you need maybe reboot your system.

If the OS-Agent daemon is not running, start it.
If the [OS-Agent is not installed](https://github.com/home-assistant/os-agent), you need install it.
