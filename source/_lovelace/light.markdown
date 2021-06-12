---
title: "Light Card"
sidebar_label: Light
description: "The Light card allows you to change the brightness of the light."
---

The Light card allows you to change the brightness of the light.

<p class='img'>
<img src='/images/lovelace/lovelace_light_card.png' alt='Screenshot of the Light card'>
Screenshot of the Light card.
</p>

To add the Light card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Light** from the card picker. All options for this card can be configured via the user interface.

Alternatively, the card can be configured using YAML:

```yaml
type: light
entity: light.bedroom
```

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
  description: Action taken on card tap and hold. See [action documentation](/lovelace/actions/#hold-action).
  type: map
double_tap_action:
  required: false
  description: Action taken on card double tap. See [action documentation](/lovelace/actions/#double-tap-action).
  type: map
{% endconfiguration %}

## Examples

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
<img src='/images/lovelace/lovelace_light_complex_card.png' alt='Screenshot of the Light card'>
Screenshot of the Light card names.
</p>
