---
layout: page
title: "TrackR"
description: "Instructions on how to use TrackR to track devices in Home Assistant."
date: 2016-12-22 1000
sidebar: true
comments: false
sharing: true
footer: true
logo: trackr.png
ha_release: 0.36
ha_category: Presence Detection
ha_iot_class: "Cloud Polling"
---


The `trackr` platform allows you to detect presence using [TrackR](https://www.thetrackr.com/) devices. 

The official TrackR mobile app handles the tracking of the TrackR devices using your phones Bluetooth and GPS.

To integrate TrackR in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: trackr
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **username** (*Required*): The email address for the TrackR account.
- **password** (*Required*): The password for your given username.
