---
title: Swiss public transport
description: Instructions on how to integrate timetable data for traveling in Switzerland within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: pre 0.7
ha_config_flow: true
ha_codeowners:
  - '@fabaff'
  - '@miaucl'
ha_domain: swiss_public_transport
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `swiss_public_transport` sensor will give you the next three departure times from a given location to another one in Switzerland.

The [Swiss public transport API](https://transport.opendata.ch/) only allows 1000 requests per 24 hours. The default polling rate is set to `180s`, which works for two connections set up in parallel. If more entries are needed, consider [defining-a-custom-polling-interval](#defining-a-custom-polling-interval) to reduce the amount of requests.

The [Stationboard](https://transport.opendata.ch/examples/stationboard.html) website can help to determine the exact name of the start and the end station.

{% include integrations/config_flow.md %}

{% configuration %}
from:
  description: The ID of the station of the start station.
  required: true
  type: string
to:
  description: The ID of the station of the end station.
  required: true
  type: string
name:
  description: The name of the sensor.
  required: false
  type: string
  default: Next Departure
{% endconfiguration %}

The public timetables are coming from [Swiss public transport](https://transport.opendata.ch/).

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}
