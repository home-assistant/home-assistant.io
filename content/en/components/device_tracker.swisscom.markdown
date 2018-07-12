---
layout: page
title: "Swisscom Internet-Box"
description: "Instructions on how to integrate Swisscom Internet-Box into Home Assistant."
date: 2016-10-29 23:30
sidebar: true
comments: false
sharing: true
footer: true
logo: swisscom.png
ha_category: Presence Detection
ha_release: 0.32
---


The `swisscom` platform offers presence detection by looking at connected devices to an [Internet-Box](https://www.swisscom.ch/en/residential/help/device/internet-router.html) router from [Swisscom](https://www.swisscom.ch) which is an Internet provider in Switzerland.

<p class='note'>
There are three models of Internet-Box (light, standard and plus). The platform has only been tested on the Internet-Box plus but the others should work as well because they have the same web interface.
</p>

To use an Internet-Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: swisscom
```

Configuration variables:

- **host** (*Optional*): The IP address of your router. Set it if you are not using `192.168.1.1`.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
