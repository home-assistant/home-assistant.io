---
type: card
title: "Media control card"
sidebar_label: Media control
description: "The media control card is used to display media player entities on an interface with easy to use controls."
related:
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
---

The media control card is used to display [media player](/integrations/#media-player) entities on an interface with easy to use controls.

<p class='img'>
<img src='/images/dashboards/mediaplayer.png' alt='Screenshot of the media player control card'>
Screenshot of the media control card.
</p>

{% include dashboard/edit_dashboard.md %}

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

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

### Example

Basic example:

```yaml
type: media-control
entity: media_player.lounge_room
```
