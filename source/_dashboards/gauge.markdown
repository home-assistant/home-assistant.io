---
type: card
title: "Gauge card"
sidebar_label: Gauge
description: "The gauge card is a basic card that allows visually seeing sensor data."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The gauge card is a basic card that allows visually seeing sensor data.

<p class='img'>
<img src='/images/dashboards/gauge_card.gif' alt='Screenshot of the Gauge card'>
Screenshot of the gauge card.
</p>

<p class='img'>
<img src='/images/dashboards/gauge_needle_card.png' alt='Screenshot of the Gauge card in needle mode'>
Screenshot of the gauge card in needle mode.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

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
needle:
  required: false
  description: Show the gauge as a needle gauge. Required to be set to true, if using segments.
  type: boolean
  default: false
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
segments:
  required: false
  description: List of colors and their corresponding start values. Segments will override the severity settings. Needle required to be true.
  type: list
  keys:
    from:
      required: true
      description: Value from which to start the color.
      type: integer
    color:
      required: true
      description: Color of the segment, may be any CSS color declaration like "red", "#0000FF" or "rgb(255, 120, 0)".
      type: string
    label:
      required: false
      description: Label of the segment. This will be shown instead of the value.
      type: string
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map      
{% endconfiguration %}

### Examples

Title and unit of measurement:

```yaml
type: gauge
name: CPU Usage
unit: '%'
entity: sensor.cpu_usage
```

<p class='img'>
<img src='/images/dashboards/gauge_card.gif' alt='Screenshot of the gauge card with custom title and unit of measurement'>
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

Multiple segments:

<p class='img'>
<img src='/images/dashboards/gauge_segments.png' alt='Screenshot of the gauge card with multiple colored segments.'>
Screenshot of the gauge card with multiple colored segments.
</p>

```yaml
type: gauge
entity: sensor.kitchen_humidity
needle: true
min: 20
max: 80
segments:
  - from: 0
    color: '#db4437'
  - from: 35
    color: '#ffa600'
  - from: 40
    color: '#43a047'
  - from: 60
    color: '#ffa600'
  - from: 65
    color: '#db4437'
```

CSS variables can be used (instead of CSS '#rrggbb') for default gauge segment colors:

- `var(--success-color)` for green color
- `var(--warning-color)` for yellow color
- `var(--error-color)` for red color
- `var(--info-color)` for blue color

Therefore, the previous example can be defined also as:

```yaml
type: gauge
entity: sensor.kitchen_humidity
needle: true
min: 20
max: 80
segments:
  - from: 0
    color: var(--error-color)
  - from: 35
    color: var(--warning-color)
  - from: 40
    color: var(--success-color)
  - from: 60
    color: var(--warning-color)
  - from: 65
    color: var(--error-color)
```
