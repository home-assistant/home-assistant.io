---
layout: page
title: "UPC ConnectBox"
description: "Instructions how to integrate UPC ConnectBox into Home Assistant."
date: 2016-12-30 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: upc.png
ha_category: Presence Detection
ha_release: 0.36
---


The `upc_connect` platform offers presence detection by looking at connected devices to an [ConnectBox](https://www.upc.ch/de/internet/connectbox/) router from [Liberty Global](http://www.libertyglobal.com/), which is a Internet provider in Switzerland, Austria.

To use an Internet-Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: upc_connect
  password: '123456'
  host: "192.168.0.1" # only required if not 192.168.0.1
```

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
