---
layout: page
title: "ASUSWRT"
description: "Instructions on how to integrate ASUSWRT based routers into Home Assistant."
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

<p class='note warning'>
This platform is **NOT** available for [Microsoft Windows installations](http://pexpect.readthedocs.io/en/stable/overview.html#pexpect-on-windows).
</p>

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: asuswrt
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. `192.168.1.1`.
- **username** (*Required*: The username of an user with administrative privileges, usually `admin`.
- **password** (*Optional*): The password for your given admin account (use this if no SSH key is given).
- **protocol** (*Optional*): The protocol (`ssh` or `telnet`) to use. Defaults to `ssh`.
- **port** (*Optional*): SSH port to use. Defaults to `22`.
- **mode** (*Optional*): The operating mode of the router (`router` or `ap`). Defaults to `router`.
- **ssh_key** (*Optional*): The path to your SSH private key file associated with your given admin account (instead of password).

<p class='note warning'>
You need to [enable telnet](https://www.asus.com/support/faq/1005449/) on your router if you choose to use `protocol: telnet`. 
</p>

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
