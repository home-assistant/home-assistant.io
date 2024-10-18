---
type: card
title: "Plant status card"
sidebar_label: Plant status
description: "The plant status card is for all the lovely botanists out there."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The plant status card is for all the lovely botanists out there.

<p class='img'>
<img src='/images/dashboards/plant_card.png' alt='Screenshot of the plant status card'>
Screenshot of the plant status card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`plant-status`"
  type: string
entity:
  required: true
  description: Entity ID of `plant` domain.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Entity name
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

### Example

Basic example:

```yaml
type: plant-status
entity: plant.bonsai
```
