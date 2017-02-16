---
layout: page
title: Fedex Sensor
description: "Instructions on how to set up FedEx sensors within Home Assistant."
date: 2017-02-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: fedex.png
ha_category: Sensor
ha_release: 0.39
---

The `fedex` platform allows one to track deliveries by [FedEx](http://www.fedex.com/). To use this sensor, you need a FedEx account.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fedex
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the USPS Sensor:

- **username** (*Required*): The username to access the FedEx service.
- **password** (*Required*): The password for the given username.

