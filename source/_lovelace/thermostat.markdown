---
title: "Thermostat Card"
sidebar_label: Thermostat
description: "The Thermostat card gives control of your climate entity. Allowing you to change the temperature and mode of the entity."
---

The Thermostat card gives control of your climate entity. Allowing you to change the temperature and mode of the entity.

<p class='img'>
  <img src='/images/lovelace/lovelace_thermostat_card.gif' alt='Screenshot of the thermostat card'>
  Screenshot of the thermostat card.
</p>

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

```yaml
type: thermostat
entity: climate.nest
```
