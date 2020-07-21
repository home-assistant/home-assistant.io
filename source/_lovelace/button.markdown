---
title: "Button Card"
sidebar_label: Button
description: "The Button card allows you to add buttons to perform tasks."
---

The Button card allows you to add buttons to perform tasks.

<p class='img'>
<img src='/images/lovelace/lovelace_entity_button_card.png' alt='Screenshot of the button card'>
Screenshot of the Button card.
</p>

## Visual Editor

<p class='img'>
<img src='https://i.imgur.com/HJybKBf.jpg' alt='Screenshot of the button card Visual Editor'>Screenshot of the Button card Visual Editor</p>

### Configuration

{% configuration_basic %}
Entity:
  description: Choose a Home Assistant entity from the dropdown menu
Name:
  description: Enter a name for the button. The default is the entity name.
Icon:
  description: Choose an icon to overwrite the default entity picture or entity icon.
Show Name:
  description: Toggle to show or hide the button name.
Show Icon:
  description: Toggle to show or hide the button icon.
Theme:
  description: Choose a card theme from the dropdown menu.
Tap Action:
  description: Choose an action from the dropdown menu. This action is taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
Hold Action:
  description: Choose an action from the dropdown menu. This action is taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
{% endconfiguration_basic %}

## Code Editor

{% configuration %}
type:
  required: true
  description: button
  type: string
entity:
  required: false
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Overwrites the default entity name.
  type: string
  default: Name of Entity
icon:
  required: false
  description: Overwrites default entity picture or entity icon.
  type: string
  default: Entity Domain Icon
show_name:
  required: false
  description: Shows/hides name.
  type: boolean
  default: "true"
show_icon:
  required: false
  description: Shows/hides icon.
  type: boolean
  default: "true"
icon_height:
  required: false
  description: Sets the height for the icon. This is in pixels which is handled by the configuration UI. Other CSS values can also be used.
  type: string
  default: auto
state_color:
  required: false
  description: Set to `true` to have icons colored when entity is active
  type: boolean
  default: true
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/lovelace/actions/#tap-action).
  type: map
hold_action:
  required: false
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
theme:
  required: false
  description: Set to any theme within `themes.yaml`
  type: string
{% endconfiguration %}

## Options For Exemptions

{% configuration badges %}
user:
  required: true
  description: User id that can see the view tab.
  type: string
{% endconfiguration %}

## Examples

Title and Script Service Example:

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
Screenshot of the Button card with Title and Script Service.
</p>
