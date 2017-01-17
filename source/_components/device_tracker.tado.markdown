---
layout: page
title: "Tado"
description: "Instructions how to integrate Tado into Home Assistant."
date: 2017-01-17 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tado.png
ha_category: Presence Detection
ha_release: 0.37
---

The `tado` device tracker is using the [Tado Smart Thermostat](https://www.tado.com/) and it's support for person presence detection based on smartphone location by geofencing.

This tracker uses the Tado API to determine if a mobile device is at home.

To use the Tado platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for Tado
device_tracker:
  - platform: tado
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration variables:

- **username** (*Required*): The username for your Tado account.
- **password** (*Required*): The password for your Tado account.

After configuration, your device has to be at home at least once before showing up as 'home' or 'away'.
Polling Tado API for presence information will occure at most once every 30 seconds.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
