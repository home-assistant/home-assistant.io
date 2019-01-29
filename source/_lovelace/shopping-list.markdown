---
layout: page
title: "Shopping List Card"
sidebar_label: Shopping List
description: "The Shopping List Card allows you to add, edit, check-off, and clear items from your shopping list"
date: 2018-11-02 10:28 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The Shopping List Card allows you to add, edit, check-off, and clear items from your shopping list.

Setup of the [Shopping List Intent](/components/shopping_list/) is required

<p class='img'>
<img src='/images/lovelace/lovelace_shopping_list_card.gif' alt='Screenshot of the shopping list card'>
Screenshot of the Shopping List card.
</p>

```yaml
- type: shopping-list
```

{% configuration %}
type:
  required: true
  description: shopping-list
  type: string
title:
  required: false
  description: Title of Shopping List
  type: string
{% endconfiguration %}

## {% linkable_title Examples %}

Title Example:

```yaml
- type: shopping-list
  title: Shopping List
```
