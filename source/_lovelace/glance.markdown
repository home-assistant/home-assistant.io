---
layout: page
title: "Glance Card"
sidebar_label: Glance
description: "The Glance card allows you to see a list of entities at a glance."
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

A card that allows you to see see a list of entities at a glance.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `glance`
| entities | list | **Required** | Entity id's
| title | string | Optional | Card title

Each entry in the list of entities is either an entity ID or an entity option object. The entity option object can have the following options:

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity | entity id | **Required** | The ID of the entity to show.
| title | string | Optional | The title to use instead of the entity name.
