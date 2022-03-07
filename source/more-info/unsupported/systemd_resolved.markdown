---
title: "Systemd-Resolved"
description: "More information on why systemd-resolved marks the installation as unsupported."
---

## The issue

Systemd-resolved is used over DBus to resolve DNS queries made by Home Assistant, Supervisor,
and Add-Ons. Without it, DNS will not work correctly in your installation.

## The solution

If you see a message about an issue with DBus, [fix that first](https://www.home-assistant.io/more-info/unsupported/dbus#the-solution).

If the systemd-resolved service is not running or disabled, enable and start it.

If that does not help, reboot your operating system.

As a last resort, you need to reinstall the host running the Supervisor
with one of the supported operating systems, [see instructions here](/more-info/unsupported/os).
