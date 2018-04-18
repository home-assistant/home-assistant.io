---
layout: page
title: "Netgear"
description: "Instructions on how to integrate Netgear routers into Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: netgear.png
ha_category: Presence Detection
ha_iot_class: "Local Polling"
ha_release: pre 0.7
---

This platform allows you to detect presence by looking at connected devices to a [Netgear](http://www.netgear.com/) device.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: netgear
    host: YOUR_ROUTER_IP
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

Configuration variables:

- **url** (*Optional*): The base URL, e.g., `http://routerlogin.com:5000` for example. If not provided `host` and `port` are used. If none provided autodetection of the URL will be used.
- **host** (*Optional*): The IP address of your router, e.g., `192.168.1.1`.
- **port** (*Optional*): The port your router communicates with.
- **username** (*Optional*): The username of a user with administrative privileges. If not provided `admin` will be used.
- **password** (*Required*): The password for your given admin account.
- **devices** (*Optional*): If provided only specified devices will be reported. Can be MAC address or the device name as reported in the Netgear UI.
- **exclude** (*Optional*): Devices to exclude from the scan.
- **accesspoints** (*Optional*): Also track devices on the specified APs. Only supports MAC address.

When `accesspoints` is specified an extra device will be reported for each device connected to the APs specified here, as `MY-LAPTOP on RBS40`. `Router` will be reported as AP name for the main AP. Only tested with Orbi.

The use of `devices` or `exclude` is recommended when using `accesspoints` to avoid having a lot of entries.

List of models that are known to use port 80:
- Nighthawk X4S - AC2600 (R7800)
- Orbi

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
