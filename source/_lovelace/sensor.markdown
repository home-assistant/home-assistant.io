---
layout: page
title: "Sensor Card"
sidebar_label: Sensor
description: "The sensor card gives you information about the sensor state"
date: 2018-10-07 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The sensor card gives you a quick overview of your sensors state with an optional graph to visualize change over time.

<p class='img'>
  <img src='/images/lovelace/lovelace_sensor.png' alt='Screenshot of the sensor card'>
  Screenshot of the sensor card.
</p>

{% configuration %}
type:
  required: true
  description: sensor
  type: string
entity:
  required: true
  description: Entity id of `sensor` domain
  type: string
icon:
  required: false
  description: The card icon
  type: string
name:
  required: false
  description: The card name
  type: string
graph:
  required: false
  description: Type of graph `none` or `line`
  type: string
unit:
  required: false
  description: The unit of measurement
  type: string
height:
  required: false
  description: Height of the graph
  type: integer
  default: 100
line_width:
  required: false
  description: Width of the line stroke
  type: integer
  default: 5
line_color:
  required: false
  description: Color of the line stroke
  type: string
accuracy:
  required: false
  description: Amount of data points on the graph
  type: integer
  default: 10
hours_to_show:
  required: false
  description: Hours to show in graph
  type: integer
  default: 24
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
- type: sensor
  entity: sensor.illumination
  name: Illumination
  height: 75
  line_color: "#3498db"
```
