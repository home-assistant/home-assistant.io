---
layout: page
title: "OpenWRT (luci)"
description: "Instructions on how to integrate OpenWRT routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: openwrt.png
ha_category: Presence Detection
ha_release: pre 0.7
---

_This is one of multiple ways we support OpenWRT. For an overview, see [openwrt](/components/device_tracker.openwrt/)._

This is a presence detection scanner for OpenWRT using [luci](http://wiki.openwrt.org/doc/techref/luci).

<p class='note'>
This component requires a [workaround](https://github.com/home-assistant/home-assistant/issues/1258#issuecomment-252469880) when using luci with HTTPS and a self-signed certificate.
</p>

Before this scanner can be used you have to install the luci RPC package on OpenWRT:

```bash
# opkg install luci-mod-rpc
```

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: luci
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g., `192.168.1.1`.
- **username** (*Required*): The username of an user with administrative privileges, usually `admin`.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

<p class='note warning'>
Some installations have [a small bug](https://github.com/openwrt/luci/issues/576). The timeout for luci RPC calls is not set and this makes the call fail. 
</p>

