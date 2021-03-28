---
title: "History Graph Card"
sidebar_label: History Graph
description: "The History Graph card allows you to display a graph for each of the entities listed."
---

The History Graph card allows you to display a graph for each of the entities listed.

<p class='img'>
<img src='/images/lovelace/lovelace_history_graph.png' alt='Screenshot of the history graph card for entities without a unit_of_measurement'>
Screenshot of the History Graph card, when the sensor has no `unit_of_measurement` defined.
</p>

<p class='img'>
<img src='/images/lovelace/lovelace_history_graph_lines.png' alt='Screenshot of the history graph card for entities with a unit_of_measurement'>
Screenshot of the History Graph card, when the sensor has a `unit_of_measurement` defined.
</p>

To add the History Graph card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **History Graph** from the card picker. All options for this card can be configured via the user interface.

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
  description: Hours to show. Minimum is 1 hour, maximum of 80 hours.
  type: integer
  default: 24
refresh_interval:
  required: false
  description: Refresh interval in seconds.
  type: integer
  default: 0
title:
  required: false
  description: The card title.
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
type: history-graph
title: 'My Graph'
entities:
  - sensor.outside_temperature
  - entity: media_player.lounge_room
    name: Main player
```
