---
type: card
title: "Logbook card"
sidebar_label: Logbook
description: "The logbook card displays entries from the logbook for specific entities."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The logbook card displays entries from the logbook for specific entities.

<p class='img'>
  <img src='/images/dashboards/logbook.png' alt='Screenshot of the logbook card'>
  Screenshot of the logbook card.
</p>

{% include dashboard/edit_dashboard.md %}

## Card settings

{% configuration_basic %}
Entities:
  description: The entities whose logbook entries will show in the card.
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
entities:
  required: true
  description: The entities that will show in the card.
  type: list
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
entities:
  - fan.ceiling_fan
  - fan.living_room_fan
  - light.ceiling_lights
hours_to_show: 24
```
