---
title: Rejseplanen
description: Instructions on how to integrate timetable data for Danish Rejseplanen within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.88
ha_domain: rejseplanen
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `rejseplanen` {% term integration %} will provide you with travel details for Danish public transport, using timetable data from [Rejseplanen](https://www.rejseplanen.dk/).

## Configuration

Add a sensor to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rejseplanen
    stop_id: "YOUR_STOP_ID"
```

{% configuration %}
stop_id:
  description: The ID of the public transport stop.
  required: true
  type: string
name:
  description: "The name of the sensor. Entity ID for the sensor will be created based on this name. E.g., Glostrup St becomes `sensor.glostrup_st`. It's optional but recommended if you define more than one sensor."
  required: false
  type: string
  default: "Next departure"
route:
  description: List of route names.
  required: false
  type: [string, list]
direction:
  description: List of directions to filter by.
  required: false
  type: [string, list]
departure_type:
  description: List of departure types to filter by.
  required: false
  type: [string, list]
{% endconfiguration %}

## stop_id

The `stop_id` can be obtained through the following steps:

- Go to [https://www.openstreetmap.org](https://www.openstreetmap.org)
- Make a search and fill in the location you want to find for.
- The URL will look like this [https://www.openstreetmap.org/#map=18/56.15756/10.20674](https://www.openstreetmap.org/#map=18/56.15756/10.20674)
- Now insert the coordinates for the location in the URL, in this example it will be: [http://xmlopen.rejseplanen.dk/bin/rest.exe/stopsNearby?coordX=56.15756&coordY=10.20674&](http://xmlopen.rejseplanen.dk/bin/rest.exe/stopsNearby?coordX=56.15756&coordY=10.20674&)
- You will now see the 30 stops closest to your location.

You will see an output like this:

```text
"StopLocation":[{
    "name":"Engdalsvej/Århusvej (Favrskov Kom)",
    "x":"10078598",
    "y":"56243456",
    "id":"713000702"
```

Find the name of your stop in the list and the "id" is the one you are looking for to us as value for `stop_id:`.

## Direction

If you use the `direction` filter it's important to put correct final destination(s) or else the sensor will not work at all.
The `direction` has to be the scheduled final destination (direction) for the `Departure type` - ***NOT the stop where you want to get off***.

- Replace YOUR_STOP_ID with the id for your stop and go to [http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID](http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID)
- The values under `direction` is the ones you need to put under `direction`. Make sure you use the exact name, and add all that apply.

You will see an output like this:

```text
<Departure name="Bus 200" type="BUS" stop="Engdalsvej/Århusvej (Favrskov Kom)" time="10:15" date="06.05.20" id="713000701" line="200" messages="0" finalStop="Bjergegårdsvej/Rylevej (Favrskov Kom)" direction="Hinnerup">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=248868%2F117643%2F641354%2F237721%2F86%3Fdate%3D06.05.20" />
</Departure>
<Departure name="Bus 200" type="BUS" stop="Engdalsvej/Århusvej (Favrskov Kom)" time="10:25" date="06.05.20" id="713000702" line="200" messages="0" finalStop="Skanderborg Busterminal (Skanderborg Kom)" direction="Skanderborg Busterminal (Skanderborg Kom)">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=512592%2F205637%2F693742%2F176008%2F86%3Fdate%3D06.05.20" />
</Departure>
```

A working example on how to use this sensor with direction:

```yaml
# Example configuration.yaml entry with the correct use of direction.
sensor:
  - platform: rejseplanen
    stop_id: "713000702"
    direction:
      - 'Bjergegårdsvej/Rylevej (Favrskov Kom)'
      - 'Skanderborg Busterminal (Skanderborg Kom)'
```

## Route

If you use the `route` filter it's important to put correct route name(s) or else the sensor will not work at all. 

- Replace YOUR_STOP_ID with the id for your stop and go to [http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID](http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=YOUR_STOP_ID)
- The values under `Departure name` is the ones you need to put under `route`. Make sure you use the exact name.

You will see an output like this:

```text
<Departure name="Bus 1A" type="BUS" stop="Elmegade (Nørrebrogade)" time="10:19" date="06.05.20" id="45739" line="1A" messages="0" rtTime="10:21" rtDate="06.05.20" finalStop="Avedøre St." direction="Avedøre St.">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=138234%2F58362%2F751742%2F329795%2F86%3Fdate%3D06.05.20" />
</Departure>
<Departure name="Bus 5C" type="BUS" stop="Elmegade (Nørrebrogade)" time="10:22" date="06.05.20" id="45739" line="5C" messages="0" rtTime="10:23" rtDate="06.05.20" finalStop="Husum Torv, Sløjfen (Sløjfen)" direction="Husum Torv">
<JourneyDetailRef ref="http://xmlopen.rejseplanen.dk/bin/rest.exe/journeyDetail?ref=899547%2F321443%2F654384%2F27343%2F86%3Fdate%3D06.05.20" />
</Departure>
```

## Examples

A more extensive example on how to use this sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rejseplanen
    name: "Elmegade 350S"
    stop_id: "000045740"
    route: "Bus 350S"
    direction:
      - 'Herlev St.'
      - 'Ballerup St.'
```

The sensor can filter the timetables by one or more routes, directions and types. The known types are listed in the table below.

| Departure type | Description             |
| -------------- | ----------------------- |
| BUS            | Normal bus              |
| EXB            | Express bus             |
| TB             | Harbour bus             |
| LET            | Letbanen                |
| M              | Metro                   |
| S              | S-train                 |
| REG            | Regional train          |
| IC             | Intercity train         |
| LYN            | Intercity express train |
| TOG            | Other trains            |

## Attributes

| Attribute         | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| `due_in`          | Minutes until departure                                                          |
| `due_at`          | Departure date and time                                                          |
| `scheduled_at`    | Scheduled departure date and time                                                |
| `real_time_at`    | Real time departure date and time (in cases where it's different from scheduled) |
| `type`            | Transport type                                                                   |
| `route`           | Route code                                                                       |
| `direction`       | Destination stop                                                                 |
| `final_stop`      | Final stop (if departure doesn't go all the way to the destination stop)         |
| `stop`            | Departure stop                                                                   |
| `stop_id`         | ID of departure stop                                                             |
| `track`           | Departure track (if available)                                                   |
| `attribution`     | Attribution (required by data source)                                            |
| `next_departures` | List of further departures                                                       |

### `next_departures`

| Attribute      | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `due_in`       | Minutes until departure                                                          |
| `due_at`       | Departure date and time                                                          |
| `scheduled_at` | Scheduled departure date and time                                                |
| `real_time_at` | Real time departure date and time (in cases where it's different from scheduled) |
| `type`         | Transport type                                                                   |
| `route`        | Route code                                                                       |
| `direction`    | Destination stop                                                                 |
| `final_stop`   | Final stop (if departure doesn't go all the way to the destination stop)         |
| `stop`         | Departure stop                                                                   |
| `track`        | Departure track (if available)                                                   |
