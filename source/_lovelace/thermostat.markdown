---
title: "Thermostat Card"
sidebar_label: Thermostat
description: "The Thermostat card gives control of your climate entity, allowing you to change the temperature and mode of the entity."
---

The Thermostat card gives control of your [climate](/integrations/#climate) entity, allowing you to change the temperature and mode of the entity.

<p class='img'>
  <img src='/images/lovelace/lovelace_thermostat_card.gif' alt='Screenshot of the thermostat card'>
  Screenshot of the Thermostat card.
</p>

To add the Thermostat card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the plus button in the bottom right corner and select **Thermostat** from the card picker. All options for this card can be configured via the user interface.

{% configuration %}
type:
  required: true
  description: thermostat
  type: string
entity:
  required: true
  description: Entity id of `climate` domain
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of Entity.
theme:
  required: false
  description: Set to any theme within `themes.yaml`
  type: string
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

```yaml
type: thermostat
entity: climate.nest
```
