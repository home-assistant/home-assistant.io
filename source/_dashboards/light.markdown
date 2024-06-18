---
type: card
title: "Light card"
sidebar_label: Light
description: "The light card allows you to change the brightness of the light."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The light card allows you to change the brightness of the light.

<p class='img'>
<img src='/images/dashboards/light_card.png' alt='Screenshot of the Light card'>
Screenshot of the light card.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`light`"
  type: string
entity:
  required: true
  description: Entity ID of `light` domain.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of entity
icon:
  required: false
  description: Overwrites icon.
  type: string
  default: Entity domain icon
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/dashboards/actions/#double-tap-action).
  type: map
{% endconfiguration %}

### Examples

Basic example:

```yaml
type: light
entity: light.bedroom
```

Overwriting names example:

```yaml
type: light
entity: light.bedroom
name: Kids Bedroom
```

```yaml
type: light
entity: light.office
name: My Office
```

<p class='img'>
<img src='/images/dashboards/light_complex_card.png' alt='Screenshot of the Light card'>
Screenshot of the Light card names.
</p>
