---
title: Israel Railways
description: Instructions on how to integrate timetable data for traveling in Israel rail within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 2024.8
ha_config_flow: true
ha_codeowners:
  - '@shaiu'
ha_domain: israel_rail
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Israel Railways** {% term integration %} will give you the next three departure times from a given location to another one in Israel rail.

{% include integrations/config_flow.md %}

The public timetables are coming from [Israel rail](https://www.rail.co.il).

## Sensors

For each configured connection, the integration creates a set of sensors for the next three upcoming departures. The first departure is unsuffixed; the second and third are suffixed with `+1` and `+2`.

| Sensor | Description |
| --- | --- |
| Departure / Departure +1 / Departure +2 | Scheduled departure time from the start station. |
| Platform / Platform +1 / Platform +2 | Platform the train departs from at the start station. |
| Train number / Train number +1 / Train number +2 | Identifier of the train operating the connection. |
| Trains / Trains +1 / Trains +2 | Number of trains involved in the connection (1 for a direct connection, more when a transfer is required). |
| Departure delay / Departure delay +1 / Departure delay +2 | Delay of the departure in minutes, as reported by the upstream API. |

If the upstream API returns a route whose departure time has already passed, that route is skipped so the sensors only ever show upcoming departures.

## Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}
