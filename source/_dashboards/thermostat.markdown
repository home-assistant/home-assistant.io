---
type: card
title: "Thermostat Card"
sidebar_label: Thermostat
description: "The Thermostat card gives control of your climate entity, allowing you to change the temperature and mode of the entity."
---

The Thermostat card gives control of your [climate](/integrations/#climate) entity, allowing you to change the temperature and mode of the entity.

<p class='img'>
  <img src='/images/dashboards/thermostat_card.gif' alt='Screenshot of the thermostat card'>
  Screenshot of the Thermostat card.
</p>

To add the Thermostat card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Thermostat** from the card picker. All options for this card can be configured via the user interface.

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
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

```yaml
type: thermostat
entity: climate.nest
```
