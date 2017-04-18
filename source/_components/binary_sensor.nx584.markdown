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
---

The `nx584` platform provides integration with GE, Caddx, Interlogix (and other brands) alarm panels that support the NX584 interface module (or have it built in). Supported panels include NX4/6/8/8E. Actual integration is done through [pynx584](http://github.com/kk7ds/pynx584) which is required for this to work.

Enabling this sensor platform exposes all of your zones as binary sensors, which provides visibility through the UI as well as the ability to trigger automation actions instantly when something happens like a door opening, or a motion sensor trigger.

To enable this, add the following lines to your `configuration.yaml`:

```yaml
binary_sensor:
  platform: nx584
  host: ADDRESS
  exclude_zones:
    - ZONE ...
  zone_types:
    ZONE: TYPE
```

Configuration variables:

- **host** (*Optional*): This is the host connection string (host:port) for the nx584 server process. If unset, it is assumed to be `localhost:5007`, which will work if the server process is running on the same system as home-assistant.
- **exclude_zones** (*Optional*): This is a list of zone numbers that should be excluded. Use this to avoid exposing a zone that is of no interest, unconnected, etc.
- **zone_types** (*Optional*): This is a list of zone numbers mapped to zone types. Use this to designate zones as doors, motion sensors, smoke detectors, etc. The list of available zone types relevant to alarm zones are: `opening`, `motion`, `gas`, `smoke`, `moisture`, `safety`.

Example configuration:

```yaml
binary_sensor:
  platform: nx584
  host: 192.168.1.10:5007
  exclude_zones:
    - 3
    - 5
  zone_types:
    1: opening
    2: opening
    4: motion
    6: moisture
```