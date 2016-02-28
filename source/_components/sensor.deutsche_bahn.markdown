---
layout: page
title: "Swiss Public Transport"
description: "Instructions how to integrate timetable data for travelling in Switzerland within Home Assistant."
date: 2015-06-02 21:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_iot_class: "Local Polling"
---


The `deutsche_bahn` sensor will give you the departure time of the next train for the given connection. In case of a delay, the delay is also shown. Additional `ATTRIBUTES` are used to inform about eg. the type of the train, price and if it is ontime. The data are coming from the [bahn.de](http://www.bahn.de/p/view/index.shtml) website.


To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: deutsche_bahn
  from: NAME_OF_START_STATION
  to: NAME_OF_FINAL_STATION
```

Configuration variables:

- **from** (*Required*): The name of the start station.
- **to** (*Required*): The name of the end station.

