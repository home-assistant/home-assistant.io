---
title: History Graph
description: Instructions for setting up History Graph.
ha_category:
  - History
logo: home-assistant.png
ha_release: 0.55
ha_quality_scale: internal
ha_codeowners:
  - '@andrey-git'
---

<div class='note'>
  This integration is deprecated and pending removal in Home Assistant 0.107.0,
  as it was only used by the old states UI (not our current Lovelace UI).
</div>

<p class='img'>
  <img src='{{site_root}}/images/screenshots/history_graph.png' />
</p>

The `history_graph` integration will make the UI display a graph similar to the graphs in `more-info` popups and the [history](/integrations/history/) panel. If you want to add history graphs to the Lovelace UI, please check the [History Graph Card](/lovelace/history-graph/) configuration as it slightly differs from the component.

To use this integration in your installation, add the following to your `configuration.yaml` file:

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

### Full Example

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

For sensors to automatically be combined into one graph they need to have exactly the same unit of measurement. This is important if you have, e.g., a unit-less temperature `state_topic` MQTT sensor and you want to combine this with a weather sensor. `unit_of_measurement:` of the MQTT sensor then needs to be set to `°C`.
