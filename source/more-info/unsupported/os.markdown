---
title: "Operating System"
description: "More information on why the OS marks the installation as unsupported."
---

## The issue

There are only 2 supported operating systems to run the supervisor on,
Home Assistant OS and Debian 10 (Buster), these are the only 2 operating systems
that is actively tested and where we will solve issues caused by the operating system.

## The solution

You need to reinstall the host running the supervisor on one of the supported
operating systems.

The best approach here is to take a full snapshot of your current installation
from the supervisor panel, then reinstall your host with Home Assistant OS or
Debian 10 (buster).

If the host is a virtual machine or a supported board you can use our [appliance images](/hassio/installation/).

If not you can get [debian from here](https://www.debian.org/) and use our [convenience installation script](https://github.com/home-assistant/supervised-installer), make sure you make it compliant with [ADR0014](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md), the convenience script will handle most of that for you.

When the new host is setup and you can reach the Home Assistant frontend, you can upload and restore the snapshot you made earlier.
