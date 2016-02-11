---
layout: page
title: "Belkin WeMo Switch"
description: "Instructions how to integrate Belkin WeMo switches into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: belkin_wemo.png
ha_category: Switch
---


The `wemo` platform allows you to control your [Belkin WeMo](http://www.belkin.com/us/p/P-F7C027/) switches from within Home Assistant.

They will be automatically discovered if the discovery component is enabled.

```yaml
# Example configuration.yaml entry
switch:
  platform: wemo
```

Alternately, wemos that are not discoverable can be statically configured. If you have WeMo devices on subnets other than where Home Assistant is running, and/or devices in a remote location reachable over a VPN, you will need to manually configure them. This is also useful if you wish to disable discovery for some wemos, even if they are local. Example static configuration:

```yaml
switch:
  platform: wemo
  static:
    - 192.168.1.23
    - 192.168.52.172
```

Any WeMo devices that are not statically configured but reachable via discovery will still be added automatically.

Note that if you use this, you may want to configure your router (or whatever runs your DHCP server) to force your WeMo devices to use a static IP address. Check the DHCP section of your router configuration for this ability.