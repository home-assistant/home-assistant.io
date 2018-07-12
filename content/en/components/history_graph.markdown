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

### {% linkable_title Configuration variables %}

| Attribute                 | Optional | Default | Description                                 |
|---------------------------|----------|-------------------------------------------------------|
| `entities`                |   no     |         | List of entities whose history to show as a graph.  |
| `name`                    |   yes    |  ID     | Name to display. |
| `hours_to_show`           |   yes    |  24     | Number of hours to show. |
| `refresh`                 |   yes    |   0     | Number of seconds between graph refreshes. 0 for no refreshes. |

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


