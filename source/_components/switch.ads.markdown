---
layout: page
title: "ADS Switch"
description: "Instructions on how to set up ADS switches within Home Assistant."
date: 2016-05-25 23:49
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.21
ha_iot_class: "Local Push"
---

An ADS switch accesses a boolean variable of the connected ADS device.

To use your ADS device, you first have to set up your [ADS
hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ads
    adsvar: .global_bool
```

Configuration variables:

- **adsvar** (*Required*): The name of the variable which you want to access on
the ADS device.