---
layout: page
title: "Ring"
description: "Instructions on how to integrate your Ring.com devices within Home Assistant."
date: 2017-03-05 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ring.png
ha_category: Sensor
ha_release: 0.40
---

The `ring` sensor allows you to integrate your [Ring.com](https://ring.com/) devices in Home Assistant.
Currently it supports doorbells and external chimes only.

To enable device linked in your [Ring.com](https://ring.com/) account, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ring
    username: USERNAME
    password: PASSWORD
    monitored_conditions:
      - battery
      - last_activity
      - volume
```

Configuration variables:

- **username** (*Required*): The username for accessing your Ring account.
- **password** (*Required*): The password for accessing your Ring account.
- **scan_interval** (*Optional*): Defines the update interval of the sensor in seconds. The default is 30 seconds.
- **monitored_conditions** array (*Required*): Conditions to display in the frontend. The following conditions can be monitored.
  - **battery**: Return the battery level from device
  - **last_activity**: Return the timestamp from the last event captured by the Ring doorbell camera
  - **volume**: Return the volume level from the device. Currently supported by external chimes and doorbells.
