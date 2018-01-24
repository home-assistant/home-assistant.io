---
layout: page
title: "Dublin Bus Transport"
description: "Instructions how to integrate timetable data for traveling on Dublin Bus within Home Assistant."
date: 2017-01-09 21:45
sidebar: true
comments: false
sharing: true
footer: true
logo: dublin_bus.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.36
---


The `dublin_bus_transport` sensor will give you the time until the next two departures from a Dublin bus stop using the RTPI information.

The [Dublin Bus](https://www.dublinbus.ie/RTPI/) website can help to determine the id of your bus stop. You can check if this is correct by going to 

https://data.dublinked.ie/cgi-bin/rtpi/realtimebusinformation?stopid=[Stop ID]

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dublin_bus_transport
    stopid: STOP_ID
```

Configuration variables:

- **stopid** (*Required*): The ID of the bus stop to get the information for.
- **route** (*Optional*): Only show a single bus route at the stop. This is the same as the bus number, e.g. `83`.
- **name** (*Optional*): A friendly name for this sensor.

The public RTPI information is coming from [Dub Linked](https://data.dublinked.ie/).
