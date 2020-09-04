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

```yaml
type: light
entity: light.bedroom
```

{% configuration %}
type:
  required: true
  description: light
  type: string
entity:
  required: true
  description: Home Assistant Light Domain entity ID.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of Entity
icon:
  required: false
  description: Overwrites icon.
  type: string
  default: Entity Domain Icon
theme:
  required: false
  description: Set to any theme within `themes.yaml`.
  type: string
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
