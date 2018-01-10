---
layout: page
title: "Tomato"
description: "Instructions how to integrate Tomato routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: tomato.png
ha_category: Presence Detection
ha_release: pre 0.7
---


The `tomato` platform requires an extra config variable called `http_id`. The value can be obtained by logging in to the Tomato admin interface and search for `http_id` in the page source code.

Because of a limitation in Tomato's API, this platform will only track wireless devices. If tracking wired devices like a Philips Hue Hub is necessary, it is possible to use another platform like [NMAP](/components/device_tracker.nmap_tracker/).

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: tomato
    host: YOUR_ROUTER_IP_ADDRESS_OR_HOSTNAME
    port: YOUR_ROUTER_PORT
    ssl: True
    ssl_verify: /mnt/NAS/router_cert.pem
    username: YOUR_ADMIN_USERNAME
    password:  YOUR_ADMIN_PASSWORD
    http_id: YOUR_HTTP_ID
```

Configuration variables:

- **host** (*Required*): The IP address or hostname of your router, e.g. `192.168.1.1` or `rt-ac68u`.
- **port** (*Optional*): The port number of your router, e.g. `999`. If no port is provided, the default port (80) will be used.
- **ssl** (*Optional*): Whether to connect via `https`. Defaults to `false`.
- **verify_ssl** (*Optional*): Whether SSL certificates should be validated. Defaults to `False` but can (and **should**) point to a certificate accessible by the device, e.g. `/mnt/NAS/router_cert.pem`.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.
- **http_id** (*Required*): The value can be obtained by logging in to the Tomato admin interface and search for `http_id` in the page source code.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

A description of the API s available in this [Tomato API](http://paulusschoutsen.nl/blog/2013/10/tomato-api-documentation/) blog post.


SSL Certificate:

Gathering the SSL Certificate of your router can be accomplished with this (or a similar) command:
```bash
openssl s_client -showcerts -connect 172.10.10.1:443 </dev/null 2>/dev/null | openssl x509 -outform PEM > router_cert.pem
```