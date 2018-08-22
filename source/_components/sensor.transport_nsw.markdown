---
layout: page
title: "Transport NSW"
description: "Instructions on how to integrate timetable data for Transport NSW (Australia) within Home Assistant."
date: 2018-08-18 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.76
---


The `transport_nsw` sensor will give you the time until the next departure from a Transport NSW stop (bus, train or ferry).

Get your free API key from [Transport NSW](https://opendata.transport.nsw.gov.au/).

In order to find the stop id, just go to Google maps and click on the bus/train/ferry stop. It will give you there the stop ID.

You can define a bus line, but if you don’t do it, the sensor will pick up the next stop event from any line servicing this stop.

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: transport_nsw
    name: 'Bus E80'
    stopid: '200024'
    route: 'E80'
    apikey: 'YOUR API KEY'
```

Configuration variables:
- **stopid** (*Required*): The ID of the bus stop to get the information for.
- **apikey** (*Required*): Your API key for Open Data Transport NSW
- **route** (*Optional*): Only show a single bus route at the stop. This is the same as the bus number, e.g., `83`.
- **name** (*Optional*): A friendly name for this sensor.

The public RTPI information is coming from [Transport NSW](https://opendata.transport.nsw.gov.au/).