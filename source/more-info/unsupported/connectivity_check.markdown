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

### Output is `b true`

You just need to re-enable connectivity checks by executing this command:

```sh
busctl set-property org.freedesktop.NetworkManager /org/freedesktop/NetworkManager org.freedesktop.NetworkManager ConnectivityCheckEnabled b true
```

It may take a bit for the message to go away as all checks are scheduled on timers. You can force it to recheck immediately by executing the following commands:

```sh
ha host reload
ha resolution healthcheck
```

### Output is `b false`

You need to set the connectivity uri in Network Manager's config. You can do this by adding the following to `/etc/NetworkManager/NetworkManager.conf`:

```txt
[connectivity]
uri=http://checkonline.home-assistant.io/online.txt
interval=600
```

Afterwards you will need to restart NetworkManager by either rebooting the host or executing this command:

```sh
systemctl restart NetworkManager
```

As mentioned above, the checks are on timers so the message may not go away immediately unless you force an immediate re-check. If you continue to see the message after a while or after forcing a re-check then start over at the top of this solution. You may need to separately enable the check now that it is available.
