---
description: Instructions on how to integrate timetable data for traveling in Switzerland within Home Assistant.
ha_release: pre 0.7
ha_domain: swiss_public_transport
---

The **Swiss public transport** {% term integration %} gives you public transport timetable data for Switzerland.
You can add two kinds of entries:

- **Connection between two stations**: The next three departure times from a given location to another one.
- **Departures from a station**: The next three departures from one or more stations, like the departure board at the station.

The [Swiss public transport API](https://transport.opendata.ch/) only allows 1000 requests per 24 hours. The default polling rate is set to `90s`, which is just enough for one connection polling continuously. Every connection and every stationboard you add counts toward this limit. If more entries are needed, consider [defining a custom polling interval](#defining-a-custom-polling-interval) to reduce the amount of requests.

When you add the integration, you first select what you want to set up. The options below are for **Connection between two stations**. For the options for **Departures from a station**, refer to [Set up departures from a station](#set-up-departures-from-a-station).

{% configuration_basic %}
Start station:
  description: "The departure station for the start of the connection (e.g., `Zürich HB`)"
End station:
  description: "The arrival station for the end of the connection (e.g., `Geneva`)"
Via stations:
  description: "List of up to 5 via stations (e.g., `Bern`, `Lausanne`)"
Means of transport:
  description: "Only show connections that use the selected means of transport (train, tram, ship, bus, cableway). Leave empty to allow all."
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

### Means of transport

By default, a connection can use any means of transport. This includes connections that start with a walk to a nearby stop, for example, a few minutes on foot to a bus stop next to the train station. The sensors then show the start of that walk as the departure time.

Select one or more _Means of transport_ to only get connections that use them. For example, select **Train** to only get train departures from a station that is also served by nearby buses.

The selection can't be changed later. To use a different selection, add the connection again.

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

## Set up departures from a station

A stationboard shows the next departures from a station, like the departure board at the station itself.
Use it when you want to know what leaves from your stop next, no matter where it goes, or when several lines serve the direction you want to travel.

To set up a stationboard, add the integration and select **Departures from a station**.

![Setup dialog for departures from a station, with Bern as the station and Bern Wankdorf under Stops at](/images/integrations/swiss_public_transport/config_flow_stationboard.png)

{% configuration_basic %}
Stations:
  description: "List of up to 3 stations whose departures are combined into one stationboard (for example, `Bern`)."
Stops at:
  description: "Only show departures that later stop at one of these stations (for example, `Bern Wankdorf`). Leave empty to show all departures."
{% endconfiguration_basic %}

The stations can't be changed later.
To use different stations, add the stationboard again.

### Connection or stationboard

Both kinds of entries can answer "when does the next train leave?", but they work differently:

- A connection plans a route from a start station to an end station. The result can include transfers, and it can start with a walk to a nearby stop.
- A stationboard lists what departs from the stations you entered. It never includes walks or transfers, and it doesn't need an end station.

To get the departures from your station in a certain direction, use a stationboard with a **Stops at** station.

### Combining several stations

If you enter more than one station, their departures are merged into one list.
This is useful for stations that are next to each other, for example a train station and the bus stop in front of it.

The sensors don't show which of the stations a departure leaves from.
In most cases, the line makes that clear.

### Filtering by direction with Stops at

Without a **Stops at** station, the stationboard shows all departures, in every direction.
With one or more **Stops at** stations, it only shows departures that stop at one of them later on their route.

- A departure is shown if it stops at any of the stations you entered. It doesn't need to stop at all of them. This is different from the via stations of a connection, where the route goes through every station.
- If your destination has more than one stop, for example `Luzern` and `Luzern, Bahnhof`, enter all of them to see every way to get there.
- Home Assistant looks up each station you enter and saves it under its official name. For example, `luzern` becomes `Luzern`. The name of the stationboard shows the result, such as "Bern stops at Bern Wankdorf".
- With a **Stops at** station, Home Assistant searches the next 40 departures of each station. At a very busy stop, fewer than three of those departures might stop at your **Stops at** stations. The sensors without a matching departure then show as unknown.

### Stationboard sensors

A stationboard provides the following sensors:

- **Departure**: The time of the next departure.
- **Departure +1**: The time of the second departure.
- **Departure +2**: The time of the third departure.
- **Destination**: The final stop of the next departure.
- **Platform**: The platform or stop the next departure leaves from.
- **Delay**: The delay of the next departure, in minutes. Shows as unknown when no delay is reported.
- **Line**: The line of the next departure, for example `S3` or `IC1`.

{% include integrations/actions.md %}

## Swiss public transport automation examples

Once you have set up a stationboard, you can use its sensors and the **Fetch departures** action in your automations.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Sending a notification when the next departure is delayed

Get a notification when the next departure on your stationboard is more than 5 minutes late.
This example uses the sensors of the stationboard from the screenshot above, with `Bern` as the station and `Bern Wankdorf` under **Stops at**.
Replace them with the sensors of your own stationboard.

- **Trigger**: Numeric state
  - **Entity**: The **Delay** sensor of your stationboard (`sensor.bern_stops_at_bern_wankdorf_delay`)
  - **Above**: 5
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: {% raw %}`{{ states('sensor.bern_stops_at_bern_wankdorf_line') }} to {{ states('sensor.bern_stops_at_bern_wankdorf_destination') }} is {{ states('sensor.bern_stops_at_bern_wankdorf_delay') }} minutes late.`{% endraw %}

{% details "YAML example for sending a notification when the next departure is delayed" %}

{% example %}
automation: |
  alias: "Notify when the next departure is delayed"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.bern_stops_at_bern_wankdorf_delay
      above: 5
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {{ states('sensor.bern_stops_at_bern_wankdorf_line') }} to
          {{ states('sensor.bern_stops_at_bern_wankdorf_destination') }} is
          {{ states('sensor.bern_stops_at_bern_wankdorf_delay') }} minutes late.
{% endexample %}

{% enddetails %}

### Automation: Sending the next departures before you leave

Get the next five departures from your stop as a notification on your phone every morning, so you know when to leave the house.

- **Trigger**: Time: at 07:00
- **Action**: Fetch departures
  - **Instance**: Your stationboard
  - **Limit**: 5
  - **Response variable**: `stationboard`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: A template that lists the time, line, and destination of each departure. Copy it from the YAML example.

{% details "YAML example for sending the next departures in the morning" %}

Replace `YOUR_CONFIG_ENTRY_ID` by selecting your stationboard under **Instance** after you paste the example.

{% example %}
automation: |
  alias: "Send the next departures in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: swiss_public_transport.fetch_departures
      data:
        config_entry_id: YOUR_CONFIG_ENTRY_ID
        limit: 5
      response_variable: stationboard
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          {% for departure in stationboard.departures %}
          {{ as_timestamp(departure.departure) | timestamp_custom('%H:%M') }}
          {{ departure.line }} to {{ departure.destination }}.
          {% endfor %}
{% endexample %}

{% enddetails %}

## Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
