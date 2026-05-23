---
type: card
title: "Distribution card"
sidebar_label: Distribution
description: "The distribution card displays the values of multiple entities as a segmented bar."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
  - docs: /dashboards/naming/
    title: Card naming
---

The distribution card displays the values of multiple entities as a segmented bar. Each entity is shown as a colored segment and listed in a legend below the bar.

Use this card to compare the current values of related entities, for example power sensors from different sources or loads.

<p class='img'>
<img src='/images/blog/2026-02/distribution-card.png' alt='Screenshot of the distribution card'>
Screenshot of the distribution card.
</p>

Selecting a segment in the bar opens the more-info dialog for that entity. You can also click legend items to hide or show individual segments.

{% include dashboard/edit_dashboard.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: distribution
  type: string
entities:
  required: true
  description: "A list of entity IDs or `entity` objects, see below."
  type: list
title:
  required: false
  description: The card title.
  type: string
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
  description: Overwrites friendly name. Can be a string, or a name configuration object. See [naming documentation](/dashboards/naming/).
  type: [string, map, list]
color:
  required: false
  description: Overrides the color of the entity segment and legend marker.
  type: string
{% endconfiguration %}

### Examples

Basic example:

```yaml
type: distribution
entities:
  - sensor.grid_power
  - sensor.solar_power
  - sensor.home_battery_power
```

With custom names and colors:

```yaml
type: distribution
title: Power distribution
entities:
  - entity: sensor.grid_power
    name: Grid
    color: blue
  - entity: sensor.solar_power
    name: Solar
    color: "#ff9800"
  - entity: sensor.home_battery_power
    name: Battery
    color: "#4caf50"
```
