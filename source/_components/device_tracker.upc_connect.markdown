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


The `upc_connect` platform offers presence detection by looking at connected devices to a [Connect Box](https://www.upc.ch/de/internet/connectbox/) from [Liberty Global](http://www.libertyglobal.com/) (also known as UPC Cablecom in Switzerland) which is a Internet provider in Switzerland and Austria.

To use a Connect Box in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: upc_connect
```

Configuration variables:

- **host** (*Optional*): The IP address of your router. Set it if you are not using `192.168.0.1`.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

Also known to be working with the following devices:
 - Irish Virgin Media Super Hub 3.0
 - Ziggo Connectbox NL
 - Unitymedia Connect Box (DE)

