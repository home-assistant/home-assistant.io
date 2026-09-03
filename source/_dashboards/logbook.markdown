---
type: card
title: "Activity card"
sidebar_label: Activity
description: "The activity card displays the activity of specific entities, devices, areas, and/or labels."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The activity card displays entries from the activity for specific entities, devices, areas, and/or labels.

<p class='img'>
  <img src='/images/dashboards/activity-card.png' alt='Screenshot of the activity card'>
  Screenshot of the activity card.
</p>

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration_basic %}
Target:
  description: The entities, devices, areas and labels whose activity entries will show in the card. See [target selector](/docs/blueprint/selectors/#target-selector) for more information.
Title:
  description: The title that shows on the top of the card.
Hours to show:
  description: The number of hours in the past that will be tracked in the card.
Theme:
  description: Name of any loaded theme to be used for this card. For more information about themes, see the [frontend documentation](/integrations/frontend/).
State filter:
  description: Limit the displayed logbook entries to only the specified states.
Name detail:
  description: How much naming context each entry shows. Choose **Automatic** to let the card pick the right level based on its target, or set a fixed level with **None**, **Entity**, **Device ▸ Entity**, or **Area ▸ Device ▸ Entity**.
{% endconfiguration_basic %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI. Activity used to be called "logbook" in the past, and is still called logbook in YAML.

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
state_filter:
  required: false
  description: Limit the displayed logbook entries to only the selected states. For example a list of `['on']` will display entries when targeted entities turn on, but not when they turn off.
  type: list
name_detail:
  required: false
  description: "How much naming context each entry shows. With `auto`, the card derives the level from its target: a single entity shows no name, entities on one device show the entity name, entities in one area show `device ▸ entity`, and a mix across areas shows `area ▸ device ▸ entity`. Set a fixed level with `none`, `entity`, `device`, or `area`."
  type: string
  default: auto
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
