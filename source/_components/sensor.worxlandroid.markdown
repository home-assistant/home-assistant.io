---
layout: page
title: "Worx Landroid"
description: "Instructions on how to integrate Worx Landroid WG796E.1 or WG797E as sensors within Home Assistant."
date: 2017-09-12 13:23
sidebar: true
comments: false
sharing: true
footer: true
logo: worx.png
ha_category: DIY
ha_release: 0.54
ha_iot_class: "Local Polling"
---

The `worxlandroid` sensor platform allows you to get the current state, battery level and error status Worx Landroid WG796E.1 or WG797E.

To use your Worx Landroid mower in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: worxlandroid
  host: 192.168.0.10
  pin: 1234
```

Configuration variables:

- **host** (*Required*): The ip address or host name of the mower.
- **pin** (*Required*): The pin code for the mower.
- **allow_unreachable** (*Optional*): This will allow the mower to be outside of wifi range without raising an error (default: True).
