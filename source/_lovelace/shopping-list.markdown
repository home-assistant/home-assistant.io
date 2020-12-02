---
title: "Shopping List Card"
sidebar_label: Shopping List
description: "The Shopping List card allows you to add, edit, check-off, and clear items from your shopping list."
---

The Shopping List card allows you to add, edit, check-off, and clear items from your shopping list.

Setup of the [Shopping List integration](/integrations/shopping_list/) is required.

<p class='img'>
<img src='/images/lovelace/lovelace_shopping_list_card.gif' alt='Screenshot of the shopping list card'>
Screenshot of the Shopping List card.
</p>


To add the Shopping List card to your user interface, click the Lovelace menu (three dots at the top right of the screen) and then **Edit Dashboard**. Click the plus button in the bottom right corner and select **Shopping List** from the card picker. All options for this card can be configured via the user interface.

Alternatively, the card can be configured using YAML:

```yaml
type: shopping-list
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
theme:
  required: false
  description: "Set to any theme within `themes.yaml`"
  type: string
{% endconfiguration %}

## Examples

Title Example:

```yaml
type: shopping-list
title: Shopping List
```
