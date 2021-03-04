---
title: "Media Control Card"
sidebar_label: Media Control
description: "The Media Control card is used to display media player entities on an interface with easy to use controls."
---

The Media Control card is used to display [Media Player](/integrations/#media-player) entities on an interface with easy to use controls.

<p class='img'>
<img src='/images/lovelace/lovelace_mediaplayer.png' alt='Screenshot of the media player control card'>
Screenshot of the Media Control card.
</p>

To add the Media Control card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the plus button in the bottom right corner and select **Media Control** from the card picker.

{% configuration %}
type:
  required: true
  description: media-control
  type: string
entity:
  required: true
  description: "A media player `entity_id`."
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of Entity
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

```yaml
type: media-control
entity: media_player.lounge_room
```
