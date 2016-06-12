---
layout: page
title: "ASUSWRT"
description: "Instructions how to integrate ASUSWRT based routers into Home Assistant."
date: 2015-08-06 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: asus.png
ha_category: Presence Detection
ha_release: pre 0.7
---


The `asuswrt` platform offers presence detection by looking at connected devices to a [ASUSWRT](http://event.asus.com/2013/nw/ASUSWRT/) based router.

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: asuswrt
  host: YOUR_ROUTER_IP
  protocol: telnet
  mode: router
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. 192.168.1.1.
- **protocol** (*Optional*): The protocol (`ssh` or `telnet`) to use. Defaults to `ssh`.
- **mode** (*Optional*): The operating mode of the router (`router` or `ap`). Defaults to `router`.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

<p class='note warning'>
You need to enable telnet on your router if you choose to use `protocol: telnet`. 
</p>

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
