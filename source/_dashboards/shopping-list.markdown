---
title: "Shopping list card"
description: "The shopping list card allows you to add, edit, check-off, and clear items from your shopping list."
description: "The panel view shows a single card in the full width of the screen."
related:
  - docs: /integrations/todo/
    title: To-do list integration
  - docs: /integrations/local_todo/
    title: Local to-do integration
---

Note: the shopping list card is no longer available as a card to add from the user interface. Use the [to-do list card](/dashboards/todo-list/) instead.

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

Title example:

```yaml
type: shopping-list
title: shopping list
```
