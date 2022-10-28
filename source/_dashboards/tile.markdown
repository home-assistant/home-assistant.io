---
type: card
title: "Tile Card"
sidebar_label: Tile
description: "The tile card gives you a quick overview of your entity. The card allow you to toggle the entity, show the more info dialog or custom actions."
---

The tile card gives you a quick overview of your entity. The card allow you to toggle the entity and show the more info dialog. A badge is shown for some entity like `climate` entity and `person` entity.

<p class='img'>
  <img src='/images/dashboards/tile_card.png' alt='Screenshot of the tile card'>
  Screenshot of the Tile card.
</p>

To add the Tile card to your user interface, click the menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the "Add Card" button in the bottom right corner and select **Tile** from the card picker.

{% configuration %}
type:
  required: true
  description: "`tile`"
  type: string
entity:
  required: true
  description: Entity ID.
  type: string
name:
  required: false
  description: Overwrites the name of entity.
  type: string
icon:
  required: false
  description: Overwrites the icon of entity.
  type: string
color:
  required: false
  description: Set the color when entity is active. By default the color is based on `state`, `domain` and `device_class` of your entity. It accept [color token](/dashboards/tile/#available-color-tokens) or hex color code.
  type: string
  default: state
show_entity_picture:
  required: false
  description: If your entity has a picture, it will replace the icon.
  type: boolean
  default: false
tap_action:
  required: false
  description: Action taken on card tap. See [action documentation](/dashboards/actions/#tap-action). By default it will show the `more-info` dialog.
  type: map
icon_tap_action:
  required: false
  description: Action taken on icon card tap. See [action documentation](/dashboards/actions/#tap-action). By default it will `toggle` the entity the entity is possible or show the `more-info` dialog.
  type: map
{% endconfiguration %}


## Example

Alternatively, the card can be configured using YAML:

```yaml
- type: tile
  entity: cover.kitchen_window
- type: tile
  entity: light.bedroom
  icon: mdi:lamp
  color: yellow
- type: tile
  entity: person.anne_therese
  show_entity_picture: true
```

## Available color tokens

Some color tokens are available to colorize the tile card : `primary`, `accent`, `disabled`, `red`, `pink`, `purple`, `deep-purple`, `indigo`, `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `yellow`, `amber`, `orange`, `deep-orange`, `brown`, `grey`, `blue-grey`, `black` and `white`.
