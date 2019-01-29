---
layout: page
title: "Plant Status Card"
sidebar_label: Plant Status
description: "The Plant card gives you an easy way of viewing the status of your plants"
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

A card for all the lovely botanists out there.

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
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
- type: plant-status
  entity: plant.bonsai
```
