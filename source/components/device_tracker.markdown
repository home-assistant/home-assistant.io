---
layout: page
title: "Device tracking"
description: "Instructions how to setup device tracking within Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

Home Assistant can get information from your wireless router to track which devices are connected. There are three different types of supported wireless routers: tomato, netgear and luci (OpenWRT). To get started add the following lines to your `configuration.yaml` (example for Netgear):

```
device_tracker:
  platform: netgear
  host: 192.168.1.1
  username: admin
  password: MY_PASSWORD
```

<p class='note' data-title='on Tomato'>
Tomato requires an extra config variable called `http_id`. The value can be obtained by logging in to the Tomato admin interface and search for `http_id` in the page source code.
</p>

<p class='note' data-title='on Luci'>
Before the Luci scanner can be used you have to install the luci RPC package on OpenWRT: <code>opkg install luci-mod-rpc</code>.
</p>

Once tracking, the `device_tracker` component will maintain a file in your config dir called `known_devices.csv`. Edit this file to adjust which devices have to be tracked. Here you can also setup a url for each device to be used as the entity picture.

As an alternative to the router-based device tracking, it is possible to directly scan the network for devices by using nmap. The IP addresses to scan can be specified in any format that nmap understands, including the network-prefix notation (`192.168.1.1/24`) and the range notation (`192.168.1.1-255`).

```
device_tracker:
  platform: nmap_tracker
  hosts: 192.168.1.1/24
```
