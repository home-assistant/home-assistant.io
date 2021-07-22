---
title: "Systemd"
description: "More information on why systemd marks the installation as unsupported."
---

## The issue

The Supervisor uses systemd over DBus to control the Host system and get information.
Without systemd, we miss a lot of information and functionality.

## The solution

You need to reinstall the host running the Supervisor with one of the supported
operating systems, [see instructions here](/more-info/unsupported/os).
