---
title: "D-Bus issues"
description: "More information on why missing D-Bus marks the installation as unsupported."
---

## The issue

D-Bus is how the Supervisor does most of the communication with the host,
without this, multiple things that the Supervisor needs to do will fail.

## The solution

If the D-Bus daemon is not running, start it.

If that does not help, reboot your operating system.

As a last resort, you need to reinstall the host running the Supervisor
with one of the supported operating systems, [see instructions here](/more-info/unsupported/os).
