---
title: "Plant Status Card"
sidebar_label: Plant Status
description: "The Plant Status card is for all the lovely botanists out there."
---

The Plant Status card is for all the lovely botanists out there.

<p class='img'>
<img src='/images/lovelace/lovelace_plant_card.png' alt='Screenshot of the plant status card'>
Screenshot of the plant status card.
</p>

{% configuration %}
type:
  required: true
  description: plant-status
  type: string
entity:
  required: true
  description: "Entity id of `plant` domain"
  type: string
name:
  required: false
  description: Overwrites Friendly Name
  type: string
  default: Entity Name
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
{% endconfiguration %}

## Example

```yaml
type: plant-status
entity: plant.bonsai
```
