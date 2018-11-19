---
layout: page
title: "History Values Sensor"
description: "Instructions on how to integrate historical values into Home Assistant."
date: 2018-11-18 14:23
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Utility
ha_iot_class: "Local Polling"
ha_release: 0.83
ha_qa_scale: internal
---


The `history_values` sensor platform provides a way to process and summarize data from another component or platforms, using data from the [history](/components/history/).

It can calculate the minimum, maximum and average values and the range of these values, in a custom time period.

# {% linkable_title Configuration %}
{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
- platform: history_values
  name: "Peak Energy Usage Today"
  type: 'peak'
  target_entity_id: 'sensor.power_consumption'
  start: >
    {% set today %}
      {{- now().year }}-{{ now().month }}-{{ now().day -}}
    {% endset %}
    {{ as_timestamp(strptime(today, '%Y-%m-%d')) }}
  end: "{{ as_timestamp(now()) }}"
  update:
    minutes: '/5'
    seconds: 0
```
{% endraw %}
{% configuration %}
name:
  description: "Name of the sensor."
  required: true
  type: string
type:
  description: "Type of the sensor. Possible values are `average`, `low`, `peak` or `range`."
  required: true
  type: string
target_entity_id:
  description: "The entity for which values will be looked up in the history."
  required: true
  type: string
unit_of_measurement:
  description: "The unit of measurement to use for the sensor."
  required: false
  type: string
  default: "Unit of measurement from the target entity."
start:
  description: "A template which returns a timestamp specifying the start of the measurement period. Exactly 2 of `start`, `end` and `duration` must be specified."
  required: false
  type: template
end:
  description: "A template which returns a timestamp specifying the end of the measurement period. Exactly 2 of `start`, `end` and `duration` must be specified."
  required: false
  type: template
duration:
  description: "A time period indicating the duration of the measurement. Exactly 2 of `start`, `end` and `duration` must be specified."
  required: false
  type: time
update:
  description: "The update schedule of the `history_values` sensor. Must have at least one key if specified."
  required: false
  type: map
  keys:
    at:
      description: "The time of day on which the sensor will be updated."
      required: exclusive
      type: time
    hours:
      description: "The hours to match for an update of the sensor."
      required: false
      type: [integer, string]
    minutes:
      description: "The minutes to match for an update of the sensor."
      required: false
      type: [integer, string]
    seconds:
      description: "The seconds to match for an update of the sensor."
      required: false
      type: [integer, string]
{% endconfiguration %}

## {% linkable_title Sensor Types %}
The following types are supported:
* `average` will calculate the time-weighted average of the sensor in the target time period. Periods of time when the state of the target entity is `unknown` are disregarded.
* `low` will show the lowest value of the sensor in the target time period.
* `peak` will show the highest value of the sensor in the target time period.
* `range` will show the range of the sensor in the target time period. This is the same as the value of `peak` minus the value of `low`.

## {% linkable_title Target Time Period %}
Exactly two of `start`, `end` and `duration` must be specified to determine a period of time to target without ambiguity. If the end of the specified period lies in the future, only values up to the present are taken into account for calculation purposes.

## {% linkable_title Update Schedule %}
The `update` schedule is optional. If no `update` schedule is specified, the sensor will only update when service `homeassistant.update_entity` is called with its entity_id as an argument. If `update` is specified, the sensor will update once upon initialization and further according to the specified schedule.
If `at` is specified, none of the other keys may be present. `hours`, `minutes` and `seconds` can be integers to match on exact values, or strings like `minutes: '/5'` to match every fifth minute. If any of `hours`, `minutes` or `seconds` is not specified, it will always match. For this reason, when specifying hours and/or minutes, it is recommended to specify all shorter time values as well. Failing to do so will cause an update schedule like `hours: 15` to update every second between `15:00:00` and `15:59:59`, which is probably not what you want.


# {% linkable_title Examples %}
{% raw %}
```yaml
# Assumes sensor.solar_panel_production only increases over time.
sensor:
- platform: history_values
  name: "Total Power Production Yesterday"
  type: 'range'
  target_entity_id: 'sensor.solar_panel_production'
  start: >
    {% set today %}
      {{- now().year }}-{{ now().month }}-{{ now().day -}}
    {% endset %}
    {{ as_timestamp(strptime(today, '%Y-%m-%d')) - 86400 }}
  duration: "24:00:00"
  update:
    at: "00:00:01"
```
```yaml
sensor:
- platform: history_values
  name: "Lowest Temperature Last Hour"
  type: 'low'
  target_entity_id: 'sensor.temperature'
  duration: "01:00:00"
  end: "{{ as_timestamp(now()) }}"
  update:
    minutes: '/2'
    seconds: 0
```
{% endraw %}

