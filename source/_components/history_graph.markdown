---
layout: page
title: "History Graph"
description: "Instructions for setting up History Graph."
date: 2017-09-20 15:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: History
logo: home-assistant.png
ha_release: "0.55"
ha_qa_scale: internal
---

<p class='img'>
  <img src='{{site_root}}/images/screenshots/history_graph.png' />
</p>

The `history_graph` component will make the UI display a graph similar to the graphs in `more-info` popups and the [history](/components/history/) panel.

To use this component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Minimal configuration.yaml entry
history_graph:
  gr1:
    entities:
      - light.ceiling.lights
  
```

{% configuration %}
entities:
  description: List of entities whose history to show as a graph.
  required: true
  type: string
name:
  description: Name to display.
  required: false
  default: ID
  type: string
hours_to_show: 
  description: Number of hours to show in the graph.
  required: false
  default: 24
  type: integer
refresh:
  description: Number of seconds between graph refreshes. 0 to disable refreshing.
  required: false
  default: 0
  type: integer
{% endconfiguration %}

### {% linkable_title Full Example %}

```yaml
# Full configuration.yaml entry
history_graph:
  gr1:
    name: Lights Graph
    entities:
      - light.ceiling.lights
      - light.bed_light
    hours_to_show: 240
    refresh: 60
  gr2:
    name: Temperature
    entities:
      - sensor.outside_temperature
      - sensor.inside_temperature
    hours_to_show: 120
    # refresh: 0

```


