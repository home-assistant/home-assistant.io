---
layout: page
title: UPS Sensor
description: "Instructions on how to set up UPS sensors within Home Assistant."
date: 2017-02-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ups.png
ha_category: Sensor
ha_release: 0.39
---

The `ups` platform allows one to track deliveries by the [UPS)](https://www.ups.com/). To use this sensor, you need a [My UPS Account](https://www.ups.com/one-to-one/login).

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ups
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the USPS Sensor:

- **username** (*Required*): The username to access the UPS service.
- **password** (*Required*): The password for the given username.

