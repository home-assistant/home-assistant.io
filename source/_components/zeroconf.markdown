---
layout: page
title: "Zeroconf/Avahi/Bonjour"
description: "Exposes Home Assistant using the Zeroconf protocol."
date: 2016-04-10 18:50
sidebar: true
comments: false
sharing: true
footer: true
ha_category: "Other"
---

The `zeroconf` component exposes your Home Assistant to the local network using [Zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking). Zeroconf is also sometimes known as Bonjour, Rendezvous and Avahi.

```yaml
# Example configuration.yaml entry
zeroconf:
```

The registration will include metadata about the Home Assistant instance, including a base URL that can be used to access Home Assistant, the currently running Home Assistant version, and whether an API password is needed to access the instance.
