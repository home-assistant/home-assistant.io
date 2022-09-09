---
title: "Connectivity check"
description: "More information on why disabling Network Manager's connectivity check marks the installation as unsupported."
---

## The issue

Home Assistant needs to know when it has a stable network connection in order to disable functionality which requires that.
Without this check you will face an increased number of errors and performance issues due to connection timeouts.

## The solution

From the host shell execute the following command to re-enable Network Manager's connectivity check:

```sh
busctl set-property org.freedesktop.NetworkManager /org/freedesktop/NetworkManager org.freedesktop.NetworkManager ConnectivityCheckEnabled b true
```
