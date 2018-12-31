---
layout: page
title: "History Graph Card"
sidebar_label: History Graph
description: "History graph is a basic card, allowing you to display a graph for each of the entities in the list specified as config."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

History graph is a basic card, allowing you to display a graph for each of the entities in the list specified as config.

<p class='img'>
<img src='/images/lovelace/lovelace_history_graph.png' alt='Screenshot of the history graph card for entities without a unit_of_measurement'>
Screenshot of the history graph card, when no `unit_of_measurement` is defined.
</p>

<p class='img'>
<img src='/images/lovelace/lovelace_history_graph_lines.png' alt='Screenshot of the history graph card for entities with a unit_of_measurement'>
Screenshot of the history graph card, when a `unit_of_measurement` is defined.
</p>

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
  description: Hours to show.
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

## {% linkable_title Options For Entities %}

If you define entities as objects instead of strings, you can add more customization and configuration:

{% configuration %}
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
- type: history-graph
  title: 'My Graph'
  entities:
    - sensor.outside_temperature
    - entity: media_player.lounge_room
      name: Main player
```
