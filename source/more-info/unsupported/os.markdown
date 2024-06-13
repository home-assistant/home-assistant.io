---
title: "Operating System"
description: "More information on why the OS marks the installation as unsupported."
---

## The issue

There are only two supported operating systems to run the Supervisor on:

- Home Assistant OS
- Debian 12 (Bookworm)

These operating systems are actively tested and maintained, for use with the Supervisor.

## The solution

You need to reinstall the host machine running the Supervisor on one of the supported
operating systems.

The best approach here is to take a full backup of your current installation
from the Supervisor panel, then reinstall your host with one of the supported
operating systems.

If the host is a virtual machine or a supported board, you can use our [appliance images](/hassio/installation/).

If not, you can get [Debian from here](https://www.debian.org/) and use our [convenience installation script](https://github.com/home-assistant/supervised-installer). Make sure you make it compliant with [ADR-0014](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md), the convenience script will handle most of that for you.

When the new host is set up and you can reach the Home Assistant frontend, you can upload and restore the backup you made earlier.
