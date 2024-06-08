---
type: card
title: "Humidifier card"
sidebar_label: Humidifier
description: "The humidifier card gives control of your humidifier entity, allowing you to change the target humidity and mode of the entity."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The humidifier card lets you control and monitor humidifiers, dehumidifiers, and hygrostat devices.

<p class='img'>
  <img src='/images/dashboards/humidifier_card.png' alt='Screenshot of the humidifier card'>
  Screenshot of the humidifier card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`humidifier`"
  type: string
entity:
  required: true
  description: Entity ID of `humidifier` domain.
  type: string
name:
  required: false
  description: Name of entity.
  type: string
  default: Entity name
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
show_current_as_primary:
  required: false
  description: Show current humidity as primary information instead of target humidity. The target humidity will be displayed as secondary information.
  type: boolean
  default: false
features:
  required: false
  description: Additional widgets to control your entity. See [available features](/dashboards/features). Only humidifier related features are supported.
  type: list
{% endconfiguration %}

### Example

```yaml
type: humidifier
entity: humidifier.bedroom
name: Bedroom Humidifier
```

