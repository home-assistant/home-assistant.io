---
layout: page
title: NX584 zones
description: "Instructions on how to set up nx584 zones as sensors"
date: 2016-02-18 20:47
sidebar: true
comments: false
sharing: true
footer: true
logo: networx.png
ha_category: Binary Sensor
ha_iot_class: "Local Push"
ha_release: 0.14
---

The `nx584` platform provides integration with GE, Caddx, Interlogix (and other brands) alarm panels that support the NX584 interface module (or have it built in). Supported panels include NX4/6/8/8E. Actual integration is done through [pynx584](http://github.com/kk7ds/pynx584) which is required for this to work.

Enabling this sensor platform exposes all of your zones as binary sensors, which provides visibility through the UI as well as the ability to trigger automation actions instantly when something happens like a door opening, or a motion sensor trigger.

To enable this feature, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  platform: nx584
```

Configuration variables:

- **host** (*Optional*): This is the host where the nx584 server process is running. If unset, it is assumed to be `localhost`, which will work if the server process is running on the same system as Home Assistant.
- **port** (*Optional*): The port where the server process is running. Defaults to `5007`. 
- **exclude_zones** (*Optional*): This is a list of zone numbers that should be excluded. Use this to avoid exposing a zone that is of no interest, unconnected, etc.
- **zone_types** (*Optional*): This is a list of zone numbers mapped to zone types. Use this to designate zones as doors, motion sensors, smoke detectors, etc. The list of available zone types relevant to alarm zones are: `opening`, `motion`, `gas`, `smoke`, `moisture`, `safety`.

An extended configuration entry could look like this:

```yaml
# Full example configuration.yaml entry
binary_sensor:
  platform: nx584
  host: 192.168.1.10
  port: 5007
  exclude_zones:
    - 3
    - 5
  zone_types:
    1: opening
    2: opening
    4: motion
    6: moisture
