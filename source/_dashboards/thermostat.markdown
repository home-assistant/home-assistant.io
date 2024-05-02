---
type: card
title: "Thermostat card"
sidebar_label: Thermostat
description: "The thermostat card gives control of your climate entity, allowing you to change the temperature and mode of the entity."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The thermostat card gives control of your [climate](/integrations/#climate) {% term entity %}, allowing you to change the temperature and mode of the {% term entity %}.

<p class='img'>
  <img src='/images/dashboards/thermostat_card.png' alt='Screenshot of the thermostat card'>
  Screenshot of the thermostat card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`thermostat`"
  type: string
entity:
  required: true
  description: Entity ID of `climate` domain.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of entity.
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
show_current_as_primary:
  required: false
  description: Show current temperature as primary information instead of target temperature. The target temperature will be displayed as secondary information.
  type: boolean
  default: false
features:
  required: false
  description: Additional widgets to control your entity. See [available features](/dashboards/features). Only climate related features are supported.
  type: list
{% endconfiguration %}

### Example

```yaml
type: thermostat
entity: climate.nest
```
