---
layout: page
title: "Tado"
description: "Instructions how to integrate Tado into Home Assistant."
date: 2015-10-08 12:00
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

To use theTado platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for SNMP version 1
device_tracker:
  - platform: tado
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration variables:

- **username** (*Required*): The username for your Tado account.
- **password** (*Required*): The password for your Tado account.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
