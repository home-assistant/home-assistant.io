---
title: "Systemd-Resolved"
description: "More information on why systemd-resolved marks the installation as unsupported."
---

## The issue

systemd-resolved is used over D-Bus to resolve DNS queries made by Home Assistant, Supervisor,
and add-ons. Without it, DNS will not work correctly in your installation.

## The solution

If you see a message about an issue with D-Bus, [resolve that first](/more-info/unsupported/dbus#the-solution).

If the systemd-resolved service is not running or disabled, enable and start it.

If that does not help, reboot your operating system.

As a last resort, you need to reinstall the host running the Supervisor
with one of the supported operating systems, [see instructions here](/more-info/unsupported/os).
