---
type: view
title: Sidebar view
sidebar_label: Sidebar
description: "The sidebar view has 2 columns, a wide one and a smaller one on the right."
related:
  - docs: /dashboards/masonry/
    title: Masonry view
  - docs: /dashboards/panel/
    title: Panel view
---

The sidebar view has 2 columns, a wide one and a smaller one on the right.

<p class='img'>
<img src='/images/dashboards/sidebar_view.png' alt='Screenshot of the sidebar view'>
Screenshot of the sidebar view used for the energy dashboard.
</p>

This view doesn't have support for badges.

You can set if a card should be placed in the main (left) column of the sidebar column (right), by selecting the arrow right or left arrow in the bar underneath the card.

<p class='img'>
<img src='/images/dashboards/sidebar_view_move_card.png' alt='Screenshot showing how to move a card between sidebar and main view'>
Screenshot showing how to move a card between sidebar and main view.
</p>

On mobile, all cards are rendered in 1 column and kept in the order of the cards in the config.

## View config:

{% configuration %}
type:
  required: true
  description: "`sidebar`"
  type: string
{% endconfiguration %}

## Cards config:

{% configuration %}
view_layout.position:
  required: false
  description: "The position of the card, `main` or `sidebar`"
  type: string
{% endconfiguration %}

### Example

The position of the card is configured using YAML with the `view_layout` option:

```yaml
type: sidebar
cards:
  - type: entities
    entities: 
      - media_player.lounge_room
    view_layout:
      position: sidebar
```