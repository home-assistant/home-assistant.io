---
type: card
title: "Shopping list card"
sidebar_label: Shopping list
description: "The shopping list card allows you to add, edit, check-off, and clear items from your shopping list."
---

The shopping list card allows you to add, edit, check-off, and clear items from your shopping list.

<p class='img'>
<img src='/images/dashboards/shopping_list_card.gif' alt='Screenshot of the shopping list card'>
Screenshot of the shopping list card.
</p>

Setup of the [shopping list integration](/integrations/shopping_list/) is required.

{% include dashboard/edit_dashboard.md %}

All options for this card can be configured via the user interface.

## YAML configuration

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`shopping-list`"
  type: string
title:
  required: false
  description: Title of shopping list.
  type: string
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
{% endconfiguration %}

### Examples

Title Example:

```yaml
type: shopping-list
title: shopping list
```
