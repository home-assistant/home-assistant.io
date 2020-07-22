---
title: "Button Card"
sidebar_label: Button
description: "The Button card allows you to add buttons to perform tasks."
---

The Button card allows you to add buttons to perform tasks.

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_card.png' alt='Screenshot of the button cards'>
Screenshot of three Button Cards.
</p>

## Card Settings

{% configuration_basic %}
Entity:
  description: The entity the card interacts with, for example `light.living_room`.
Name:
  description: The button name. The default is the name of the entity, if an entity is selected.
Icon:
  description: The icon shown on the card. The default is the entity domain icon, if an entity is selected.
Show Name?:
  description: A toggle to show or hide the button name.
Show Icon?:
  description: A toggle to show or hide the icon.
Icon Height:
  description: The height of the icon, in pixels.
Theme:
  description: The card theme, which may be set to any installed theme.
Tap Action:
  description: The action taken on card tap. For more information, see the [action documentation](/lovelace/actions/#tap-action).
Hold Action:
  description: The action taken on card tap and hold. For more information, see the [action documentation](/lovelace/actions/#hold-action).
{% endconfiguration_basic %}

## Code Editor or YAML mode

```yaml
type: button
entity: light.living_room
```

{% configuration %}
type:
  required: true
  description: button
  type: string
entity:
  required: false
  description: The entity the card interacts with, for example `light.living_room`.
  type: string
name:
  required: false
  description: The button name.
  type: string
  default: Entity name
icon:
  required: false
  description: The icon shown on the card.
  type: string
  default: Entity Domain Icon
show_name:
  required: false
  description: If true, the button name is shown on the card.
  type: boolean
  default: "true"
show_icon:
  required: false
  description: If true, the icon is shown on the card.
  type: boolean
  default: "true"
icon_height:
  required: false
  description: The height of the icon. Any CSS value may be used.
  type: string
  default: auto
state_color:
  required: false
  description: If true, the icon changes color when the entity is active.
  type: boolean
  default: true
tap_action:
  required: false
  description: The action taken on card tap. For more information, see the [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: The action taken on card tap and hold. For more information, see the [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: The action taken on card double tap. For more information, see the [action documentation](/lovelace/actions/#double-tap-action).
  type: map
theme:
  required: false
  description: The card theme, which may be set to any theme from the `themes.yaml` file.
  type: string
{% endconfiguration %}

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: The id of the user that can see the view tab.
  type: string
{% endconfiguration %}

## Examples

Button Card with a button name and a script that runs when card is tapped:

```yaml
type: button
name: Turn Off Lights
tap_action:
  action: call-service
  service: script.turn_on
  service_data:
    entity_id: script.turn_off_lights
```

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_complex_card.png' alt='Screenshot of the button card'>
Screenshot of the Button card with Script Service.
</p>
