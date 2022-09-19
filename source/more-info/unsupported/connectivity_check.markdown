---
title: "Connectivity check"
description: "More information on why disabling Network Manager's connectivity check marks the installation as unsupported."
---

## The issue

Home Assistant needs to know when it has a stable network connection in order to disable functionality which requires that.
Without this check you will face an increased number of errors and performance issues due to connection timeouts.

## The solution

From the host shell, first execute the following:

```sh
busctl get-property org.freedesktop.NetworkManager /org/freedesktop/NetworkManager org.freedesktop.NetworkManager ConnectivityCheckAvailable
```

If the output of this is `b true` then you just need to re-enable connectivity checks by executing this command:

```sh
busctl set-property org.freedesktop.NetworkManager /org/freedesktop/NetworkManager org.freedesktop.NetworkManager ConnectivityCheckEnabled b true
```

It may take a bit to see the message go away after as all checks are scheduled on timers. You can force it by executing the following commands:

```sh
ha host reload
ha resolution healthcheck
```

If the output of the first `busctl` command is `b false` then you need to set the connectivity uri in Network Manager's config. You can do this by adding the following to `/etc/NetworkManager/NetworkManager.conf`:

```
[connectivity]
uri=http://checkonline.home-assistant.io/online.txt
interval=600
```

Afterwards you will need to restart NetworkManager by either rebooting the host or executing this command:

```sh
systemctl restart NetworkManager
```
