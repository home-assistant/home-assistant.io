---
title: "OS-Agent issues"
description: "More information on why missing OS-Agent marks the installation as unsupported."
---

## The issue

OS-Agent is how the Supervisor handles additional tasks on the host,
without it, the Supervisor won't be able to fulfill its tasks and responsibilities.

## The solution

Home Assistant Operating-System has had this preinstalled since version 6.0 - you need maybe reboot your system.

If the OS-Agent daemon is not running, start it.
If the [OS-Agent is not installed](https://github.com/home-assistant/os-agent), you need install it.
