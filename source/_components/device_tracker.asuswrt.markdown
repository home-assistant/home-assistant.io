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

### {% linkable_title Configuration %}

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: asuswrt
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
```

{% configuration %}
host:
  description: "The IP address of your router, eg. `192.168.1.1`."
  required: true
  type: string
username:
  description: "The username of an user with administrative privileges, usually `admin`."
  required: true
  type: string
password:
  description: "The password for your given admin account (use this if no SSH key is given)."
  required: false
  type: string
protocol:
  description: "The protocol (`ssh` or `telnet`) to use."
  required: false
  type: string
  default: ssh
port:
  description: SSH port to use.
  required: false
  type: int
  default: 22
mode:
  description: "The operating mode of the router (`router` or `ap`)."
  required: false
  type: string
  default: router
ssh_key:
  description: The path to your SSH private key file associated with your given admin account (instead of password).
  required: false
  type: string
require_ip:
  description: If the router is in access point mode.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

<p class='note warning'>
You need to [enable telnet](https://www.asus.com/support/faq/1005449/) on your router if you choose to use `protocol: telnet`. 
</p>

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
