---
type: view
title: Panel view
sidebar_label: Panel
description: "The panel view shows a single card in the full width of the screen."
related:
  - docs: /dashboards/masonry/
    title: Masonry view
  - docs: /dashboards/sidebar/
    title: Sidebar view
---

The panel view must have exactly one card. This card is rendered full-width.

<p class='img'>
<img src='/images/dashboards/panel_view.png' alt='Screenshot of the panel view'>
Screenshot of the panel view.
</p>

This view doesn't have support for badges.

This view is good when using cards like [map](/dashboards/map/), [horizontal stack](/dashboards/horizontal-stack/), [vertical stack](/dashboards/vertical-stack/), [picture elements](/dashboards/picture-elements/), or [picture glance](/dashboards/picture-glance/).

{% configuration %}
type:
  required: true
  description: "`panel`"
  type: string
{% endconfiguration %}
