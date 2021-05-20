---
title: Trafikverket Train
description: Instructions how to integrate Trafikverket Train within Home Assistant.
ha_category:
  - Transport
  - Sensor
ha_release: 0.96
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@endor-force'
ha_domain: trafikverket_train
ha_platforms:
  - sensor
---

Retrieve train departure information from [Trafikverket](https://www.trafikverket.se/).

Use cases:

- Retrieve the next departure and information connected to it for a specific train line.
- Retrieve information for specific departure time on a specific train line.
- Set up an alert or perform actions if your train is delayed or canceled.

Data that is retrieved: 

- Next departure for the specific train line.
- Canceled status.
- The number of minutes delayed.
- Planned time if no delays occur.
- Estimated time of arrival if delays occur.
- Actual time - when it did arrive.
- Other information / additional texts.
- Deviations.

## Configuration

To enable this sensor, use the following format in your `configuration.yaml`.

```yaml
sensor:
   - platform: trafikverket_train
     api_key: TRAFIKVERKET_API
     trains:
     - name: "Morning train to Malmö"
       from: "Stockholm Central"
       to: "Malmö C"
       time: "9:25"
       
     - name: "Next train to Uppsala"
       from: "Stockholm Central"
       to: "Uppsala C"
```

{% configuration %}
api_key:
  description: Your personal API key from Trafikverket.
  required: true
  type: string
trains:
  description: Specify details on the departures to monitor.
  required: true
  type: map
  keys:
    name:
      description: The name of the departure, will be the sensor name.
      required: true
      type: string
    from:
      description: The station from where the train departs.
      required: true
      type: string
    to:
      description: The destination station.
      required: true
      type: string
    time:
      description: Departure time to monitor, if not entered it will retrieve the next departure.
      required: false
      type: string
    weekday:
      description: Specify which days in the week to monitor the specific departure.
      required: false
      type: list
      default: "[mon, tue, wed, thu, fri, sat, sun]"
{% endconfiguration %}

## Obtaining API key

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

## Train station names

Click [here](https://www.trafikverket.se/trafikinformation/tag/?ArrDep=departure&) to see an example of train station names.

## Examples

```yaml
sensor:
- platform: trafikverket_train
  api_key: !secret trafikverket_api_key
  trains:
  - name: "Train to work"
    from: Sölvesborg
    to: Kristianstad C
    time: "07:28"
    weekday: [mon, tue, wed, thu, fri]
    
  - name: "Train from work early"
    from: Kristianstad C
    to: Sölvesborg
    time: "16:38"
    
  - name: "Train from work late"
    from: Kristianstad C
    to: Sölvesborg
    time: "17:02"
    weekday: [sat, sun]
    
  - name: "Next train to Uppsala"
    from: "Stockholm Central"
    to: "Uppsala C"
    
```
