---
layout: page
title: "Linksys Smart Wifi Router"
description: "Instructions how to integrate Linksys Smart Wifi Router into Home Assistant."
date: 2017-06-22 01:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
logo: linksys.png
ha_release: 0.48
---

The `linksys_smart` platform offers presence detection by looking at connected devices to a Linksys Smart Wifi based 
router. It was tested with a LINKSYS WRT3200ACM MU-MIMO Gigabit Wi-Fi Wireless Router.

To use a Linksys Smart Wifi Router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: linksys_smart
    host: 192.168.1.1
```

Configuration variables:

- **host** (*Required*): The hostname or IP address of your router, eg. `192.168.1.1`.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
