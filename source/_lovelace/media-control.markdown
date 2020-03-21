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

The media control card is used to display [Media Player](/components/#search/media-player) entities on an interface with easy to use controls.

<p class='img'>
<img src='/images/lovelace/lovelace_mediaplayer.png' alt='Screenshot of the media player control card'>
Screenshot of the media player control card.
</p>

{% configuration %}
type:
  required: true
  description: media-control
  type: string
entity:
  required: true
  description: "A media player `entity_id`."
  type: string
show_controls_power:
  required: false
  description: "Show power controls?"
  type: boolean
  default: true
show_controls_playback:
  required: false
  description: "Show playback controls?"
  type: boolean
  default: false
show_controls_volume:
  required: false
  description: "Show volume controls?"
  type: boolean
  default: false
{% endconfiguration %}

## {% linkable_title Example %}

```yaml
type: media-control
entity: media_player.lounge_room
```
