---
layout: page
title: "Gauge Card"
sidebar_label: Gauge
description: "The Gauge card allows you to display sensor information visually"
date: 2018-10-11 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

Gauge card is a basic card that allows visually seeing sensor data.

<p class='img'>
<img src='/images/lovelace/lovelace_gauge_card.gif' alt='Screenshot of the gauge card'>
Screenshot of the gauge card.
</p>

```yaml
- type: gauge
  entity: sensor.cpu_usuage
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
title:
  required: false
  description: Title of Gauge Data
  type: string
unit_of_measurement:
  required: false
  description: Unit of Measurement given to data
  type: string
  default: "Unit Of Measurement given by entity"
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

## {% linkable_title Examples %}

Title and Unit of Measurement Example:

```yaml
- type: gauge
  title: CPU Usuage
  unit_of_measurement: '%'
  entity: sensor.cpu_usuage
```

<p class='img'>
<img src='/images/lovelace/lovelace_gauge_card.gif' alt='Screenshot of the gauge card with custom title and unit of measurement'>
Screenshot of the gauge card with custom title and unit of measurement.
</p>

Define the severity map:

```yaml
- type: gauge
  title: With Severity
  title: CPU Usuage
  unit_of_measurement: '%'
  entity: sensor.cpu_usuage
  severity:
    green: 0
    yellow: 45
    red: 85
```
