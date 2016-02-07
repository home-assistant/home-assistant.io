---
layout: page
title: "FRITZ!Box"
description: "Instructions how to integrate AVM FRITZ!Box based routers into Home Assistant."
date: 2015-12-13 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Presence Detection
---


The `fritz` platform offers presence detection by looking at connected devices to a [AVM Fritz!Box](http://avm.de/produkte/fritzbox/) based router.

<p class='note warning'>
It might be necessary to install additional packages: <code>$ sudo apt-get install libxslt-dev libxml2-dev</code>
</p>

To use an Fritz!Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: fritz
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Optional*): The IP address of your router, eg. 192.168.1.1. It is optional since every fritzbox is also reachable by using the IP address 169.254.1.1.
- **username** (*Optional*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Optional*): The password for your given admin account.

<p class='note'>
It seems that it is not necessary to use it in current generation Fritz!Box routers because the necessary data can be retrieved anonymously.
</p>

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

