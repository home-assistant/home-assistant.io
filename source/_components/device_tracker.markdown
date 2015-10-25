---
layout: component
title: "Device Tracker"
description: "Instructions how to setup device tracking within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant can get information from your wireless router to track which devices are connected. Please check the sidebar for a list of  brands of supported wireless routers.

There are also trackers available which uses different technologies like [MQTT](/components/mqtt.html) or [nmap](/components/device_tracker.nmap_scanner.html) to scan the network for devices

To get started add the following lines to your `configuration.yaml` (example for Netgear):

```yaml
# Example configuration.yaml entry for Netgear device
device_tracker:
  platform: netgear
  host: 192.168.1.1
  username: admin
  password: YOUR_PASSWORD

  # Optional configuration

  # If new discovered devices are tracked by default (default: yes)
  track_new_devices: yes
  # Seconds between each scan for new devices (default: 12)
  interval_seconds: 12
  # Seconds to wait till marking someone as not home after not being seen
  # (default: 180)
  consider_home: 180
```

Once tracking, a file will be created in your config dir called `known_devices.yaml`. Edit this file to adjust which devices have to be tracked. Here you can also setup a url for each device to be used as the entity picture and set whether the device will be show in the UI when in away state.
