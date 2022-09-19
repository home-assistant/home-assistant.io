---
type: card
title: "Statistics Graph Card"
sidebar_label: Statistics Graph
description: "The Statistics Graph card allows you to display a graph with statistics data for each of the entities listed."
---

The Statistics Graph card allows you to display a graph of statistics data for each of the entities listed.

Statistics are gathered every hour for sensors that support it. It will either keep the `min`, `max` and `mean` of a sensors value for a specific hour, or the `sum` for a metered entity.

If your sensor doesn't work with statistics, check [this](/more-info/statistics/).

<p class='img'>
<img src='/images/dashboards/statistics_graph_line.png' alt='Screenshot of the statistics graph card for power entities'>
Screenshot of the Statistics Graph card with none metered entities and `chart_type` `line`.
</p>

<p class='img'>
<img src='/images/dashboards/statistics_graph_bar.png' alt='Screenshot of the statistics graph card for energy entities'>
Screenshot of the Statistics Graph card with a metered entity and `chart_type` `bar`.
</p>

To add the Statistics Graph card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Statistics Graph** from the card picker. All options for this card can be configured via the user interface.

{% configuration %}
type:
  required: true
  description: statistics-graph
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects, see below."
  type: list
days_to_show:
  required: false
  description: Days to show in graph. Minimum is 1 day.
  type: integer
  default: 30
chart_type:
  required: false
  description: If the graph should be rendered as a `bar` or a `line` chart.
  type: string
stat_types:
  required: false
  description: The statistics types to render. `min`, `max`, `mean`, `sum`, `state`
  type: list
title:
  required: false
  description: The card title.
  type: string
period:
  required: false
  description: The period of the rendered graph. `5minute`, `hour`, `day` or `month` 
  type: string  
{% endconfiguration %}

## Options For Entities

If you define entities as objects instead of strings, you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

```yaml
type: statistics-graph
title: 'My Graph'
entities:
  - sensor.outside_temperature
  - entity: sensor.inside_temperature
    name: Inside
```
