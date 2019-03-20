---
layout: page
title: "Ubee Router"
description: "Instructions on how to integrate Ubee routers into Home Assistant."
date: 2018-12-26 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ubee.png
ha_category: Presence Detection
ha_release: 0.89
---

This platform offers presence detection by looking at connected devices to a [Ubee Router](http://www.ubeeinteractive.com/products).

To use a Ubee router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ubee
    model: UBEE_MODEL
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
model:
  description: Ubee Router model, e.g., `EVW32C-0N`.
  required: true
  type: string
host:
  description: The IP address of your router, e.g., `192.168.1.1`.
  required: true
  type: string
username:
  description: The username of a user with administrative privileges, usually `admin`.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
{% endconfiguration %}

Supported models:
- Ubee EVW32C-0N
- Ubee EVW3200-Wifi

<p class='note info'>
This component uses [pyUbee library](https://github.com/mzdrale/pyubee), which was tested with models listed above. If you have different model of [Ubee Router](http://www.ubeeinteractive.com/products) and want to use this component, try specifying one of models listed above, it might work. If that happens, please [create pyUbee issue](https://github.com/mzdrale/pyubee/issues/new) to report. Also if none of these models work for you, [create pyUbee issue](https://github.com/mzdrale/pyubee/issues/new) to request for support for your model.
</p>

By default, Home Assistant pulls information about connected devices from Ubee router every 5 seconds.
See the [device tracker component page](/components/device_tracker/) for instructions on how to configure the people to be tracked.
