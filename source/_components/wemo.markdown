---
layout: page
title: "Belkin WeMo"
description: "Instructions how to integrate Belkin WeMo devices into Home Assistant."
date: 2016-02-20 00:41
sidebar: true
comments: false
sharing: true
footer: true
logo: belkin_wemo.png
ha_category: Hub
featured: true
ha_release: pre 0.7
---

The `wemo` component is the main component to integrate various [Belkin WeMo](http://www.belkin.com/us/Products/home-automation/c/wemo-home-automation/) devices with Home Assistant.

Supported devices will be automatically discovered if the discovery component is enabled. Loading the `wemo` component will scan the local network for WeMo devices, even if you are not using the discovery component

```yaml
# Example configuration.yaml entry
wemo:
```

Alternately, WeMo devices that are not discoverable can be statically configured. If you have WeMo devices on subnets other than where Home Assistant is running, or devices in a remote location reachable over a VPN, you will need to configure them manually. This is also useful if you wish to disable discovery for some WeMo's, even if they are local. Example static configuration:

```yaml
wemo:
  static:
    - 192.168.1.23
    - 192.168.52.172
```

Any WeMo devices that are not statically configured but reachable via discovery will still be added automatically.

Note that if you use this, you may want to set up your router (or whatever runs your DHCP server) to force your WeMo devices to use a static IP address. Check the DHCP section of your router configuration for this ability.

If the device doesn't seem to work and all you see is the state "unavailable" on your dashboard, check that your firewall doesn't block incoming request on port 8989 since this is the address to which the WeMo devices send their update.
