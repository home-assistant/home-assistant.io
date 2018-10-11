---
layout: page
title: "Transport NSW"
description: "Instructions on how to integrate timetable data for Transport NSW (Australia) within Home Assistant."
date: 2018-10-05 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: transport_nsw.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.81
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
    stop_id: '200024'
    api_key: 'YOUR API KEY'
```

{% configuration %}
api_key:
  description: Your API key for Open Data Transport NSW
  required: true
  type: string
stop_id:
  description: The ID of the stop to get the information for
  required: true
  type: string
route:
  description: Only show a single bus route at the stop. This is the same as the bus number, e.g., `83`
  required: false
  type: string
name:
  description: A friendly name for this sensor.
  required: false
  type: string
{% endconfiguration %}

The public information is coming from [Transport NSW](https://opendata.transport.nsw.gov.au/).
