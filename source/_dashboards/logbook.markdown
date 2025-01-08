---
type: card
title: "Logbook card"
sidebar_label: Logbook
description: "The logbook card displays entries from the logbook for specific entities, devices, areas, and/or labels."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The logbook card displays entries from the logbook for specific entities, devices, areas, and/or labels.

<p class='img'>
  <img src='/images/dashboards/logbook.png' alt='Screenshot of the logbook card'>
  Screenshot of the logbook card.
</p>

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration_basic %}
Target:
  description: The entities, devices, areas and labels whose logbook entries will show in the card. See [target selector](/docs/blueprint/selectors/#target-selector) for more information.
Title:
  description: The title that shows on the top of the card.
Hours to show:
  description: The number of hours in the past that will be tracked in the card.
Theme:
  description: Name of any loaded theme to be used for this card. For more information about themes, see the [frontend documentation](/integrations/frontend/).
{% endconfiguration_basic %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`logbook`"
  type: string
target:
  required: true
  description: The target to use for the card.
  type: map
title:
  required: false
  description: Title of the card.
  type: string
hours_to_show:
  required: false
  description: Number of hours in the past to track. Minimum is 1 hour. Big values can result in delayed rendering, especially if the selected entities have a lot of state changes. 
  type: integer
  default: 24
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

### Examples

```yaml
type: logbook
target: 
  entity_id:
    - fan.ceiling_fan
    - fan.living_room_fan
    - light.ceiling_lights
hours_to_show: 24
```

```yaml
type: logbook
target:
  area_id: living_room
  device_id:
    - ff22a1889a6149c5ab6327a8236ae704
    - 52c050ca1a744e238ad94d170651f96b
  entity_id:
    - light.hallway
    - light.landing
  label_id:
    - lights
```
