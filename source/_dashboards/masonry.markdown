---
type: view
title: Masonry view
sidebar_label: Masonry (default)
description: "The default panel layout uses a masonry algorithme."
---

The masonry view is the default view type.

<p class='img'>
<img src='/images/getting-started/lovelace.png' alt='Screenshot of the masonry view'>
Screenshot of the masonry view.
</p>

It sorts cards in columns based on their `card size`. If you want to group some cards you have to use [horizontal stack](/dashboards/horizontal-stack/), [vertical stack](/dashboards/vertical-stack/) or [grid](/dashboards/grid/) cards.

{% configuration %}
type:
  required: false
  description: "`masonry`"
  type: string
{% endconfiguration %}
