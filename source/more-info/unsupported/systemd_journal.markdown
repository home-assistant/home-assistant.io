---
title: "Systemd Journal"
description: "More information on why systemd journal marks the installation as unsupported."
---

## The issue

The Supervisor needs access to the systemd journal for logging features
such as the `/host/logs` API. These features don't work if the journal
is not accessible.

## The solution

The `systemd-journal-gatewayd` service needs to be running on the host
and exposed to supervisor via unix socket.

If using Home Assistant OS, update to version 7 or later.

If using Home Assistant Supervised, re-run the [supervised installer](https://github.com/home-assistant/supervised-installer)
on the host to set up this service and reboot.
