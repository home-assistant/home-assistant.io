---
layout: page
title: "Swiss Public Transport"
description: "Instructions on how to integrate timetable data for traveling in Switzerland within Home Assistant."
date: 2015-06-02 21:45
sidebar: true
comments: false
sharing: true
footer: true
logo: train.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: pre 0.7
---


The `swiss_public_transport` sensor will give you the next three departure times from a given location to another one in Switzerland.

The [Swiss public transport API](http://transport.opendata.ch/) only allows 1000 requests per 24 hours.

The [Stationboard](http://transport.opendata.ch/examples/stationboard.html) website can help to determine the exact name of the start and the end station.

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: swiss_public_transport
    from: STATION_ID
    to: STATION_ID
```

Configuration variables:

- **from** (*Required*): The ID of the station of the start station.
- **to** (*Required*): The ID of the station of the end station.
- **name** (*Optional*): The name of the sensor. Defaults to 'Next Departure'. 

The public timetables are coming from [Swiss public transport](http://transport.opendata.ch).
