---
type: card
title: "To-do list card"
sidebar_label: To-do list
description: "The to-do list card allows you to add, edit, check-off, and clear items from your to-do list."
related:
  - docs: /dashboards/dashboards/
    title: Dashboards
  - docs: /integrations/frontend/
    title: Themes
  - docs: /dashboards/cards/
    title: Dashboard cards
  - docs: /integrations/todo
    title: To-do list integration documentation
  - docs: /integrations/#to-do-list
    title: List of to-do list integrations
  - docs: /integrations/local_todo/
    title: Local to-do integration
---

The to-do list card allows you to add, edit, check-off, and clear items from your to-do list.

<p class='img'>
<img src='/images/dashboards/todo-list_card_shopping-list.png' alt='Screenshot of the to-do list card'>
Screenshot of the to-do list card.
</p>

## Adding a to-do list card

1. [Add the card using the Add card button](/dashboards/cards/#adding-cards-to-your-dashboard).
   - In the **By card** dialog, select the **To-do list** card.
2. In the **Entity** dropdown menu, select your list type.
   - If it is your first time working with to-do lists, there is only **Shopping list** in the menu.
   - This comes from the [shopping list integration](/integrations/shopping_list/), which is installed by default.
   - This is the same **Shopping list** as the one on the **To-do list** dashboard (accessible via sidebar).
   ![To-do card, list entities](/images/dashboards/cards-todo.png).
3. The to-do list card can display lists from different [to-do list](/integrations/#to-do-list) integrations, such as **Bring!** or **Todoist**.
   - If you don't see your desired to-do list entity, you need to add its integration first.
   - Once you've added a to-do list integration, the lists are also available on the to-do list dashboard.

## YAML configuration

All options for this card can be configured via the user interface.

The following YAML options are available when you use YAML mode or just prefer to use YAML in the code editor in the UI.

{% configuration %}
type:
  required: true
  description: "`todo-list`"
  type: string
entity:
  required: true
  description: The to-do entity to show
  type: string
title:
  required: false
  description: Title of to-do list.
  type: string
theme:
  required: false
  description: Override the used theme for this card with any loaded theme. For more information about themes, see the [frontend documentation](/integrations/frontend/).
  type: string
hide_completed:
  required: false
  description: Hide the completed items section in the card.
  type: boolean
  default: "false"
hide_create:
  required: false
  description: Hide the textbox for creating new tasks at the top of the card.
  type: boolean
  default: "false"
display_order:
  required: false
  description: "Optionally sorts the items in the to-do list for display. Options are: `none`: Show the list in its original order. `alpha_asc`: Sort the list in alphabetical order. `alpha_desc`: Sort the list in reverse alphabetical order. `duedate_asc`: Sort the list by due date (soonest first). `duedate_desc`: Sort the list by reverse due date (soonest last)."
  type: string
  default: "none"
{% endconfiguration %}

### Examples

Title example:

```yaml
type: todo-list
entity: todo.todo_list
title: Todo List
```
