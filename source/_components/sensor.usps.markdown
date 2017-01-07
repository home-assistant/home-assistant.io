---
layout: page
title: USPS Sensor
description: "Instructions on how to set up USP sensors within Home Assistant."
date: 2017-01-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: usps.png
ha_category: Sensor
ha_release: 0.36
---

The `usps` platform allows one to track [US POstal Service (USPS)](https://www.usps.com/).

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: usps
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the a TCP Sensor:

- **username** (*Required*): The username to access the USPS service.
- **password** (*Required*): The password for the given username.
- **update_interval** (*Optional*): Interval in minutes for the updates.

