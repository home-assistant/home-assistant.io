---
layout: page
title: "Asuswrt"
description: "Instructions on how to integrate Asuswrt into Home Assistant."
date: 2017-01-05 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: asus.png
ha_category: Hub
ha_release: 0.83
ha_iot_class: "Local Polling"
---

The `asuswrt` component is the main component to connect to a [ASUSWRT](http://event.asus.com/2013/nw/ASUSWRT/) based router.

## {% linkable_title Configuration %}

To use an ASUSWRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
asuswrt:
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
```

{% configuration %}
host:
  description: "The IP address of your router, eg. `192.168.1.1`."
  required: true
  type: string
username:
  description: "The username of a user with administrative privileges, usually `admin`."
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
  type: integer
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
sensors:
  description: List of enabled sensors
  required: false
  type: list
  default: all (`upload`, `download`, `upload_speed`, `download_speed`)
  keys:
    "upload":
      description: TX upload sensor
    "download":
      description: RX download sensor
    "download_speed":
      description: download mbit/s sensor
    "upload_speed":
      description: upload mbit/s sensor
{% endconfiguration %}

<p class='note warning'>
You need to [enable telnet](https://www.asus.com/support/faq/1005449/) on your router if you choose to use `protocol: telnet`. 
</p>