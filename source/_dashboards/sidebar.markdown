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
  - docs: /dashboards/sections/
    title: Sections view (default)
  - docs: /dashboards/views/
    title: About views
---

The sidebar view has 2 columns, a wide one and a smaller one on the right.

<p class='img'>
<img src='/images/dashboards/sidebar_view.png' alt='Screenshot of the sidebar view'>
Screenshot of the sidebar view used for the energy dashboard.
</p>

To move the card from the main column into the sidebar (right) (and vice versa), select the arrow {% icon "mdi:arrow-left-bold" %} {% icon "mdi:arrow-right-bold" %} button on the card.

<p class='img'>
<img src='/images/dashboards/sidebar_view_move_card.png' alt='Screenshot showing how to move a card'>
Screenshot showing the arrow buttons to move a card.
</p>

On mobile, all cards are rendered in 1 column and kept in the order indicated in the YAML configuration.

1. To view the YAML configuration, on the view tab, select the {% icon "mdi:pencil" %} icon to open the edit view.
2. In the configuration dialog, select the three dots {% icon "mdi:dots-vertical" %} menu, and **Edit in YAML**.

<p class='img'>
<img src='/images/dashboards/view_edit_config.png' alt='Screenshot showing where to edit the view configuration'>
Screenshot showing where to edit the view configuration.
</p>

## View configuration

{% configuration %}
type:
  required: true
  description: "`sidebar`"
  type: string
{% endconfiguration %}

## Cards configuration

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
