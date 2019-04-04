---
layout: page
title: "DD-WRT"
description: "Instructions on how to integrate DD-WRT based routers into Home Assistant."
date: 2015-05-11 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ddwrt.png
ha_category: Presence Detection
ha_release: pre 0.7
redirect_from:
 - /components/device_tracker.ddwrt/
---

This platform offers presence detection by looking at connected devices to a [DD-WRT](http://www.dd-wrt.com/site/index) based router.

To use a DD-WRT router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: ddwrt
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.1.1`.
  required: true
  type: string
username:
  description: The username of an user with administrative privileges, usually `admin`.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
ssl:
  description: Whether to connect via HTTPS.
  required: false
  type: boolean
  default: false
verify_ssl:
  description: If SSL/TLS verification for HTTPS resources needs to be turned off (for self-signed certs, etc.)
  required: false
  type: boolean
  default: true
type:
  description: The type of devices to query from the router. (lan, wireless, dhcp)
  required: false
  type: string
  default: lan
monitored_conditions:
  description: Wireless conditions to display in the frontend.
  required: false
  type: list
  keys:
    interface:
      description: Display the interface name (w0, w1, w2)
    tx_rate:
      description: The connection speed of the downlink, in Mbps
    rx_rate:
      description: The connection speed of the uplink, in Mbps
    info:
      description: "Connection type: `Legacy`, `HT20`, `VHT80PS`."
    signal_db:
      description: The transmitter power output, in dB
    signal:
      description: The signal quality of the connection to the wireless device represented by an integer between 0 and 1000
    noise_db:
      description: The noise level of the connection expressed in dB
    snr:
      description: The Signal-to-Noise ratio
{% endconfiguration %}

By default Home Assistant pulls information about connected devices from DD-WRT every 5 seconds.
See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
