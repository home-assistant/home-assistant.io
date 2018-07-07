---
layout: page
title: "Media Control Card"
sidebar_label: Media Control
description: "The media controller card is used to display Media Player entities on an interface with easy to use controls. "
date: 2018-07-01 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

### Media controller

The media controller card is used to display [Media Player](https://www.home-assistant.io/components/#search/media-player) entities on an interface with easy to use controls. 

![media-control](https://user-images.githubusercontent.com/7738048/41775903-72a685aa-762e-11e8-9b9d-1e73cdb004cc.png)

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `media-control`
| entity | string | **Required** | Entity id of `media_player` domain

**Example**

```yaml
- type: media-control
  entity: media_player.lounge_room
```
