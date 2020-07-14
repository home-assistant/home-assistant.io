---
title: "Humidifier Card"
sidebar_label: Humidifier
description: "The Humidifier card lets you control and monitor humidifiers, dehumidifiers, and hygrostat devices."
---

The Humidifier card lets you control and monitor humidifiers, dehumidifiers, and hygrostat devices.

{% configuration %}
type:
  required: true
  description: entity
  type: string
entity:
  required: true
  description: Home Assistant entity ID.
  type: string
name:
  required: false
  description: Name of Entity
  type: string
  default: Entity Name
theme:
  required: false
  description: Set to any theme within `themes.yaml`
  type: string
{% endconfiguration %}

## Example

```yaml
- type: humidifier
  entity: humidifier.bedroom
  name: Bedroom Humidifier
```