---
layout: page
title: "OpenWRT support"
description: "Instructions how to integrate OpenWRT routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
logo: openwrt.png
ha_category: Presence Detection
---

<img src='/images/supported_brands/openwrt.png' class='brand pull-right' />
Before this scanner can be used you have to install the luci RPC package on OpenWRT: <code>opkg install luci-mod-rpc</code>.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: luci
  host: ROUTER_IP_ADDRESS
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*): The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
