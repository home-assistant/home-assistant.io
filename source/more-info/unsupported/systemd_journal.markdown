---
title: "Systemd Journal"
description: "More information on why systemd journal marks the installation as unsupported."
---

## The issue

The Supervisor needs access to the systemd journal to access logs of
individual system components and add-ons. These logs are limited or
not available at all if the journal is not accessible.

## The solution

The `systemd-journal-gatewayd` service needs to be running on the host
and exposed to supervisor via unix socket.

If using Home Assistant OS, update to version 7 or later.

If using Home Assistant Supervised, run the following on the host:

```sh
sudo apt install systemd-journal-remote -y
```

and then reboot your system

If after upgrading you are still facing this error, reinstall `systemd-journal-remote` with the following command

```sh
sudo apt-get install --reinstall systemd-journal-remote
```

and reboot your system

If you still see this issue then run the [supervised installer](https://github.com/home-assistant/supervised-installer)
on the host as the supervisor service may need an update as well.
