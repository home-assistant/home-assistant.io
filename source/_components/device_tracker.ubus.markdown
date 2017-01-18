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
For tracking the presence it is using the information provided by router's wireless devices through 'iwinfo' ubus namespace. 'dhcp' namespace is used to complete the detected devices with their hostnames and IP addresses.

Before this scanner can be used you have to install the iwinfo support for rpcd on OpenWRT:

```bash
opkg install rpcd-mod-iwinfo
```

Then create a read-only user by editing the rpcd config `/etc/config/rpcd` (see [ubus documentation](https://wiki.openwrt.org/doc/techref/ubus#authentication) for password generation).

```
config login
        option username 'hass'
        option password '<password here>'
        list read '*'
        list write ''
```
        
And create a corresponding read-only user with access to required interefaces by setting up the ACL file `/usr/share/rpcd/acl.d/hass.json` as follows:

```json
{
  "hass": {
    "description": "Read only role for hass",
    "read": {
      "ubus": {
        "dhcp": [ "ipv4leases", "ipv6leases" ],
        "iwinfo": [ "devices", "assoclist" ],
      }
    }
  }
}
```

Restart the services to reload the new settings:

```bash
# /etc/init.d/rpcd restart && /etc/init.d/uhttpd restart
```

Last step on the router is to check if the `iwinfo` namespaces is registered correctly with the RPC server:

```bash
# ubus list | grep iwinfo
file
```

After this is done, what remains is updating your `configuration.yaml` file to use the tracker:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ubus
    host: ROUTER_IP_ADDRESS
    username: hass
    password: <your password>
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. 192.168.1.1.
- **username** (*Required*): The username of an user with required permissions.
- **password** (*Required*): The password for your given account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
