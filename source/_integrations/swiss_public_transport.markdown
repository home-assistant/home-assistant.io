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

{% configuration_basic %}
Start station:
  description: "The departure station for the start of the connection (e.g., `Zürich HB`)"
End station:
  description: "The arrival station for the end of the connection (e.g., `Geneva`)"
Via stations:
  description: "List of up to 5 via stations (e.g., `Bern`, `Lausanne`)"
Departure or arrival time:
  description: "Choose between the departure or arrival time or the connection to be displayed"
Time mode:
  description: "The time mode of the connections (e.g., `now` , `fixed`, `offset`)"
Fixed time of day (only when time mode is set to fixed):
  description: "The relevant time for the connection (e.g. 7:12:00 AM every morning)."
Offset time from now (only when time mode is set to fixed):
  description: "The time offset added to the earliest possible connection (e.g. add +00:05:00 offset, taking into account the time to walk to the station)"
{% endconfiguration_basic %}

Use the [Stationboard](https://transport.opendata.ch/examples/stationboard.html) to find exact station names.

{% include integrations/config_flow.md %}

The public timetables are coming from [Swiss public transport](https://transport.opendata.ch/).

## Set up a connection

The minimum configuration for a connection requires a _start_ and _end_ station (for example, "Zürich HB").

Optionally, you can provide up to 5 additional _via_ stations where the connection must go through.

![Config flow](/images/integrations/swiss_public_transport/config_flow.png)

### Time mode

The _Time mode_ allows you to specify the time of the connections.

- Now (default): Provide the next connections.
- At a fixed time of day: Provide the connections that depart at a fixed time of day (for example, 18:15 in the evening)
- At an offset from now: Provide the next possible connections which depart after a specified offset (for example, 15 minutes from now, which helps account for a 15-minute walk to the station)

![Time mode option](/images/integrations/swiss_public_transport/config_flow_time_mode.png)

#### Use case: Next connection at my local bus stop

Usually, it takes some time to walk to the closest bus station from home, which can be modeled using the `offset` option in the _Time mode_ dropdown, filtering out connections which are not reachable anymore. This information can then be displayed at the door or on your mobile device.

![Offset time mode option](/images/integrations/swiss_public_transport/config_flow_time_offset.png)

#### Use case: Daily train home

For people working business hours, a set-up using the `fixed` option in the _Time mode_ allows you to identify the same train each day for commuting home. Set up an automation to send a push notification to get informed early.

![Fixed time mode option](/images/integrations/swiss_public_transport/config_flow_time_fixed.png)

### Departure versus Arrival

Usually, one wants to know when a connection **departs** (default), but in case where the opposite is needed and one wants to know when a connection **arrives**, select "Show arrival time at end station" in the time reference dropdown.

When configured for arrival time, the sensor will display the arrival time at the destination instead of the departure time from the start station. This is particularly useful for automations that need to trigger based on arrival times.

![Departure versus arrival option](/images/integrations/swiss_public_transport/config_flow_departure_arrival.png)

#### Use case: Inform family of train arriving late

A popular use case would be to know if your family member is running late and sending out a push notification or displaying their arrival time at home.

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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
