---
layout: page
title: "Irish Rail Transport"
description: "Instructions on how to integrate timetable data for traveling on Irish Rail within Home Assistant."
date: 2017-10-15 16:50
sidebar: true
comments: false
sharing: true
footer: true
logo: irishrail.png
ha_category: Transport
ha_iot_class: "Cloud Polling"
ha_release: 0.57
---


The `irish_rail_transport` sensor will give you the time until the next two departures (within 90 minutes) from an Irish Rail station using the RTPI information.

A station name is the full station name as specified on the Irish Rail search site, for example, `Tara Street` or `Dublin Connolly`.

To activate the sensor add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: irish_rail_transport
    station: "Tara Street"
    name: "To Greystones"
```

Configuration variables:

- **station** (*Required*): The name of the station.
- **direction** (*Optional*): The direction of the train. Typically either `Northbound` or `Southbound`.
- **destination** (*Optional*): The name of the destination station to filter by.
- **stops_at** (*Optional*): An optional filter based on the name of a station that the train stops at.
- **name** (*Optional*): A friendly name for this sensor.

Using the `stops_at` option will cause an extra request per train found. Therefore, if you are looking at a busy station, it is recommended that you also use at least one other filter. For example:

```yaml
# Example full configuration.yaml entry
sensor:
  - platform: irish_rail_transport
    station: "Tara Street"
    direction: Southbound
    destination: Greystones
    stops_at: "Dun Laoghaire"
    name: "To Greystones"
```

The above example will show the next 2 `Southbound` trains that leave `Tara Street` station, going to `Greystones` via `Dun Laoghaire`:
