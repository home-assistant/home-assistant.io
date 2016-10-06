---
layout: page
title: "Zeroconf/Avahi/Bonjour"
description: "Exposes Home Assistant using the Zeroconf protocol."
date: 2016-04-10 18:50
sidebar: true
comments: false
sharing: true
footer: true
logo: avahi.png
ha_category: "Other"
ha_release: 0.18
---

The `zeroconf` component exposes your Home Assistant to the local network using [Zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking). Zeroconf is also sometimes known as Bonjour, Rendezvous and Avahi.

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
zeroconf:
```

The registration will include metadata about the Home Assistant instance, including a base URL that can be used to access Home Assistant, the currently running Home Assistant version, and whether an API password is needed to access the instance.

```bash
$ avahi-browse -alr
+ eth0 IPv4 Home                              _home-assistant._tcp local
= eth0 IPv4 Home                              _home-assistant._tcp local
   hostname = [Home._home-assistant._tcp.local]
   address = [192.168.0.5]
   port = [8123]
   txt = ["version=0.27.0.dev0" "base_url=http://192.168.0.5:8123" "requires_api_password=true"]
```
