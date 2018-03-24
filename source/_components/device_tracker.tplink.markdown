---
layout: page
title: "TP-Link"
description: "Instructions on how to integrate TP-Link routers into Home Assistant."
date: 2015-06-22 10:30
sidebar: true
comments: false
sharing: true
footer: true
logo: tp-link.png
ha_category: Presence Detection
ha_release: pre 0.7
---


The `tplink` platform allows you to detect presence by looking at connected devices to a [TP-Link](https://www.tp-link.com) device. This includes the ArcherC9 line.

<p class='note'>
TP-Link devices typically only allow one login at a time to the admin console.  This component will count towards your one allowed login. Depending on how aggressively you configure device_tracker you may not be able to access the admin console of your TP-Link device without first stopping Home Assistant. Home Assistant takes a few seconds to login, collect data, and log out. If you log into the admin console manually, remember to log out so that Home Assistant can log in again.
</p>


```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: tplink
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your router, e.g., 192.168.1.1.
- **username** (*Required*: The username of an user with administrative privileges, usually *admin*.
- **password** (*Required*): The password for your given admin account.

For Archer C9 models running firmware version 150811 or later please use the encrypted password you can retrieve like this:

1. Go to the login page of your router. (default: 192.168.0.1)
2. Type in the password you use to login into the password field.
3. Click somewhere else on the page so that the password field is not selected anymore.
4. Open the JavaScript console of your browser (usually by pressing F12 and then clicking on "Console").
5. Type ```document.getElementById("login-password").value;```.
6. Copy the returned value to your Home Assistant configuration as password.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
