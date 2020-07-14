---
title: "Gauge Card"
sidebar_label: Gauge
description: "The Gauge card is a basic card that allows visually seeing sensor data."
---

The Gauge card is a basic card that allows visually seeing sensor data.

<p class='img'>
<img src='/images/lovelace/lovelace_gauge_card.gif' alt='Screenshot of the gauge card'>
Screenshot of the gauge card.
</p>

```yaml
type: gauge
entity: sensor.cpu_usage
```

{% configuration %}
type:
  required: true
  description: gauge
  type: string
entity:
  required: true
  description: "Entity id to show"
  type: string
name:
  required: false
  description: Name of Gauge Entity
  type: string
  default: Entity Name
unit:
  required: false
  description: Unit of Measurement given to data
  type: string
  default: "Unit Of Measurement given by entity"
theme:
  required: false
  description: Set to any theme within `themes.yaml`
  type: string
min:
  required: false
  description: Minimum value for graph
  type: integer
  default: 0
max:
  required: false
  description: Maximum value for graph
  type: integer
  default: 100
severity:
  required: false
  description: Allows setting of colors for different numbers
  type: map
  keys:
    green:
      required: true
      description: Value from which to start green color
      type: integer
    yellow:
      required: true
      description: Value from which to start yellow color
      type: integer
    red:
      required: true
      description: Value from which to start red color
      type: integer
{% endconfiguration %}

## Examples

Title and Unit of Measurement Example:

```yaml
type: gauge
name: CPU Usuage
unit: '%'
entity: sensor.cpu_usage
```

<p class='img'>
<img src='/images/lovelace/lovelace_gauge_card.gif' alt='Screenshot of the gauge card with custom title and unit of measurement'>
Screenshot of the gauge card with custom title and unit of measurement.
</p>

Define the severity map:

```yaml
type: gauge
name: With Severity
unit: '%'
entity: sensor.cpu_usage
severity:
  green: 0
  yellow: 45
  red: 85
```
