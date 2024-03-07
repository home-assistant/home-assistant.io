---
type: card
title: "Statistics graph card"
sidebar_label: Statistics graph
description: "The statistics graph card allows you to display a graph with statistics data for each of the entities listed."
---

The statistics graph card allows you to display a graph of statistics data for each of the entities listed.

<p class='img'>
<img src='/images/dashboards/statistics_graph_line.png' alt='Screenshot of the statistics graph card for power entities'>
Screenshot of the statistics graph card with none metered entities and `chart_type` `line`.
</p>

<p class='img'>
<img src='/images/dashboards/statistics_graph_bar.png' alt='Screenshot of the statistics graph card for energy entities'>
Screenshot of the statistics graph card with a metered entity and `chart_type` `bar`.
</p>

Statistics are gathered every 5 minutes and also hourly for sensors that support it. The 5-minute statistics will be retained for the duration set in the [recorder configuration](/integrations/recorder/#purge_keep_days), and hourly statistics will be retained indefinitely. It will either keep the <abbr title="Minimum">`min`</abbr>, <abbr title="Maximum">`max`</abbr>, and <abbr title="Average">`mean`</abbr> of a sensor's value for a specific hour or the <abbr title="Total">`sum`</abbr> for a metered entity.

If your sensor doesn't work with statistics, check [this](/more-info/statistics/).

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: statistics-graph
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects (see below), or an external statistic id"
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
  description: The statistics types to render. `min`, `max`, `mean`, `sum`, `state`, `change`
  type: list
title:
  required: false
  description: The card title.
  type: string
period:
  required: false
  description: The period of the rendered graph. `5minute`, `hour`, `day`, `week` or `month` 
  type: string  
hide_legend:
  required: false
  description:  If true, the legend will be hidden.
  type: boolean  
  default: false
logarithmic_scale:
  required: false
  description: If true, numerical values on the Y-axis will be displayed with a logarithmic scale.
  type: boolean
  default: false
{% endconfiguration %}

### Options for entities

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

### Example

```yaml
type: statistics-graph
title: 'My Graph'
entities:
  - sensor.outside_temperature
  - entity: sensor.inside_temperature
    name: Inside
```
