---
layout: page
title: "Taps Aff"
description: "Instructions on how to use the Taps Aff binary sensor in Home Assistant."
date: 2017-05-28 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tapsaff.png
ha_category: Weather
featured: false
ha_release: 0.47
ha_iot_class: "Local Polling"
---


The `tapsaff` binary sensor provides the 'Taps Aff' status for a given location within the UK using [Taps Aff](http://www.taps-aff.co.uk). 

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tapsaff
    location: glasgow
```

Configuration variables:

- **location** (*Required*): The location for the Taps Aff. It must be configured with a UK postcode or city to work. 
- **name** (*Optional*): The name to use when displaying this sensor.
