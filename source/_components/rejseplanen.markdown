---
layout: page
title: "Rejseplanen Public Transport"
description: "Instructions on how to integrate timetable data for Danish Rejseplanen within Home Assistant."
date: 2019-01-09 08:52
sidebar: true
comments: false
sharing: true
footer: true
logo: rejseplanen.png
ha_category: Transport
ha_iot_class: Cloud Polling
ha_release: 0.88
redirect_from:
 - /components/sensor.rejseplanen/
---

The `rejseplanen` sensor will provide you with travel details for Danish public transport, using timetable data from [Rejseplanen](https://www.rejseplanen.dk/).

## {% linkable_title Setup %}

The `stop_id` can be obtained through the following steps:

- Go to [http://rejseplanen.dk](http://rejseplanen.dk)
- Make a search and fill in the location you want to find stop ID for in the from's (a) section. 
- Fill in either a random or the destination into the (b) section of the form.
- Press on "detaljer" and find the name of the stop you are looking for.
- Example search:
    - Jernaldervej 1, Søften, 8382 Hinnerup
    - Odense St. (detaljer) 
- Now insert the stop name in the end of this URL: http://xmlopen.rejseplanen.dk/bin/rest.exe/location?format=json&input=STOP_NAME

For "Engdalsvej/Århusvej" you would have to use: http://xmlopen.rejseplanen.dk/bin/rest.exe/location?format=json&input=Engdalsvej/%C3%85rhusvej
You will se a output like this:

```text
"StopLocation":[{
    "name":"Engdalsvej/Århusvej (Favrskov Kom)",
    "x":"10078598",
    "y":"56243456",
    "id":"713000702"
```

Find the name of your stop in the list and the "id" is the one you are looking for to us as value for `stop_id:`.

## {% linkable_title Configuration %}

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
route:
  description: List of route names.
  required: false
  type: string|list
direction:
  description: List of directions to filter by.
  required: false
  type: string|list
departure_type:
  description: List of departure types to filter by.
  required: false
  type: string|list
{% endconfiguration %}

## {% linkable_title Direction %}

If you use the direction filter it's important to put correct destination or else the sensor will not work at all.
The direction has to be the destination(s) for the transport type(s) for the departure stop destination, and NOT the stop where you want to get off. Check [http://rejseplanen.dk](http://rejseplanen.dk), make a search and use the destinations from there in your configuration. Make sure you use the exact name as the destination(s).

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

It fails because the destination from the departure is NOT København H, but 'CPH Lufthavn', 'Helsingør St.' and others.

## {% linkable_title Examples %}

A more extensive example on how to use this sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rejseplanen
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
| M | Metro |
| S | S-train |
| REG | Regional train |
