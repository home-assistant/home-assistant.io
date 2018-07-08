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
<img src='/images/lovelace/lovelace_history_graph.png' alt='Screenshot of the history graph card'>
Screenshot of the history graph card.
</p>

{% linkable_title Options %}

{% configuration %}
type:
  required: true
  description: history-graph
  type: string
entities:
  required: true
  description: List of entities to graph.
  type: list
hours_to_show:
  required: false
  description: Hours to show
  type: integer
  default: 24
refresh_interval:
  required: false
  description: Refresh interval in seconds
  type: integer
  default: 0
title:
  required: false
  description: Card title
  type: string
  default: none
{% endconfiguration %}

{% linkable_title Example %}

```yaml
- type: history-graph
  title: 'My Graph'
  entities:
    - sensor.outside_temperature
    - media_player.lounge_room
```
