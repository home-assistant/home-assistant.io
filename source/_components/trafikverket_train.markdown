---
layout: page
title: "Trafikverket Train"
description: "Instructions how to integrate Trafikverket Train within Home Assistant."
date: 2019-04-27 16:32
sidebar: true
comments: false
sharing: true
footer: true
logo: trafikverket.png
ha_category: Transport
ha_release: 0.93
ha_iot_class: Cloud Polling
redirect_from:
 - /components/sensor.trafikverket_train/
---

Retreive train departure information from [Trafikverket](https://www.trafikverket.se/).

Use cases:

- Retreive the next departure and information connected to it for a specific train line.
- Retreive information for a specific departure time on a specific train line.
- Set up alert or perform actions if your train is delayed or cancelled.

## {% linkable_title Configuration %}

To enable this sensor, use the following format in your `configuration.yaml`.

```yaml
sensor:
   - platform: trafikverket_train
     api_key: !secret trafikverket_api
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
      description: Departure time to monitor, if not entered it will retreive the next departure.
      required: true
      type: string
    
    
{% endconfiguration %}

## {% linkable_title Obtaining API key %}

Please click [here](https://api.trafikinfo.trafikverket.se/) and register to obtain the API key.

## {% linkable_title Train station names %}

Click [here](https://www.trafikverket.se/trafikinformation/tag/?ArrDep=departure&) to see example of train station names.

## {% linkable_title Examples %}

```yaml
sensor:
- platform: trafikverket
  api_key: !secret trafikverket_api_key
  trains:
  - name: "Train to work"
    from: Sölvesborg
    to: Kristianstad C
    time: "07:28"
  - name: "Train from work early"
    from: Kristianstad C
    to: Sölvesborg
    time: "16:38"
  - name: "Train from work late"
    from: Kristianstad C
    to: Sölvesborg
    time: "17:02"
    
script:
  notify_train_status:
    alias: Notify train status
    sequence:
      - service: notify.notify
        data_template:
          title: "{{ states.sensor[train_entity_id].attributes.friendly_name }}"
          message: >
            {{ states.sensor[train_entity_id].attributes.friendly_name }} är {{ '' }}
            {%- if is_state('sensor.' + train_entity_id, 'delayed') -%}
              försenat med {{ '' }}
              {{- states.sensor[train_entity_id].attributes.number_of_minutes_delayed|int -}}
               {{ '' }} minuter
            {%- elif is_state('sensor.' + train_entity_id, 'canceled') -%}
              inställt
            {%- else -%}
              i tid
            {%- endif -%}
            {%- if states.sensor[train_entity_id].attributes.other_information -%}
              , övrig information: {{ states.sensor[train_entity_id].attributes.other_information -}}
            {%- endif -%}
            {%- if states.sensor[train_entity_id].attributes.deviations -%}
              , avvikelser: {{ states.sensor[train_entity_id].attributes.deviations -}}
            {%- endif -%}
            .
          data:
            icon: "https://materialdesignicons.com/api/download/B6E1232A-3A43-4200-BE34-1BC436B34BF1/FFFFFF/1/FFFFFF/0/128"

automation:
  - alias: "Train to work notification"
    trigger:
      platform: state
      entity_id: sensor.train_to_work
    condition:
    - condition: and
      conditions:
      - condition: time
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
      - condition: or
        conditions:
        - condition: state
          entity_id: sensor.train_to_work
          state: 'delayed'
        - condition: state
          entity_id: sensor.train_to_work
          state: 'canceled'
    action:
      service: script.turn_on
      entity_id: script.notify_train_status
      data:
        variables:
          train_entity_id: 'train_to_work'

  - alias: "Train from work early notification"
    trigger:
      platform: state
      entity_id: sensor.train_from_work_early
    condition:
    - condition: and
      conditions:
      - condition: time
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
      - condition: or
        conditions:
        - condition: state
          entity_id: sensor.train_from_work_early
          state: 'delayed'
        - condition: state
          entity_id: sensor.train_from_work_early
          state: 'canceled'
    action:
      service: script.turn_on
      entity_id: script.notify_train_status
      data:
        variables:
          train_entity_id: 'train_from_work_early'

  - alias: "Train from work late notification"
    trigger:
      platform: state
      entity_id: sensor.train_from_work_late
    condition:
    - condition: and
      conditions:
      - condition: time
        weekday:
          - mon
          - tue
          - wed
          - thu
          - fri
      - condition: or
        conditions:
        - condition: state
          entity_id: sensor.train_from_work_late
          state: 'delayed'
        - condition: state
          entity_id: sensor.train_from_work_late
          state: 'canceled'
    action:
      service: script.turn_on
      entity_id: script.notify_train_status
      data:
        variables:
          train_entity_id: 'train_from_work_late'
```
