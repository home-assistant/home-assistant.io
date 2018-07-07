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

### Plant status
A card for all the lovely botanists out there.

<p class='img'>
<img src='/images/lovelace/lovelace_plant_card.png' alt='Screenshot of the plant status card'>
Screenshot of the plant status card.
</p>

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `plant-status`
| entity | string | **Required** | Entity id of `plant` domain

**Example**

```yaml
- type: plant-status
  entity: plant.bonsai
```
