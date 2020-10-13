---
title: "Systemd"
description: "More information on why systemd marks the installation as unsupported."
---

## The issue

The Supervisor use Systemd over DBus to control the Host system and get information.
Without Systemd, we miss a lot of information and functionality.

## The solution

You need to reinstall the host running the supervisor with one of the supported
operating systems, [see instructions here](/more-info/unsupported/os)