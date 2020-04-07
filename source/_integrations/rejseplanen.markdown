---
title: Rejseplanen
description: Instructions on how to integrate timetable data for Danish Rejseplanen within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.88
ha_domain: rejseplanen
---

The `rejseplanen` sensor will provide you with travel details for Danish public transport, using timetable data from [Rejseplanen](https://www.rejseplanen.dk/).

## Setup

The `stop_id` can be obtained through the following steps:

If you know the exact name of the stop you can search the stop_id with the following URL [http://xmlopen.rejseplanen.dk/bin/rest.exe/location?format=json&input=STOP_NAME](http://xmlopen.rejseplanen.dk/bin/rest.exe/location?format=json&input=STOP_NAME) and put in the name of the stop instead of "STOP_NAME" in the end of the URL.

If you don't know the name of the stop follow this guide:
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

## Configuration

Add a sensor to your `configuration.yaml` file as shown in the example:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rejseplanen
    stop_id: 'YOUR_STOP_ID'
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

## Direction

If you use the `direction` filter it's important to put correct final destination(s) or else the sensor will not work at all.
The `direction` has to be the final destination(s) for the `Departure type` - ***NOT the stop where you want to get off***. 

- Check [https://rejseplanen.dk/](https://rejseplanen.dk/)
- Make a search and use **all variations** for the final destination(s) for the needed `Departure type` in your configuration under `direction`. Make sure you use the exact name for final destination(s).

A working example on how to use this sensor with direction:

```yaml
# Example configuration.yaml entry with the correct use of direction.
sensor:
  - platform: rejseplanen
    stop_id: '008600615'
    direction:
      - 'CPH Lufthavn'
      - 'Helsingør St.'
```

A NOT WORKING example use this sensor with direction:

```yaml
# Example configuration.yaml entry with the correct use of direction.
sensor:
  - platform: rejseplanen
    stop_id: '008600615'
    direction:
      - 'København H'
```

It fails because the final destination for the train from the departure station is NOT 'københavn H', but 'CPH Lufthavn' and 'Helsingør St.'.

## Examples

A more extensive example on how to use this sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rejseplanen
    name: 'Elmegade 350S'
    stop_id: '000045740'
    route: 'Bus 350S'
    direction:
      - 'Herlev St.'
      - 'Ballerup St.'
```

The sensor can filter the timetables by one or more routes, directions and types. The known types are listed in the table below.

| Departure type | Description |
|--------------|-------------|
| BUS | Normal bus |
| EXB | Express bus |
| TB | Harbour bus|
| LET | Letbanen |
| M | Metro |
| S | S-train |
| REG | Regional train |
| IC | Intercity train |
| LYN | Intercity express train |
| TOG | Other trains |

## Attributes

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| `due_in` | Minutes until departure |
| `due_at` | Departure date and time |
| `type` | Transport type |
| `route` | Route code |
| `direction` | Destination stop |
| `stop` | Departure stop |
| `stop_id` | ID of departure stop |
| `attribution` | Attribution (required by data source) |
| `next_departures` | List of further departures |

### `next_departures`

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| `due_in` | Minutes until departure |
| `due_at` | Departure date and time |
| `type` | Transport type |
| `route` | Route code |
| `direction` | Destination stop |
| `stop` | Departure stop |
