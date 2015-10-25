---
layout: page
title: "Actiontec support"
description: "Instructions how to integrate Actiontec routers into Home Assistant."
date: 2015-08-30 19:00
sidebar: false
comments: false
sharing: true
footer: true
logo: actiontec.png
ha_category: Presence Detection
---

<img src='/images/supported_brands/actiontec.png' class='brand pull-right' />
This platform allows you to detect presence by looking at connected devices to an [Actiontec](http://www.actiontec.com/) device.

Supported devices (tested):

- MI424WR (Verizon FIOS)

<p class='note warning'>
This device tracker needs telnet to be enabled on the router.
</p>

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: actiontec
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
  home_interval: MINUTES
```

Configuration variables:

- **host** (*Required*): The IP address of your router, eg. 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.
- **home_interval** (*Optional*): If the home_interval is set then the component will not let a device be AWAY if it has been HOME in the last home_interval minutes. This is in addition to the 3 minute wait built into the device_tracker component.

See the [device tracker component page](/components/device_tracker.html) for instructions how to configure the people to be tracked.

