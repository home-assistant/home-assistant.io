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

![plant-status](https://user-images.githubusercontent.com/7738048/41775904-72f95ae6-762e-11e8-9c0c-c22aa76cb082.png)


| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `plant-status`
| entity | string | **Required** | Entity id of `plant` domain

**Example**

```yaml
- type: plant-status
  entity: plant.bonsai
```
