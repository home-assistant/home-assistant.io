---
type: card
title: "Sensor card"
sidebar_label: Sensor
description: "The sensor card gives you a quick overview of a sensor's state with an optional graph to visualize change over time."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
  - docs: /dashboards/naming/
    title: Card naming
---

The sensor card gives you a quick overview of a sensor's state with an optional graph to visualize change over time.

<p class='img'>
  <img src='/images/dashboards/sensor.png' alt='Screenshot of the sensor card'>
  Screenshot of the sensor card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`sensor`"
  type: string
entity:
  required: true
  description: Entity ID of `sensor` domain.
  type: string
icon:
  required: false
  description: The card icon.
  type: string
name:
  required: false
  description: Overwrites friendly name. Can be a string, or a name configuration object. See [naming documentation](/dashboards/naming/).
  type: [string, map, list]
graph:
  required: false
  description: Type of graph (`none` or `line`).
  type: string
unit:
  required: false
  description: The unit of measurement.
  type: string
detail:
  required: false
  description: Detail of the graph `1` or `2` (`1` = one point/hour, `2` = six points/hour).
  type: integer
  default: 1
hours_to_show:
  required: false
  description: Hours to show in graph. Minimum is 1 hour. Big values can result in delayed rendering, especially if the selected entities have a lot of state changes.
  type: integer
  default: 24
limits:
  required: false
  description: Limits of the graph Y-axis.
  type: map
  keys:
    min:
      description: Minimum value of the graph Y-axis.
      type: float
      required: false
      default: The minimum sample among the displayed values.
    max:
      description: Maximum value of the graph Y-axis.
      type: float
      required: false
      default: The maximum sample among the displayed values.
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

{% note %}
The `hours_to_show` option controls the time range of historical data shown in the graph. The amount of history available depends on the Recorder's `purge_keep_days` setting. By default, the Recorder purges data older than 10 days. See the [Recorder integration documentation](/integrations/recorder/#purge_keep_days) for more information.
{% endnote %}

### Examples

Basic sensor card:

```yaml
type: sensor
entity: sensor.illumination
name: Illumination
```

Sensor card with historical data graph:

```yaml
type: sensor
entity: sensor.my_temperature
graph: line
hours_to_show: 720 # shows 30 days of history only if history exists for this sensor
```
