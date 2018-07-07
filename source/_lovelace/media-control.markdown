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

The media controller card is used to display [Media Player](/components/#search/media-player) entities on an interface with easy to use controls. 

<p class='img'>
<img src='/images/lovelace/lovelace_mediaplayer.png' alt='Screenshot of the media player control card'>
Screenshot of the media player control card.
</p>

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
