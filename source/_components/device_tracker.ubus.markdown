---
layout: component
title: "OpenWRT (ubus)"
description: "Instructions how to integrate OpenWRT routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: openwrt.png
ha_category: Presence Detection
---

_This is one of the two ways we support OpenWRT. If you encounter problems, try [luci](/components/device_tracker.luci.html)._

This is a presence detection scanner for OpenWRT using [ubus](http://wiki.openwrt.org/doc/techref/ubus).

Before this scanner can be used you have to install the ubus RPC package on OpenWRT:

```bash
opkg install rpcd-mod-file
```

And create a read-only user to be used by setting up the ACL file `/usr/share/rpcd/acl.d/user.json`.

```json
{
  "user": {
    "description": "Read only user access role",
    "read": {
      "ubus": {
        "*": [ "*" ]
      },
      "uci": [ "*" ]
    },
    "write": {}
  }
}
```

After this is done, configure Home Assistant as follows:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: ubus
  host: ROUTER_IP_ADDRESS
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g. 192.168.1.1.
- **username** (*Required*): The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.
