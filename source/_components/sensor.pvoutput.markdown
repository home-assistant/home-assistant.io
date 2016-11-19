---
layout: page
title: "PVOutput Sensor"
description: "Instructions how to use PVOutput within Home Assistant."
date: 2016-11-06 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pvoutput.png
ha_category: Energy
ha_release: 0.33
---


The `pvoutput` sensor platform consumes informations from [PVOutput](http://pvoutput.org/) which were uploaded by your solar photovoltaic (PV) system. 

To add PVOutput details to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pvoutput
    system_id: YOUR_SYSTEM_ID
    api_key: YOUR_API_KEY
    scan_interval: 120
```

Configuration variables:

- **api_key** (*Required*): Your API key. A read-only key is fine.
- **system_id** (*Required*): The ID of your station.

<p class='note warning'>
It's recommended to set `scan_interval:` according to a value greater than 60 seconds. The service only allows 60 requests per hour but the sensor's default is 30 seconds.
</p>

