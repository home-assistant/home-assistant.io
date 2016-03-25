---
layout: page
title: "BART"
description: "How to integrate the BART API in Home Assistant"
date: 2016-03-24 23:04
sidebar: true
comments: false
sharing: true
footer: true
logo: bart.png
ha_category: Sensor
ha_iot_class: "Local Polling"
---


The `bart` sensor will give you the departure times of the next trains for the given `origin` and `lines`. `bart` also exposes any active BART advisories. The `ATTRIBUTES` are used to provide extra information about the train, such as the length and final destination. The sensor is powered by the official BART [API](http://api.bart.gov/docs/overview/index.aspx).


To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bart
    origin: 19TH
    lines:
      - MLBR
      - SFIA
```

Configuration variables:

- **origin** (*Required*): The abbreviation of the station to get departure times for.
- **lines** (*Required*): The abbreviations for the lines you are trying to ride, e.g. setting SFIA means return trains with a destination of San Francisco Internationl Airport (SFIA).

You can find a list of all station names and abbreviations on [this page](http://api.bart.gov/docs/overview/abbrev.aspx).

