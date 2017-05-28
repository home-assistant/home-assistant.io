---
layout: page
title: "Taps Aff"
description: "Instructions how to use the Taps Aff binary sensor in Home Assistant."
date: 2017-05-28 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tapsaff.png
ha_category: Binary Sensor
featured: false
ha_release: 0.46
ha_iot_class: "Local Polling"
---


The `tapsaff` binary sensor provides the 'Taps Aff' status for a given location within the UK using [Taps Aff](http://www.taps-aff.co.uk). 

It must be configured with a UK postcode or city to work. 

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tapsaff
    location: glasgow
```
