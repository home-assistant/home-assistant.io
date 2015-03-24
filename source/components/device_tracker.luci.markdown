---
layout: page
title: "OpenWRT support"
description: "Instructions how to integrate OpenWRT routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/openwrt.png' class='brand pull-right' />
Before this scanner can be used you have to install the luci RPC package on OpenWRT: <code>opkg install luci-mod-rpc</code>.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: luci
  host: 192.168.1.1
  username: admin
  password: PASSWORD
```

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
