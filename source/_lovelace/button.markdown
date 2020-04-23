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
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of Entity
icon:
  required: false
  description: Icon that will be be used to overwrite the entity picture or entity icon.
  type: string
  default: Entity Domain Icon
show_name:
  required: false
  description: Show name.
  type: boolean
  default: "true"
show_icon:
  required: false
  description: Show icon.
  type: boolean
  default: "true"
icon_height:
  required: false
  description: Set the height for the icon. This is in pixels which is handled by the configuration UI. (Advanced users can use other CSS values if they like)
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
  description: "Set to any theme within `themes.yaml`"
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
