---
layout: page
title: "Ubiquiti Unifi direct AP"
description: "Instructions how to use a Unifi WAP as a device tracker."
date: 2017-11-17 14:59
sidebar: true
comments: false
sharing: true
footer: true
logo: ubiquiti.png
ha_category: Presence Detection
ha_release: 0.58
---


This platform allows you to detect presence by looking at devices connected to a [UniFi AP](http://ubnt.com/unifi-ap/). This device tracker differs form [Ubiquiti Unifi WAP](https://home-assistant.io/components/device_tracker.unifi/) because it doesn't require the Unifi controller software.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: unifi_direct
    host: YOUR_AP_IP_ADDRESS
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration variables:

- **host** (*Required*): The hostname or IP address of your controller.
- **username** (*Required*: The username used to connect to the AP.
- **password** (*Required*): The password you created for the AP.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

