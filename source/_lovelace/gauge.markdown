---
title: "Gauge Card"
sidebar_label: Gauge
description: "The Gauge card is a basic card that allows visually seeing sensor data."
---

The Gauge card is a basic card that allows visually seeing sensor data.

<p class='img'>
<img src='/images/lovelace/lovelace_gauge_card.gif' alt='Screenshot of the Gauge card'>
Screenshot of the Gauge card.
</p>

To add the Gauge card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Gauge** from the card picker. All options for this card can be configured via the user interface.

Alternatively, the card can be configured using YAML:

```yaml
type: gauge
entity: sensor.cpu_usage
```

{% configuration %}
type:
  required: true
  description: "`gauge`"
  type: string
entity:
  required: true
  description: Entity ID to show.
  type: string
name:
  required: false
  description: Name of gauge entity.
  type: string
  default: Entity name
unit:
  required: false
  description: Unit of measurement given to data.
  type: string
  default: Unit of measurement given by entity
icon:
  required: false
  description: Overwrites icon.
  type: string
  default: Entity domain icon
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
min:
  required: false
  description: Minimum value for graph.
  type: integer
  default: 0
max:
  required: false
  description: Maximum value for graph.
  type: integer
  default: 100
severity:
  required: false
  description: Allows setting of colors for different numbers.
  type: map
  keys:
    green:
      required: true
      description: Value from which to start green color.
      type: integer
    yellow:
      required: true
      description: Value from which to start yellow color.
      type: integer
    red:
      required: true
      description: Value from which to start red color.
      type: integer
{% endconfiguration %}

## Examples

Title and unit of measurement:

```yaml
type: gauge
name: CPU Usage
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
