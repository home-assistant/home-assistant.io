---
type: card
title: "Button card"
sidebar_label: Button
description: "The Button card allows you to add buttons to perform tasks."
related:
  - docs: /dashboards/actions/
    title: Card actions
  - docs: /docs/scripts/
    title: Scripts
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The button card allows you to add buttons to perform tasks.

<p class='img'>
<img src='/images/dashboards/entity_button_card.png' alt='Screenshot of three button cards'>
Screenshot of three button cards.
</p>

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## Card settings

{% configuration_basic %}
Entity:
  description: The entity ID the card interacts with, for example, `light.living_room`.
Name:
  description: The button name that is displayed on the card. If this field is left blank and the card interacts with an entity, the button name defaults to the entity name. Otherwise, no name is displayed.
Icon:
  description: The icon that is displayed on the card. If this field is left blank and the card interacts with an entity, the icon defaults to the entity domain icon. Otherwise, no icon is displayed.
Show Name:
  description: A toggle to show or hide the button name.
Show Icon:
  description: A toggle to show or hide the icon.
Icon Height:
  description: The height of the icon, in pixels.
Theme:
  description: Name of any loaded theme to be used for this card. For more information about themes, see the [frontend documentation](/integrations/frontend/).
Tap Action:
  description: The action taken on card tap. For more information, see the [action documentation](/dashboards/actions/#tap-action).
Hold Action:
  description: The action taken on card tap and hold. For more information, see the [action documentation](/dashboards/actions/#hold-action).
{% endconfiguration_basic %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`button`"
  type: string
entity:
  required: false
  description: The entity ID the card interacts with, for example, `light.living_room`.
  type: string
name:
  required: false
  description: The button name that is displayed on the card. It defaults to the entity name only if the card interacts with an entity. Otherwise, if not configured, no name is displayed.
  type: string
  default: Entity name
icon:
  required: false
  description: The icon that is displayed on the card. It defaults to the entity domain icon only if the card interacts with an entity. Otherwise, if not configured, no icon is displayed.
  type: string
  default: Entity domain icon
show_name:
  required: false
  description: If false, the button name is not shown on the card.
  type: boolean
  default: "true"
show_icon:
  required: false
  description: If false, the icon is not shown on the card.
  type: boolean
  default: "true"
show_state:
  required: false
  description: Show state.
  type: boolean
  default: "false"
icon_height:
  required: false
  description: The height of the icon. Any CSS value may be used.
  type: string
  default: auto
state_color:
  required: false
  description: If false, the icon does not change color when the entity is active.
  type: boolean
  default: true
tap_action:
  required: false
  description: The action taken on card tap. For more information, see the [action documentation](/dashboards/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: The action taken on card tap and hold. For more information, see the [action documentation](/dashboards/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: The action taken on card double-tap. For more information, see the [action documentation](/dashboards/actions/#double-tap-action).
  type: map
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
action_name:
  required: false
  description: Override the default action name for a button row.
  type: string
  default: Run
{% endconfiguration %}

### Examples

Basic example:

```yaml
type: button
entity: light.living_room
```

Button card with a button name and a script that runs when card is tapped:

```yaml
type: button
name: Turn Off Lights
show_state: false
tap_action:
  action: call-service
  service: script.turn_on
  data:
    entity_id: script.turn_off_lights
```

<p class='img'>
<img src='/images/dashboards/entity_button_complex_card.png' alt='Screenshot of the Button card with script service'>
Screenshot of the button card with script service.
</p>
