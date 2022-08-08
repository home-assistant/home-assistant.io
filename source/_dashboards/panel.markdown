---
type: view
title: Panel View
sidebar_label: Panel
description: "The panel view shows 1 card in the fullwidth of the screen."
---

In this view the first card is rendered full-width, other cards in the view will not be rendered. 

This view doesn't have support for badges.

This view is good when using cards like `map`, `stack` or `picture-elements`.

{% configuration %}
type:
  required: true
  description: "`panel`"
  type: string
{% endconfiguration %}