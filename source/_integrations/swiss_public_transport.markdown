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

The Swiss public transport integration will give you the next three departure times from a given location to another one in Switzerland.

The [Swiss public transport API](https://transport.opendata.ch/) only allows 1000 requests per 24 hours. The default polling rate is set to `90s`, which is just enough for one connection polling continuously. If more entries are needed, consider [defining a custom polling interval](#defining-a-custom-polling-interval) to reduce the amount of requests.

The [Stationboard](https://transport.opendata.ch/examples/stationboard.html) website can help to determine the exact name of the start and the end station.

{% include integrations/config_flow.md %}

The public timetables are coming from [Swiss public transport](https://transport.opendata.ch/).

## Actions

The Swiss public transport integration has the following action:

- `swiss_public_transport.fetch_connections`

### Action `swiss_public_transport.fetch_connections`

Fetch the connections for a specific instance.

| Data attribute | Optional | Description                                              |
|------------------------|----------|----------------------------------------------------------|
| `config_entry_id`      | No       | The ID of the Swiss public transport config entry to get data from. For example, in YAML: `config_entry_id: zurich_geneva` or in UI `Instance: zurich_geneva`)|
| `limit`                | Yes      | The number of connections to fetch. (default: 3, range: [1,15])|

## Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}
