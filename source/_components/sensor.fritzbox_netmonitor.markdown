---
layout: page
title: "FRITZ!Box"
description: "Instructions how to integrate an AVM FRITZ!Box monitor into Home Assistant."
date: 2017-01-17 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: System Monitor
ha_release: 0.36
ha_iot_class: "Local Polling"
---


The `fritzbox_netmonitor` sensor monitors the network statistics exposed by [AVM Fritz!Box](http://avm.de/produkte/fritzbox/) routers.

<p class='note warning'>
It might be necessary to install additional packages: <code>$ sudo apt-get install libxslt-dev libxml2-dev python3-lxml</code>
If you are working with the All-in-One installation, you may also need to execute also within your virtual environment the command <code> pip install lxml</code>; be patient this will take a while.</p>

To use the Fritz!Box network monitor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fritzbox_netmonitor
```

Configuration variables:

- **host** (*Optional*): The IP address of your router, eg. 192.168.1.1. It is optional since every fritzbox is also reachable by using the IP address 169.254.1.1.
