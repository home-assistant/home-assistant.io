---
type: view
title: Masonry view
sidebar_label: Masonry
description: "The default panel layout uses a masonry algorithm."
related:
  - docs: /dashboards/panel/
    title: Panel view
  - docs: /dashboards/sidebar/
    title: Sidebar view
---

The masonry view sorts cards in columns based on their card size.

<p class='img'>
<img src='/images/getting-started/lovelace.png' alt='Screenshot of the masonry view'>
Screenshot of the masonry view.
</p>

Masonry sorts cards in columns based on size and places the next card below the smallest card on the dashboard.

<p class='img'>
<img src='/images/dashboards/masonry.png' alt='Image showing how masonry arranges cards based on size.'>
Masonry arranges cards based on size.
</p>

To group cards, you have to use [horizontal stack](/dashboards/horizontal-stack/), [vertical stack](/dashboards/vertical-stack/), or [grid](/dashboards/grid/) cards.

{% configuration %}
type:
  required: false
  description: "`masonry`"
  type: string
{% endconfiguration %}
