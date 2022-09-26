---
type: card
title: "Media Control Card"
sidebar_label: Media Control
description: "The Media Control card is used to display media player entities on an interface with easy to use controls."
---

The Media Control card is used to display [Media Player](/integrations/#media-player) entities on an interface with easy to use controls.

<p class='img'>
<img src='/images/dashboards/mediaplayer.png' alt='Screenshot of the media player control card'>
Screenshot of the Media Control card.
</p>

To add the Media Control card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Media Control** from the card picker.

{% configuration %}
type:
  required: true
  description: "`media-control`"
  type: string
entity:
  required: true
  description: Entity ID of `media_player` domain.
  type: string
name:
  required: false
  description: Overwrites friendly name.
  type: string
  default: Name of entity
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

## Example

Alternatively, the card can be configured using YAML:

```yaml
type: media-control
entity: media_player.lounge_room
```
