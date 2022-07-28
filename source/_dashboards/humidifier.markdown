---
type: card
title: "Humidifier Card"
sidebar_label: Humidifier
description: "The Humidifier card gives control of your humidifier entity, allowing you to change the target humidity and mode of the entity."
---

The Humidifier card lets you control and monitor humidifiers, dehumidifiers, and hygrostat devices.

<p class='img'>
  <img src='/images/dashboards/humidifier_card.png' alt='Screenshot of the humidifier card'>
  Screenshot of the humidifier card.
</p>

To add the Humidifier card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Humidifier** from the card picker. All options for this card can be configured via the user interface.

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
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

```yaml
- type: humidifier
  entity: humidifier.bedroom
  name: Bedroom Humidifier
```
