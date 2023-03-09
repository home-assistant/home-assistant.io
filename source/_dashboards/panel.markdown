---
type: view
title: Panel View
sidebar_label: Panel
description: "The panel view shows a single card in the full width of the screen."
---

The view must have exactly one card. This card is rendered full-width. 

This view doesn't have support for badges.

This view is good when using cards like `map`, `stack` or `picture-elements`.

{% configuration %}
type:
  required: true
  description: "`panel`"
  type: string
{% endconfiguration %}
