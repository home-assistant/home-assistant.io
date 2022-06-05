---
type: view
title: Sidebar View
sidebar_label: Sidebar
description: "The sidebar view has 2 columns, a wide one and a smaller one on the right."
---

The sidebar view has 2 columns, a wide one and a smaller one on the right.

This view doesn't have support for badges.

To change a view to edit mode, or to change the location of a card, enable edit mode:
Click the menu (three dots at the top right of the screen) and then **Edit Dashboard**.

You can set if a card should be placed in the main (left) column of the sidebar column (right), by pressing the arrow right or left arrow in the bar underneath the card.

On mobile all cards are rendered in 1 column and kept in the order of the cards in the config.

## View config:

{% configuration %}
type:
  required: true
  description: "`sidebar`"
  type: string
{% endconfiguration %}

#### Example

Alternatively, the position of the card can be configured using YAML with the `view_layout` option:

```yaml
type: entities
entities: 
  - media_player.lounge_room
view_layout:
  position: sidebar
```

## Cards config:

{% configuration %}
view_layout.position:
  required: false
  description: "The position of the card, `main` or `sidebar`"
  type: string
{% endconfiguration %}
