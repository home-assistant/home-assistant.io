---
title: Swiss public transport
description: Instructions on how to integrate timetable data for traveling in Switzerland within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: pre 0.7
ha_codeowners:
  - '@fabaff'
ha_domain: swiss_public_transport
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `swiss_public_transport` sensor will give you the next three departure times from a given location to another one in Switzerland.

The [Swiss public transport API](https://transport.opendata.ch/) only allows 1000 requests per 24 hours.

The [Stationboard](https://transport.opendata.ch/examples/stationboard.html) website can help to determine the exact name of the start and the end station.

Then add the data to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: swiss_public_transport
    from: STATION_ID
    to: STATION_ID
```

{% configuration %}
name:
  description: The name of the sensor.
  required: false
  type: string
  default: Next Departure
from:
  description: The ID of the station of the start station.
  required: true
  type: string
to:
  description: The ID of the station of the end station.
  required: true
  type: string
limit:
  description: The number of connections requested, allowed values are from `1` to `16`.
  required: false
  type: integer
  default: 3
page:
  description: The page of the connections requested, allowed values are from `0` to `3`.
  required: false
  type: integer
  default: 0
date:
  description: The date of the requested connection.
  required: false
  type: date
time:
  description: The time of the requested connection.
  required: false
  type: time
offset:
  description: The offset duration of the current timestamp of the requested connection.
  required: false
  type: datetime
is_arrival:
  description: The timestamp of the requested connection is for arrival instead of departure.
  required: false
  type: boolean
  default: false
transportations:
  description: Allowed means of transportation of the requested connection. Following values are known to the swiss opendata api: `train`, `tram`, `ship`, `bus`, and `cableway`.
  required: false
  type: list
  keys: string
direct:
  description: Must the requested connection be direct without transfers.
  required: false
  type: boolean
  default: false
sleeper:
  description: Must the requested connection have sleeper waggons.
  required: false
  type: boolean
  default: false
couchette:
  description: Must the requested connection have couchette waggons.
  required: false
  type: boolean
  default: false
bike:
  description: Must the requested connection allow bikes to be transported.
  required: false
  type: boolean
  default: false
accessibility:
  description: Accessibility options which must be available for the requested connection. Following valeus are known to the swiss opendata api: `independent_boarding`, `assisted_boarding`, and `advanced_notice`.
  required: false
  type: boolean
via:
  description: Via stations the requested connection must pass through. A maximum number of 5 via is allowed.
  required: false
  type: list
  keys: string
{% endconfiguration %}

The public timetables are coming from [Swiss public transport](https://transport.opendata.ch/).
