---
layout: page
title: "Linksys Smart Wifi Router"
description: "Instructions on how to integrate Linksys Smart Wifi Router into Home Assistant."
date: 2017-06-22 01:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
logo: linksys.png
ha_release: 0.48
---

The `linksys_smart` platform offers presence detection by looking at connected devices to a Linksys Smart Wifi based router. 

Tested routers: 
   LINKSYS WRT3200ACM MU-MIMO Gigabit Wi-Fi Wireless Router
   LINKSYS WRT1900ACS Dual-band Wi-Fi Router
   

<p class='note'>
For this platform to work correctly, it is necessary to disable the "Access via wireless" feature in the Local Management Access section of the router administration page. If "Access via wireless" is not disabled, a connectivity conflict arises because the Home Assistant integration is trying to pass userid and password, but the router is only expecting a password.
</p>

To use a Linksys Smart Wifi Router in your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: linksys_smart
    host: 192.168.1.1
```

Configuration variables:

- **host** (*Required*): The hostname or IP address of your router, eg. `192.168.1.1`.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
