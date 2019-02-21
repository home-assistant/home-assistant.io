---
layout: page
title: "Rejseplanen Public Transport"
description: "Instructions on how to integrate timetable data for danish Rejseplanen within Home Assistant."
date: 2019-01-09 08:52
sidebar: true
comments: false
sharing: true
footer: true
logo: rejseplanen.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.88
---

The `rejseplanen` sensor will provide you with traveling details for Danish public transport, using timetable data from [Rejseplanen](https://www.rejseplanen.dk/).

## {% linkable_title Configuration %}

Add a sensor to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rejseplanen
    stop_id: 'YOUR_STOP_ID'
```

The `stop_id` can be obtained by looking up the name of the stop at this link: 

<http://xmlopen.rejseplanen.dk/bin/rest.exe/location?format=json&input=STOP_NAME>
(Replace "STOP_NAME" with city or location you want id for)
find the stop and copy the `id` field with the trailing zeros.

The sensor can filter the timetables by one or more routes, directions and types. The known types are listed in the table below.

| Departure type | Description |
|--------------|-------------|
| BUS | Normal bus |
| EXB | Express bus |
| M | Metro |
| S | S-train |
| REG | Regional train |

{% configuration %}
stop_id:
  description: The id of the public transport stop.
  required: true
  type: string
route:
  description: List of route names.
  required: false
  type: string|list
direction:
  description: List of directions to filter by.
  required: false
  type: string|list
departure_type:
  description: List of departure types to filter by.
  required: false
  type: string|list
{% endconfiguration %}

## {% linkable_title Examples %}

A more extensive example on how to use this sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rejseplanen
    stop_id: '000045740'
    route: 'Bus 350S'
    direction:
      - 'Herlev St.'
      - 'Ballerup St.'
```
