---
layout: page
title: "OpenWRT (ubus)"
description: "Instructions how to integrate OpenWRT routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: openwrt.png
ha_category: Presence Detection
ha_release: 0.7.6
---

_This is one of the two ways we support OpenWRT. If you encounter problems, try [luci](/components/device_tracker.luci/)._

This is a presence detection scanner for [OpenWRT](https://openwrt.org/) using [ubus](http://wiki.openwrt.org/doc/techref/ubus).

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

Restart the services.

```bash
# /etc/init.d/rpcd restart && /etc/init.d/uhttpd restart
```

Check if the `file` namespaces is registered with the RPC server.

```bash
# ubus list | grep file
file
```

After this is done, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ubus
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. 192.168.1.1.
- **username** (*Required*): The username of an user with administrative privileges, usually *root*.
- **password** (*Required*): The password for your given account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
