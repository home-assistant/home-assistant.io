---
title: "Sensor Card"
sidebar_label: Sensor
description: "The Sensor card gives you a quick overview of your sensors state with an optional graph to visualize change over time."
---

The Sensor card gives you a quick overview of your sensors state with an optional graph to visualize change over time.

<p class='img'>
  <img src='/images/lovelace/lovelace_sensor.png' alt='Screenshot of the sensor card'>
  Screenshot of the sensor card.
</p>

> Note: This card looks similar to the custom [mini-graph-card](https://github.com/kalkih/mini-graph-card) but these two cards do not share the same configuration parameters and must be configured as per each cards documentation.

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
detail:
  required: false
  description: Detail of the graph `1` or `2`, `1` equals one point/hour, `2` equals six points/hour
  type: integer
  default: 1
hours_to_show:
  required: false
  description: Hours to show in graph
  type: integer
  default: 24
theme:
  required: false
  description: Set to any theme within `themes.yaml`
  type: string
{% endconfiguration %}

## Example

```yaml
type: sensor
entity: sensor.illumination
name: Illumination
```
