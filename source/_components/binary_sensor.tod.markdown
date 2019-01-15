---
layout: page
title: "Times of the Day Binary Sensor"
description: "Instructions on how to integrate Times of the Day binary sensors within Home Assistant."
date: 2019-01-14 23:35
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Binary Sensor
ha_release: 0.86
ha_iot_class: "Local Push"
logo: home-assistant.png
ha_qa_scale: internal
---

The `tod` platform supports binary sensors which get their values by checking
if the current time is within defined time ranges.
The time ranges can be provided as absolute local time or
using the `sunrise` or `sunset` keyword calcuated based on the sun position
for location defined in HA config. The location must be provided in the configuration.

In addition for sun position based ranges the negative or positive offset can 
be configured.

## {% linkable_title Configuration %}

Here is an example of adding a Template Binary Sensor to the `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: tod
    sensors:
      early_morning:
        after: sunrise
        after_offset: '-02:00'
        before: '07:00'
```
{% endraw %}

{% configuration %}
sensors:
  description: List of your sensors.
  required: true
  type: map
  keys:
    sensor_name:
      description: The slug of the sensor.
      required: true
      type: map
      keys:
        friendly_name:
          description: Name to use in the frontend.
          required: false
          type: string
        before:
          description: The absolute local time value or sun event for begnining of the time range
          required: true
          type: string or time
        before_offset:
          description: The time offset of the beginig time range
          type: time
        after:
          description: The absolute local time value or sun event for ending of the time range
          required: true
          type: string or time
        after_offset:
          description: The time offset of the beginig time range
          type: time
{% endconfiguration %}

## {% linkable_title Considerations %}

The primary purpose of this sensor is to use a simple time range definition instead of creating a complex
template with references to `sun.sun` component attributes.


The sensor state is ON when this condition `after` + `after_offset` <= `current time` < `before` + `before_offset`.

If `after` time is later than `before` then the next day is considered, i.e.:

```yaml
binary_sensor:
  - plartform: tod
    sensors:
      night:
        after: sunset
        before: sunrise
```

In above example the next day `sunrise` is calculated as a time range end.


