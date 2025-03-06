---
type: card
title: "History graph card"
sidebar_label: History graph
description: "The history graph card allows you to display a graph for each of the entities listed."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The history graph card allows you to display a graph for each of up to eight entities.

<p class='img'>
<img src='/images/dashboards/history_graph.png' alt='Screenshot of the history graph card for entities without a unit_of_measurement'>
Screenshot of the history graph card, when the sensor has no `unit_of_measurement` defined.
</p>

<p class='img'>
<img src='/images/dashboards/history_graph_lines.png' alt='Screenshot of the history graph card for entities with a unit_of_measurement'>
Screenshot of the history graph card, when the sensor has a `unit_of_measurement` defined.
</p>

{% include dashboard/edit_dashboard.md %}

Only the y-axis and logarithmic scale settings can be configured via the user interface. To configure the other options for this card, you need to edit the YAML configuration.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: history-graph
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects, see below."
  type: list
hours_to_show:
  required: false
  description: Hours to show in graph. Minimum is 1 hour. Big values can result in delayed rendering, especially if the selected entities have a lot of state changes.
  type: integer
  default: 24
title:
  required: false
  description: The card title.
  type: string
show_names:
  required: false
  description: If false, no entity names are shown in the card.
  type: boolean
  default: true
logarithmic_scale:
  required: false
  description: If true, numerical values on the Y-axis will be displayed with a logarithmic scale.
  type: boolean
  default: false
min_y_axis:
  required: false
  description: Lower bound for the Y-axis range.
  type: float
max_y_axis:
  required: false
  description: Upper bound for the Y-axis range.
  type: float
fit_y_data:
  required: false
  description: If true, configured Y-axis bounds would automatically extend (but not shrink) to fit the data.
  type: boolean
  default: false
expand_legend:
  required: false
  description: If true, the legend will show all items initially
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

### Examples

```yaml
type: history-graph
title: 'My Graph'
entities:
  - sensor.outside_temperature
  - entity: media_player.lounge_room
    name: Main player
```

Or with longer time frame, and multiple entities (as long as they share the same unit_of_measurement) in one graph:

```yaml
type: history-graph
title: "Temperatures in the last 48 hours"
hours_to_show: 48
entities:
  - sensor.outside_temperature
  - entity: sensor.lounge_temperature
    name: "Lounge"
  - entity: sensor.attic_temperature
    name: "Attic"
```
