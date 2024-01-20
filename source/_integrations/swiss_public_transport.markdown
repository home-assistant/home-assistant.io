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

The [Swiss public transport API](https://transport.opendata.ch/) only allows 1000 requests per 24 hours. The default polling rate is set to `180s`, which works for two connections set up in parallel. If more entries are needed, consider deactivating the default polling for this integration and use an automation to update of the connection using the service `homeassistant.update_entity` and the `time_pattern` trigger.

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

### Custom polling rate

When setting up more than 2 connections, the default polling rate saturates the rate limit of the API. Here is an example of an automation using the `time_pattern` trigger and the `homeassistant.update_entity` service.

_Don't forget to deactivate the polling in the integration's system options._

```yaml
alias: 180s custom polling example
trigger:
  - platform: time_pattern
    minutes: /3
action:
  - service: homeassistant.update_entity
    target:
      entity_id: sensor.a_b_departure
    data: {}
mode: single
```
